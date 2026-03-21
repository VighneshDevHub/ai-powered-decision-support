import engine.db.db  # mongo connection (important)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from engine.routes.users import router as users_router
from engine.routes.documents import router as documents_router
from engine.routes.chat import router as chat_router

app = FastAPI(
    title="AI-Powered Decision Support API",
    description="FastAPI backend for the AI-Powered Decision Support system.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(documents_router)
app.include_router(chat_router)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "AI Decision Support API is running"}
