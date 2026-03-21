from engine.db.models import User, DocumentFile


def get_or_create_user(clerk_user_id: str):
    user = User.objects(clerkUserId=clerk_user_id).first()
    if not user:
        user = User(clerkUserId=clerk_user_id)
        user.save()
    return user


def save_document_record(
    clerk_user_id: str,
    original_filename: str,
    processed_path: str,
    context_path: str,
    data_confidence,
    ai_confidence,
    nickname: str | None = None
):
    doc = DocumentFile(
        userId=clerk_user_id,
        originalFileName=original_filename,
        nickname=nickname,
        processedPath=processed_path,
        contextPath=context_path,
        dataConfidence=float(data_confidence),
        aiConfidence=float(ai_confidence)
    )
    doc.save()
    return doc
