import engine.db.db  # mongo connection (important)
import logging
import traceback

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
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


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled exception: {exc}")
    logging.error(traceback.format_exc())
    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )
    return JSONResponse(
        status_code=500,
        content={"detail": f"An unexpected error occurred: {str(exc)}"},
    )


@app.get("/")
def health_check():
    return {"status": "ok", "message": "AI Decision Support API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
