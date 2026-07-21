from datetime import datetime
from pydantic import BaseModel, Field



class ProjectCreate(BaseModel):

    client_id: int

    name: str = Field(
        min_length=1,
        max_length=100
    )

    hourly_rate: float | None = Field(
        default=None,
        ge=0
    )

    description: str | None = None


class ProjectResponse(BaseModel):

    id: int
    client_id: int
    name: str
    hourly_rate: float | None = None
    description: str | None = None
    status: str
    created_at: datetime

    model_config = {'from_attributes': True}


class ProjectUpdate(BaseModel):

    name: str | None = Field(
        default=None,
        max_length=100
    )

    description: str | None = None

    hourly_rate: float | None = Field(
        default=None,
        ge=0
    )

    status: str | None = Field(
        default=None,
        max_length=50
    )