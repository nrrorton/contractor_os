from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.models.user import User
from app.dependencies.auth import get_current_user
from app.services.project_service import (
    create_project, get_projects, get_client_projects, get_project,
    update_project, archive_project
)

router = APIRouter()


@router.post('/projects', response_model=ProjectResponse)
def create_project_router(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    new_project = create_project(db, project, current_user)

    if new_project is None:
        raise HTTPException(
            status_code=404,
            detail='Client not found'
        )
    
    return new_project


@router.get('/projects', response_model=list[ProjectResponse])
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return get_projects(db, current_user)


@router.get('/clients/{client_id}/projects')
def list_client_projects(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    projects = get_client_projects(db, client_id, current_user)
    
    if projects is None:
        raise HTTPException(
            status_code=404,
            detail='Client not found'
        )
    
    return projects


@router.get('/projects/{project_id}', response_model=ProjectResponse)
def get_project_router(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    project = get_project(db, project_id, current_user)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail='Project not found'
        )
    
    return project


@router.put('/projects/{project_id}', response_model=ProjectResponse)
def update_project_router(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    project = update_project(db, project_id, project_update, current_user)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail='Project not found'
        )
    
    return project


@router.patch('/projects/{project_id}/archive', response_model=ProjectResponse)
def archive_project_router(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    project = archive_project(db, project_id, current_user)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail='Project not found'
        )
    
    return project