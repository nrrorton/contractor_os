from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.auth import LoginRequest, TokenResponse
from app.database import get_db
from app.services.auth_service import authenticate_user


router = APIRouter()


@router.post(
        "/auth/login",
        response_model=TokenResponse
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    
    token = authenticate_user(db, login_data)
    return {
        "access_token": token,
        "token_type": "bearer"
    }