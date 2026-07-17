from datetime import date, datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import (
    String, ForeignKey, Date, DateTime, Numeric, Boolean, func
)

from app.database import Base



class TimeEntry(Base):

    __tablename__ = 'time_entries'

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey('projects.id'),
        nullable=False
    )

    work_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    ended_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    hours: Mapped[float] = mapped_column(
        Numeric(4, 2),
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        nullable=True
    )

    billable: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True
    )

    hourly_rate: Mapped[float | None] = mapped_column(
        Numeric(8, 2),
        nullable=True
    )

    created_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    archived_at: Mapped[datetime | None] = mapped_column(
        nullable=True
    )

    user = relationship(
        'User',
        back_populates='time_entries'
    )

    project = relationship(
        'Project',
        back_populates='time_entries'
    )