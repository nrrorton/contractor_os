from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.user import User
from app.schemas.client import ClientCreate, ClientUpdate



def create_client(
        db: Session,
        client: ClientCreate,
        current_user: User
):
    
    new_client = Client(
        company_name=client.company_name,
        contact_name=client.contact_name,
        contact_email=client.contact_email,
        phone=client.phone,
        notes=client.notes,
        user_id=current_user.id
    )

    db.add(new_client)
    db.commit()
    db.refresh(new_client)

    return new_client


def get_clients(
        db: Session,
        current_user: User
):
    
    return (
        db.query(Client).filter(
            Client.user_id == current_user.id,
            Client.archived_at.is_(None)
        ).all()
    )


def get_client(
        db: Session,
        client_id: int,
        current_user: User
):
    
    return (
        db.query(Client).filter(
            Client.id == client_id,
            Client.user_id == current_user.id,
            Client.archived_at.is_(None)
        ).first()
    )


def update_client(
        db: Session,
        client_id: int,
        client_update: ClientUpdate,
        current_user: User
):
    
    client = (
        db.query(Client).filter(Client.id == client_id, Client.user_id == current_user.id).first()
    )

    if client is None:
        return None
    
    update_data = client_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(client, field, value)

    db.commit()
    db.refresh(client)

    return client


def archive_client(
        db: Session,
        client_id: int,
        current_user: User
):
    
    client = (
        db.query(Client).filter(Client.id == client_id, Client.user_id == current_user.id).first()
    )

    if client is None:
        return None
    
    client.archived_at = datetime.now(timezone.utc)

    db.commit()

    return client