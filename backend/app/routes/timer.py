from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.time_entry import TimeEntryResponse
from app.schemas.timer import TimerStart
from app.services.timer_service import (
    start_timer, stop_timer, get_active_timer
)


router = APIRouter()


@router.get('/timer/active', response_model=TimeEntryResponse | None)
def get_active_timer_router(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    return get_active_timer(db, current_user)


@router.post('/timer/start', response_model=TimeEntryResponse)
def start_timer_router(
    timer: TimerStart,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    try:
        return start_timer(db, timer, current_user)
    
    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )
    
    except LookupError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    

@router.post('/timer/stop', response_model=TimeEntryResponse)
def stop_timer_router(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    entry = stop_timer(db, current_user)

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail='No active timer.'
        )
    
    return entry