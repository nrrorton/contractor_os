from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.utils.jwt import decode_access_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)
) -> User:
    
    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail='Invalid authentication credentials'
            )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail='Invalid authentication credentials'
        )
    
    user = (
        db.query(User).filter(User.id == int(user_id)).first()
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail='Invalid authentication credentials'
        )
    
    return user