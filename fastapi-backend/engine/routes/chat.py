from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from engine.chat.chat_service import ask_document_chat
from engine.db.models import ChatSession

router = APIRouter(prefix="/api/chat", tags=["Chat"])


class AskChatIn(BaseModel):
    clerkUserId: str
    documentId: str
    question: str


@router.post("/ask")
def ask_chat(body: AskChatIn):
    try:
        result = ask_document_chat(
            user_id=body.clerkUserId,
            document_id=body.documentId,
            question=body.question
        )
        return result

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {e}")


@router.get("/history")
def get_chat_history(clerkUserId: str, documentId: str):
    if not clerkUserId or not documentId:
        raise HTTPException(
            status_code=400,
            detail="clerkUserId and documentId are required"
        )

    chat = ChatSession.objects(
        userId=clerkUserId,
        documentId=documentId
    ).first()

    if not chat:
        return {"messages": []}

    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in chat.messages
    ]
    return {"messages": messages}
