from fastapi import HTTPException
from datetime import date

from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.project import Project
from app.models.time_entry import TimeEntry
from app.models.user import User
from app.schemas.invoice import InvoiceProjectSummary, InvoicePreview



def generate_invoice_preview(
        db: Session,
        current_user: User,
        client_id: int,
        start_date: date,
        end_date: date
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
    
    entries = (
        db.query(TimeEntry).join(Project).filter(
            Project.client_id == client_id,
            TimeEntry.user_id == current_user.id,
            TimeEntry.billable == True,
            TimeEntry.archived_at.is_(None),
            TimeEntry.work_date >= start_date,
            TimeEntry.work_date <= end_date
        ).all()
    )

    project_totals = {}

    for entry in entries:

        project_id = entry.project.id

        if project_id not in project_totals:
            project_totals[project_id] = {
                'project_name': entry.project.name,
                'hours': 0,
                'amount': 0
            }

        project_totals[project_id]['hours'] += entry.hours

        project_totals[project_id]['amount'] += (
            entry.hours * entry.hourly_rate
        )

    projects = []

    for project_id, data in project_totals.items():

        projects.append(InvoiceProjectSummary(project_id=project_id, **data))

    return InvoicePreview(
        client_id=client.id,
        client_name=client.company_name,
        start_date=start_date,
        end_date=end_date,
        projects=projects,
        total_hours=sum(p.hours for p in projects),
        total_amount=sum(p.amount for p in projects)
    )