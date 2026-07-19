from datetime import datetime, timezone, date

from sqlalchemy import func
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
        current_user: User,
        project_id: int | None = None,
        billable: bool | None = None,
        start_date: date | None = None,
        end_date: date | None = None,
        limit: int = 25,
        offset: int = 0,
        sort: str = '-work_date'
):
    
    query = (
        db.query(TimeEntry).filter(
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        )
    )

    if project_id is not None:
        query = query.filter(TimeEntry.project_id == project_id)

    if billable is not None:
        query = query.filter(TimeEntry.billable == billable)

    if start_date is not None:
        query = query.filter(TimeEntry.work_date >= start_date)

    if end_date is not None:
        query = query.filter(TimeEntry.work_date <= end_date)

    descending = sort.startswith('-')
    sort_field = sort.lstrip('-')

    allowed_sorts = {
        'work_date': TimeEntry.work_date,
        'hours': TimeEntry.hours,
        'created_at': TimeEntry.created_at
    }

    column = allowed_sorts.get(sort_field)

    if column is None:
        column = TimeEntry.work_date
        descending = True

    if descending:
        query = query.order_by(column.desc())
    else:
        query = query.order_by(column.asc())

    query = query.order_by(TimeEntry.id.desc())
    
    return (query.offset(offset).limit(limit).all())


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
        db.query(Project).filter(
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
            TimeEntry.work_date.desc(),
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


def get_time_entry_summary(
        db: Session,
        current_user: User
):
    
    query = (
        db.query(TimeEntry).filter(
            TimeEntry.user_id == current_user.id,
            TimeEntry.archived_at.is_(None)
        )
    )

    entry_count = query.count()

    total_hours = (
        query.with_entities(func.sum(TimeEntry.hours)).scalar()
    )

    billable_hours = (
        query.filter(
            TimeEntry.billable == True
        ).with_entities(func.sum(TimeEntry.hours)).scalar()
    )

    non_billable_hours = (
        query.filter(
            TimeEntry.billable == False
        ).with_entities(func.sum(TimeEntry.hours)).scalar()
    )

    billable_amount = (
        query.filter(
            TimeEntry.billable == True
        ).with_entities(
            func.sum(TimeEntry.hours * TimeEntry.hourly_rate)).scalar()
    )

    total_hours = total_hours or 0
    billable_hours = billable_hours or 0
    non_billable_hours = non_billable_hours or 0
    billable_amount = billable_amount or 0

    return {
        'entry_count': entry_count,
        'total_hours': total_hours,
        'billable_hours': billable_hours,
        'non_billable_hours': non_billable_hours,
        'billable_amount': billable_amount
    }