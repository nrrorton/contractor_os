from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import LoginRequest
from app.utils.security import verify_password
from app.utils.jwt import create_access_token


def authenticate_user(
        db: Session,
        login_data: LoginRequest
) -> User:
    
    user = (
        db.query(User).filter(User.email == login_data.email).first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail='Invalid credentials'
        )
    
    if not verify_password(
        login_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail='Invalid credentials'
        )
    
    access_token = create_access_token(
        {
            "sub": str(user.id)
        }
    )
    
    return access_token