from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.user import User
from app.schemas.client import ClientCreate



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
