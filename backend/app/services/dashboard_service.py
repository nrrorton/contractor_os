from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.project import Project
from app.models.user import User
from app.services.time_entry_service import get_time_entry_summary



def get_dashboard(
        db: Session,
        current_user: User
):
    
    active_clients = (
        db.query(Client).filter(
            Client.user_id == current_user.id,
            Client.archived_at.is_(None)
        ).count()
    )

    active_projects = (
        db.query(Project).filter(
            Project.user_id == current_user.id,
            Project.archived_at.is_(None)
        ).count()
    )

    time_summary = get_time_entry_summary(db, current_user)

    return {
        'active_clients': active_clients,
        'active_projects': active_projects,
        'time_summary': time_summary
    }