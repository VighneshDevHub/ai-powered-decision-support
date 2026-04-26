import os
import uuid
import logging
import traceback

logger = logging.getLogger(__name__)

from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Query
from pydantic import BaseModel

from engine.db.models import DocumentFile
from engine.storage.storage import load_json
from engine.context.group_summary import generate_group_summary
from engine.llm.llm_groq import llm_call_fn

from engine.storage.process_and_store import process_file_and_store

from engine.utils.extractors import extract_spreadsheet_id
from engine.utils.google_sheet_to_xlsx import google_sheet_to_xlsx

from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/api/documents", tags=["Documents"])

ALLOWED_EXTENSIONS = {"csv", "xlsx"}
RAW_STORAGE_PATH = "storage/raw"


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ──────────────────────────────────────────────────────────────────────────────
# Upload a file (CSV / XLSX)
# ──────────────────────────────────────────────────────────────────────────────
@router.post("/upload")
async def upload_and_process(
    clerkUserId: str = Form(...),
    file: UploadFile = File(...),
    nickname: str = Form(None),
):
    logger.info(f"Upload request received: filename={file.filename}, clerkUserId={clerkUserId}, nickname={nickname}")
    if not file.filename:
        logger.error("Empty filename received")
        raise HTTPException(status_code=400, detail="empty filename")

    if not allowed_file(file.filename):
        logger.error(f"Unsupported file extension: {file.filename}")
        raise HTTPException(status_code=400, detail="only csv and xlsx supported for now")

    # Sanitise filename
    import re
    safe_name = re.sub(r"[^\w.\-]", "_", file.filename)
    name, ext = os.path.splitext(safe_name)

    if not nickname:
        nickname = name

    unique_id = uuid.uuid4().hex
    system_filename = f"{unique_id}{ext}"

    os.makedirs(RAW_STORAGE_PATH, exist_ok=True)
    file_path = os.path.join(RAW_STORAGE_PATH, system_filename)
    logger.info(f"Saving file to: {file_path}")

    try:
        contents = await file.read()
        logger.info(f"File read into memory, size: {len(contents)} bytes")
        with open(file_path, "wb") as f:
            f.write(contents)
        logger.info("File written to disk successfully")

        logger.info("Starting processing...")
        result = process_file_and_store(
            file_path=file_path,
            clerk_user_id=clerkUserId,
            nickname=nickname
        )
        logger.info("Processing completed successfully")

        return {
            "message": "file uploaded and processed successfully",
            "document_id": result["document_id"],
            "original_filename": file.filename,
            "stored_filename": system_filename,
            "nickname": nickname,
            "processed_path": result["processed_path"],
            "context_path": result["context_path"]
        }

    except Exception as e:
        logger.error(f"Exception during upload/process: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"file processing failed: {str(e)}")


# ──────────────────────────────────────────────────────────────────────────────
# Get all processed documents (+ optional group summary)
# ──────────────────────────────────────────────────────────────────────────────
@router.get("/processed")
def get_processed_documents(clerkUserId: str = Query(...)):
    docs = DocumentFile.objects(userId=clerkUserId).order_by("-createdAt")

    if not docs:
        return {"datasets": [], "group_summary": None}

    processed_datasets = []
    for doc in docs:
        try:
            processed_json = load_json(doc.processedPath)
            processed_datasets.append(processed_json)
        except Exception:
            continue

    if not processed_datasets:
        return {"datasets": [], "group_summary": None}

    group_summary = None
    if len(processed_datasets) > 1:
        group_summary = generate_group_summary(llm_call_fn, processed_datasets)

    return {"datasets": processed_datasets, "group_summary": group_summary}


# ──────────────────────────────────────────────────────────────────────────────
# List documents for a user
# ──────────────────────────────────────────────────────────────────────────────
@router.get("")
def list_documents(clerkUserId: str = Query(...)):
    docs = DocumentFile.objects(userId=clerkUserId).order_by("-createdAt")

    return [
        {
            "documentId": str(doc.id),
            "nickname": doc.nickname,
            "originalFileName": doc.originalFileName,
            "data_confidence": doc.dataConfidence,
            "ai_confidence": doc.aiConfidence,
            "createdAt": doc.createdAt.isoformat()
        }
        for doc in docs
    ]


# ──────────────────────────────────────────────────────────────────────────────
# Delete a document
# ──────────────────────────────────────────────────────────────────────────────
@router.delete("/{document_id}")
def delete_document(document_id: str, clerkUserId: str = Query(...)):
    document = DocumentFile.objects(id=document_id, userId=clerkUserId).first()

    if not document:
        raise HTTPException(status_code=404, detail="Document not found or access denied")

    try:
        if document.processedPath and os.path.exists(document.processedPath.replace("/", os.sep)):
            os.remove(document.processedPath.replace("/", os.sep))

        if document.contextPath and os.path.exists(document.contextPath.replace("/", os.sep)):
            os.remove(document.contextPath.replace("/", os.sep))
    except Exception:
        pass

    document.delete()
    return {"message": "Document deleted successfully"}


# ──────────────────────────────────────────────────────────────────────────────
# Upload from Google Sheet URL
# ──────────────────────────────────────────────────────────────────────────────
class GoogleSheetIn(BaseModel):
    clerkUserId: str
    sheetUrl: str
    nickname: str = "Google Sheet"


@router.post("/upload/google-sheet")
def upload_google_sheet(body: GoogleSheetIn):
    spreadsheet_id = extract_spreadsheet_id(body.sheetUrl)
    if not spreadsheet_id:
        raise HTTPException(status_code=400, detail="invalid google sheet url")

    unique_id = uuid.uuid4().hex
    system_filename = f"{unique_id}.xlsx"
    file_path = os.path.join(RAW_STORAGE_PATH, system_filename)

    try:
        google_sheet_to_xlsx(spreadsheet_id=spreadsheet_id, output_path=file_path)

        result = process_file_and_store(
            file_path=file_path,
            clerk_user_id=body.clerkUserId,
            nickname=body.nickname
        )

        return {
            "message": "google sheet processed successfully",
            "document_id": result["document_id"],
            "stored_filename": system_filename,
            "processed_path": result["processed_path"],
            "context_path": result["context_path"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ──────────────────────────────────────────────────────────────────────────────
# Get single processed document
# ──────────────────────────────────────────────────────────────────────────────
class ProcessedDocumentIn(BaseModel):
    userId: str
    documentId: str


@router.post("/processed/document")
def get_processed_document(body: ProcessedDocumentIn):
    document = DocumentFile.objects(id=body.documentId, userId=body.userId).first()

    if not document:
        raise HTTPException(status_code=404, detail="Document not found or access denied")

    try:
        processed_data = load_json(document.processedPath)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load processed.json: {e}")

    return {
        "documentId": str(document.id),
        "processed": processed_data
    }


# ──────────────────────────────────────────────────────────────────────────────
# Rename a document
# ──────────────────────────────────────────────────────────────────────────────
class RenameDocumentIn(BaseModel):
    clerkUserId: str
    documentId: str
    nickname: str


@router.patch("/rename")
def rename_document(body: RenameDocumentIn):
    nickname = body.nickname.strip()
    if not nickname:
        raise HTTPException(status_code=400, detail="nickname cannot be empty")

    if len(nickname) > 100:
        raise HTTPException(status_code=400, detail="nickname too long (max 100 chars)")

    try:
        document_id = ObjectId(body.documentId)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid documentId")

    document = DocumentFile.objects(id=document_id, userId=body.clerkUserId).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found or access denied")

    document.nickname = nickname
    document.save()

    return {
        "message": "Document renamed successfully",
        "documentId": str(document.id),
        "nickname": document.nickname
    }
