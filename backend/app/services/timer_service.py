from datetime import datetime, timezone, date

from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.time_entry import TimeEntry
from app.models.user import User
from app.schemas.timer import TimerStart



def get_active_timer(
        db: Session,
        current_user: User
):
    
    return (
        db.query(TimeEntry).filter(
            TimeEntry.user_id == current_user.id,
            TimeEntry.started_at.is_not(None),
            TimeEntry.ended_at.is_(None),
            TimeEntry.archived_at.is_(None)
        ).first()
    )


def start_timer(
        db: Session,
        timer: TimerStart,
        current_user: User
):
    
    active_timer = get_active_timer(db, current_user)

    if active_timer is not None:
        raise ValueError("Active timer already exists")
    
    project = (
        db.query(Project).filter(
            Project.id == timer.project_id,
            Project.user_id == current_user.id
        ).first()
    )

    if project is None:
        raise LookupError("Project not found")
    
    now = datetime.now(timezone.utc)
    
    entry = TimeEntry(
        user_id=current_user.id,
        project_id=timer.project_id,
        work_date=now.date(),
        started_at=now,
        ended_at=None,
        hours=0,
        description=timer.description,
        billable=timer.billable,
        hourly_rate=(
            timer.hourly_rate
            if timer.hourly_rate is not None
            else project.hourly_rate
        )
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry


def stop_timer(
        db: Session,
        current_user: User
):
    
    entry = get_active_timer(db, current_user)

    if entry is None:
        return None
    
    now = datetime.now(timezone.utc)

    entry.ended_at = now
    
    elapsed_seconds = (now - entry.started_at).total_seconds()

    entry.hours = round(elapsed_seconds / 3600, 2)

    db.commit()
    db.refresh(entry)

    return entry