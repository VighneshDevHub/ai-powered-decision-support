from datetime import datetime
from engine.db.models import ChatSession, ChatMessage, DocumentFile
from engine.storage.storage import load_json
from engine.chat.classifier import classify_question
from engine.chat.prompt_builder import build_system_prompt
from engine.llm.llm_groq import llm_call_text


def get_or_create_chat(user_id, document_id):
    chat = ChatSession.objects(
        userId=user_id,
        documentId=document_id
    ).first()

    if not chat:
        chat = ChatSession(
            userId=user_id,
            documentId=document_id
        ).save()

    return chat


def ask_document_chat(user_id, document_id, question):
    chat = get_or_create_chat(user_id, document_id)

    document = DocumentFile.objects(id=document_id, userId=user_id).first()
    if not document:
        raise ValueError("Document not found or access denied")

    processed_data = load_json(document.processedPath)

    category = classify_question(question)

    system_prompt = build_system_prompt(
        category=category,
        context=processed_data,
        summary=chat.summary
    )

    prompt = f"""
{system_prompt}

User question:
{question}
"""

    answer = llm_call_text(prompt)

    chat.messages.append(ChatMessage(role="user", content=question))
    chat.messages.append(ChatMessage(role="assistant", content=answer))
    chat.updatedAt = datetime.utcnow()
    chat.save()

    return {
        "answer": answer,
        "category": category
    }
