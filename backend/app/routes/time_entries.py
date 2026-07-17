from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import Optional

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.time_entry import (
    TimeEntryCreate, TimeEntryResponse, TimeEntryUpdate, TimeEntrySummary
)
from app.services.time_entry_service import (
    create_time_entry, get_time_entries, get_time_entry, 
    get_project_time_entries, update_time_entry, archive_time_entry,
    get_time_entry_summary
)


router = APIRouter()


@router.post('/time-entries', response_model=TimeEntryResponse)
def create_time_entry_router(
    time_entry: TimeEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    new_entry = create_time_entry(db, time_entry, current_user)
    
    if new_entry is None:
        raise HTTPException(
            status_code=404,
            detail='Project not found'
        )
    
    return new_entry


@router.get('/time-entries', response_model=list[TimeEntryResponse])
def list_time_entries(
    project_id: int | None = None,
    billable: bool | None = None,
    start_date: date | None = None,
    end_date: date | None = None,
    limit: int = Query(default=25, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    sort: str = '-work_date',
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return get_time_entries(
        db=db,
        current_user=current_user,
        project_id=project_id,
        billable=billable,
        start_date=start_date,
        end_date=end_date,
        limit=limit,
        offset=offset,
        sort=sort
    )


@router.get('/time-entries/{time_entry_id}', response_model=TimeEntryResponse)
def get_time_entry_router(
    time_entry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    entry = get_time_entry(db, time_entry_id, current_user)

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail='Time entry not found'
        )
    
    return entry


@router.get('/projects/{project_id}/time_entries',
            response_model=list[TimeEntryResponse])
def list_project_time_entries(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    entries = get_project_time_entries(db, project_id, current_user)

    if entries is None:
        raise HTTPException(
            status_code=404,
            detail='Project not found'
        )
    
    return entries


@router.get('/time-entries/summary', response_model=TimeEntrySummary)
def time_entry_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return get_time_entry_summary(db, current_user)


@router.put('/time-entries/{time_entry_id}', response_model=TimeEntryResponse)
def update_time_entry_router(
    time_entry_id: int,
    time_entry_update: TimeEntryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    entry = update_time_entry(db, time_entry_id, 
                                time_entry_update, current_user)
    
    if entry is None:
        raise HTTPException(
            status_code=404,
            detail='Time entry not found'
        )
    
    return entry


@router.patch('/time-entries/{time_entry_id}/archive',
              response_model=TimeEntryResponse)
def archive_time_entry_router(
    time_entry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    entry = archive_time_entry(db, time_entry_id, current_user)

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail='Time entry not found'
        )
    
    return entry