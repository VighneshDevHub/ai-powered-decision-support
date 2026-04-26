from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    ObjectIdField,
    FloatField,
    DictField
)
from datetime import datetime


class User(Document):
    clerkUserId = StringField(required=True, unique=True)
    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "users",
        "indexes": ["clerkUserId"]
    }


class DocumentFile(Document):
    userId = StringField(required=True, index=True)   # Clerk user id

    originalFileName = StringField(required=True)
    nickname = StringField(required=False, null=True) 

    processedPath = StringField(required=True)
    contextPath = StringField(required=True)

    dataConfidence = FloatField()
    aiConfidence = FloatField()

    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "documents",
        "indexes": ["userId", "-createdAt"]
    }


class ChatMessage(EmbeddedDocument):
    role = StringField(required=True, choices=["user", "assistant"])
    content = StringField(required=True)
    chartConfig = DictField(required=False, null=True)
    timestamp = DateTimeField(default=datetime.utcnow)


class ChatSession(Document):
    userId = StringField(required=True, index=True)
    documentId = StringField(required=True, index=True)

    summary = StringField(default="")

    messages = ListField(
        EmbeddedDocumentField(ChatMessage),
        default=list
    )

    createdAt = DateTimeField(default=datetime.utcnow)
    updatedAt = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "chat_sessions",
        "indexes": [
            ("userId", "documentId"),   
            "-updatedAt"
        ]
    }

