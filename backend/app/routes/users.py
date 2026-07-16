from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from app.database import get_db
from app.services.user_service import create_user
from app.dependencies.auth import get_current_user


router = APIRouter()

@router.post('/users/register', response_model=UserResponse)
def register(
    user: UserCreate, 
    db: Session = Depends(get_db)
):

    return create_user(db, user)


@router.get('/users/me', response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user