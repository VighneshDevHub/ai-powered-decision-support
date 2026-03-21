# AI-Powered Decision Support — FastAPI Backend

This is the **FastAPI** version of the backend, migrated from Flask.

## Project Structure

```
fastapi-backend/
├── main.py                        # FastAPI app entry point
├── requirements.txt               # Python dependencies
├── .env                           # Environment variables
├── credentials.json               # Google Sheets API credentials
└── engine/
    ├── routes/
    │   ├── users.py               # POST /api/users
    │   ├── documents.py           # /api/documents (upload, list, delete, rename…)
    │   └── chat.py                # POST /api/chat/ask, GET /api/chat/history
    ├── db/
    │   ├── db.py                  # MongoDB connection (mongoengine)
    │   ├── db_ops.py              # get_or_create_user, save_document_record
    │   └── models.py              # User, DocumentFile, ChatSession models
    ├── llm/
    │   └── llm_groq.py            # Groq LLM calls (JSON + text modes)
    ├── chat/
    │   ├── chat_service.py        # ask_document_chat()
    │   ├── classifier.py          # Question classifier
    │   └── prompt_builder.py      # System prompt builder
    ├── context/
    │   ├── context_builder.py
    │   ├── context_snapshot.py
    │   └── group_summary.py
    ├── ai/
    │   ├── ai_planner.py
    │   ├── ai_confidence.py
    │   ├── action_plan.py
    │   └── insight_generator.py
    ├── storage/
    │   ├── process_and_store.py
    │   ├── file_reader.py
    │   └── storage.py
    └── utils/
        ├── extractors.py
        ├── google_sheet_to_xlsx.py
        ├── calculators.py
        ├── executor.py
        └── schema_validation.py
```

## Setup & Run

```bash
# 1. Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the server (port 5000 to match original Flask port)
uvicorn main:app --reload --port 5000
```

## API Docs

Once running, visit:
- **Swagger UI** → http://localhost:5000/docs
- **ReDoc** → http://localhost:5000/redoc

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/users` | Create/get user by clerkUserId |
| GET | `/api/documents` | List documents for a user |
| POST | `/api/documents/upload` | Upload CSV/XLSX file |
| POST | `/api/documents/upload/google-sheet` | Import from Google Sheet URL |
| GET | `/api/documents/processed` | Get all processed datasets |
| POST | `/api/documents/processed/document` | Get single processed document |
| DELETE | `/api/documents/{document_id}` | Delete a document |
| PATCH | `/api/documents/rename` | Rename a document |
| POST | `/api/chat/ask` | Ask a question about a document |
| GET | `/api/chat/history` | Get chat history for a document |

## Changes from Flask Version

| Flask | FastAPI |
|-------|---------|
| `Blueprint` | `APIRouter` |
| `request.get_json()` | Pydantic `BaseModel` |
| `request.files["file"]` | `UploadFile = File(...)` |
| `request.form.get(...)` | `Form(...)` |
| `request.args.get(...)` | `Query(...)` |
| `jsonify({...}), 200` | `return {...}` |
| `jsonify({...}), 4xx` | `raise HTTPException(...)` |
| `flask_cors CORS(app)` | `CORSMiddleware` |
| `app.run(debug=True)` | `uvicorn main:app --reload` |
