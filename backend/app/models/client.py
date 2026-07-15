from datetime import datetime

from sqlalchemy import String, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base



class Client(Base):
    
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    company_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    contact_name: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    contact_email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    phone: Mapped[str | None] = mapped_column(
        String(25),
        nullable=True
    )

    notes: Mapped[str | None] = mapped_column(
        nullable=True
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
        "User",
        back_populates="clients"
    )