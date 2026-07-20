from datetime import datetime

from sqlalchemy import String, ForeignKey, DateTime, func, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base



class Project(Base):

    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    client_id: Mapped[int] = mapped_column(
        ForeignKey('clients.id'),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    hourly_rate: Mapped[float | None] = mapped_column(
        Numeric(8, 2),
        nullable=True
    )

    description: Mapped[str | None] = mapped_column(
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default='active'
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    archived_at: Mapped[datetime | None] = mapped_column(
        nullable=True
    )

    user = relationship(
        'User',
        back_populates='projects'
    )

    client = relationship(
        'Client',
        back_populates='projects'
    )

    time_entries = relationship(
        'TimeEntry',
        back_populates='project'
    )