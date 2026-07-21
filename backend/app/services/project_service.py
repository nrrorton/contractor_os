from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.client import Client
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectUpdate



def create_project(
        db: Session,
        project: ProjectCreate,
        current_user: User
):
    
    client = (
        db.query(Client).filter(
            Client.id == project.client_id, Client.user_id == current_user.id)
            .first()
    )

    if client is None:
        return None
    
    new_project = Project(
        user_id=current_user.id,
        client_id=project.client_id,
        name=project.name,
        hourly_rate=project.hourly_rate,
        description=project.description
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


def get_projects(
        db: Session,
        current_user: User
):
    
    return (
        db.query(Project).filter(
            Project.user_id == current_user.id,
            Project.archived_at.is_(None))
            .all()
    )


def get_client_projects(
        db: Session,
        client_id: int,
        current_user: User
):
    
    client = (
        db.query(Client).filter(
            Client.id == client_id, Client.user_id == current_user.id)
            .first()
    )

    if client is None:
        return None
    
    return (
        db.query(Project).filter(
            Project.client_id == client_id,
            Project.user_id == current_user.id,
            Project.archived_at.is_(None))
            .all()
        )
    

def get_project(
        db: Session,
        project_id: int,
        current_user: User
):
    
    return (
        db.query(Project).filter(
            Project.id == project_id, Project.user_id == current_user.id)
            .first()
        )
    

def update_project(
        db: Session,
        project_id: int,
        project_update: ProjectUpdate,
        current_user: User
):
    
    project = (
        db.query(Project).filter(
            Project.id == project_id, Project.user_id == current_user.id)
            .first()
        )
    
    if project is None:
        return None
    
    update_data = project_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)

    return project


def archive_project(
        db: Session,
        project_id: int,
        current_user: User
):
    
    project = (
        db.query(Project).filter(
            Project.id == project_id, Project.user_id == current_user.id)
            .first()
        )
    
    if project is None:
        return None
    
    project.archived_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(project)

    return project