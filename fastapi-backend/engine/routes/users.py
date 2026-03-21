from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from engine.db.db_ops import get_or_create_user

router = APIRouter(prefix="/api/users", tags=["Users"])


class UserIn(BaseModel):
    clerkUserId: str


@router.post("")
def create_user(body: UserIn):
    try:
        user = get_or_create_user(body.clerkUserId)
        return {
            "id": str(user.id),
            "clerkUserId": user.clerkUserId,
            "createdAt": user.createdAt.isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {e}")
