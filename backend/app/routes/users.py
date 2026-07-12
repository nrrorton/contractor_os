from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from app.utils.security import hash_password
from app.database import get_db


router = APIRouter()

@router.post("/users/register", response_model=UserResponse)
def register(
    user: UserCreate, 
    db: Session = Depends(get_db)
):

    hashed_password = hash_password(user.password)

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user