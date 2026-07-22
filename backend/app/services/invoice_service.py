from fastapi import HTTPException
from datetime import date

from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.project import Project
from app.models.time_entry import TimeEntry
from app.models.user import User
from app.schemas.invoice import InvoiceLineItem, InvoicePreview



def generate_invoice_preview(
        db: Session,
        current_user: User,
        client_id: int,
        start_date: date,
        end_date: date,
        project_id: int | None = None
):
    
    client = (
        db.query(Client).filter(
            Client.id == client_id, Client.user_id == current_user.id).first()
    )

    if client is None:
        raise HTTPException(
            status_code=404,
            detail='Client not found'
        )
    
    query = (
        db.query(TimeEntry).join(Project).filter(
            Project.client_id == client_id,
            TimeEntry.user_id == current_user.id,
            TimeEntry.billable == True,
            TimeEntry.archived_at.is_(None),
            TimeEntry.work_date >= start_date,
            TimeEntry.work_date <= end_date
        )
    )

    if project_id is not None:
        query = query.filter(Project.id == project_id)

    query = query.order_by(
        TimeEntry.work_date.asc(),
        TimeEntry.id.asc()
    )

    entries = query.all()

    line_items = []

    for entry in entries:

        if entry.hourly_rate is None:
            raise HTTPException(
                status_code=400,
                detail=f'Time entry {entry.id} is missing an hourly rate'
            )

        line_items.append(
            InvoiceLineItem(
                id=entry.id,
                work_date=entry.work_date,
                project_name=entry.project.name,
                description=entry.description,
                hours=entry.hours,
                hourly_rate=entry.hourly_rate,
                amount=entry.hours * entry.hourly_rate
            )
        )

    return InvoicePreview(
        client_id=client.id,
        client_name=client.company_name,
        start_date=start_date,
        end_date=end_date,
        line_items=line_items,
        total_hours=sum(item.hours for item in line_items),
        total_amount=sum(item.amount for item in line_items)
    )
