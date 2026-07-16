from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.client import ClientCreate, ClientResponse, ClientUpdate
from app.models.user import User
from app.dependencies.auth import get_current_user
from app.services.client_service import (
    create_client, get_clients, get_client, update_client, archive_client
)


router = APIRouter()


@router.post('/clients', response_model=ClientResponse)
def create_client_router(
    client: ClientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return create_client(db, client, current_user)


@router.get('/clients', response_model=list[ClientResponse])
def display_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return get_clients(db, current_user)


@router.get('clients/{client_id}', response_model=ClientResponse)
def display_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    client = get_client(db, client_id, current_user)

    if client is None:
        raise HTTPException(
            status_code=404,
            detail='Client not found'
        )
    
    return client


@router.put('clients/{client_id}', response_model=ClientResponse)
def update_client_router(
    client_id: int,
    client_update: ClientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    client = update_client(db, client_id, client_update, current_user)

    if client is None:
        raise HTTPException(
            status_code=404,
            detail='Client not found'
        )
    
    return client


@router.patch('/clients/{client_id}/archive')
def archive_client_router(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    client = archive_client(db, client_id, current_user)

    if client is None:
        raise HTTPException(
            status_code=404,
            detail='Client not found'
        )
    
    return {'message': 'Client archived successfully'}