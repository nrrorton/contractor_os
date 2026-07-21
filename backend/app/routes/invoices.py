from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.invoice import InvoicePreview
from app.services.invoice_service import generate_invoice_preview


router = APIRouter()


@router.get('/invoices/preview', response_model=InvoicePreview)
def invoice_preview(
    client_id: int,
    start_date: date,
    end_date: date,
    project_id: int | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return generate_invoice_preview(
        db, current_user, client_id, start_date, end_date, project_id
    )