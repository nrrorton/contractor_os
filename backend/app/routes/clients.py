from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.client import ClientCreate, ClientResponse
from app.services.client_service import create_client
from app.models.user import User
from app.dependencies.auth import get_current_user


router = APIRouter()


@router.post(
    "/clients",
    response_model=ClientResponse
)
def create_client_router(
    client: ClientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return create_client(db, client, current_user)
