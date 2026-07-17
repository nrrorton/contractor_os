from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.time_entry import TimeEntry
from app.models.user import User
from app.schemas.time_entry import (
    TimeEntryCreate, TimeEntryUpdate, TimeEntryResponse
)



def create_time_entry(
        db: Session,
        time_entry: TimeEntryCreate,
        current_user: User
):
    
    project = (
        db.query(Project).filter(
            Project.id == time_entry.project_id,
            Project.user_id == current_user.id)
            .first()
    )
    
    if project is None:
        return None
    
    new_entry = TimeEntry(
        user_id=current_user.id,
        project_id=time_entry.project_id,
        work_date=time_entry.work_date,
        hours=time_entry.hours,
        description=time_entry.description,
        billable=time_entry.billable,
        hourly_rate=time_entry.hourly_rate,
        started_at=time_entry.started_at,
        ended_at=time_entry.ended_at
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return new_entry


def get_time_entries(
        db: Session,
        current_user: User
):
    
    return (
        db.query(TimeEntry).filter(
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        ).order_by(
            TimeEntry.workd_date.desc(),
            TimeEntry.id.desc()
        ).all()
    )


def get_time_entry(
        db: Session,
        time_entry_id: int,
        current_user: User
):
    
    return (
        db.query(TimeEntry).filter(
            TimeEntry.id == time_entry_id,
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        ).first()
    )


def get_project_time_entries(
        db: Session,
        project_id: int,
        current_user: User
):
    
    project = (
        db.query(Project).first(
            Project.id == project_id,
            Project.user_id == current_user.id
        ).first()
    )

    if project is None:
        return None
    
    return (
        db.query(TimeEntry).filter(
            TimeEntry.project_id == project_id,
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        ).order_by(
            TimeEntry.word_date.desc(),
            TimeEntry.id.desc()
        ).all()
    )


def update_time_entry(
        db: Session,
        time_entry_id: int,
        time_entry_update: TimeEntryUpdate,
        current_user: User
):
    
    entry = (
        db.query(TimeEntry).filter(
            TimeEntry.id == time_entry_id,
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        ).first()
    )

    if entry is None:
        return None
    
    update_data = time_entry_update.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(entry, field, value)

    db.commit()
    db.refresh(entry)

    return entry


def archive_time_entry(
        db: Session,
        time_entry_id: int,
        current_user: User
):
    
    entry = (
        db.query(TimeEntry).filter(
            TimeEntry.id == time_entry_id,
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        ).first()
    )

    if entry is None:
        return None
    
    entry.archived_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(entry)

    return entry