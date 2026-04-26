import logging
from engine.db.models import DocumentFile, ChatSession, ChatMessage
from engine.storage.storage import load_json
from engine.llm.llm_groq import llm_call_text
from datetime import datetime
from engine.chat.chat_service import get_or_create_chat

logger = logging.getLogger(__name__)

def ask_global_chat(user_id, question):
    """
    Answers questions based on ALL documents owned by the user.
    """
    chat = get_or_create_chat(user_id, "global")

    docs = DocumentFile.objects(userId=user_id).order_by("-createdAt")
    
    if not docs:
        return {"answer": "You haven't uploaded any documents yet. Please upload some data first!", "sources": []}

    all_contexts = []
    sources = []
    
    for doc in docs:
        try:
            processed_data = load_json(doc.processedPath)
            all_contexts.append({
                "document_name": doc.nickname or doc.originalFileName,
                "summary": processed_data.get("insights", [])[:3], # Just top 3 insights per doc to save context
                "metrics": [m["metric"] for m in processed_data.get("metrics", []) if "data" in m]
            })
            sources.append({
                "id": str(doc.id),
                "name": doc.nickname or doc.originalFileName
            })
        except Exception as e:
            logger.error(f"Error loading context for global chat: {e}")

    prompt = f"""
You are a master decision support assistant with access to ALL of the user's uploaded data.
Below are summaries of the user's documents.

DOCUMENTS SUMMARIES:
{all_contexts}

USER QUESTION:
{question}

Provide a comprehensive answer based on all available data. If the question refers to specific data that isn't present, explain that clearly.
"""

    answer = llm_call_text(prompt)
    
    # Save to history
    chat.messages.append(ChatMessage(role="user", content=question))
    chat.messages.append(ChatMessage(role="assistant", content=answer))
    chat.updatedAt = datetime.utcnow()
    chat.save()

    return {
        "answer": answer,
        "sources": sources
    }
