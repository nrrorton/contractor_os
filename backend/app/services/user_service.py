from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.security import hash_password


def create_user(
        db: Session,
        user: UserCreate
) -> User:
    
    existing_user = (
        db.query(User).filter(User.email == user.email).first()
    )
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail='Email already registered'
        )
    
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