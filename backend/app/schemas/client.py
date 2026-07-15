from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class ClientCreate(BaseModel):

    company_name: str = Field(
        min_length=1,
        max_length=100
    )

    contact_name: str | None = Field(
        default=None,
        max_length=100
    )

    contact_email: EmailStr | None = None

    phone: str | None = Field(
        default=None,
        max_length=25
    )

    notes: str | None = None


class ClientResponse(BaseModel):

    id: int

    company_name: str

    contact_name: str | None = None

    contact_email: EmailStr | None = None

    phone: str | None = None

    notes: str | None = None

    created_at: datetime

    model_config = {
        "from_attributes": True
    }