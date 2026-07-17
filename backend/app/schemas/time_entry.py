from datetime import date, datetime

from pydantic import BaseModel, Field



class TimeEntryCreate(BaseModel):

    project_id: int
    work_date: date
    hours: float = Field(gt=0)
    description: str | None = None
    billable: bool = True
    hourly_rate: float | None = Field(
        default=None,
        ge=0
    )

    started_at: datetime | None = None
    ended_at: datetime | None = None


class TimeEntryResponse(BaseModel):

    id: int
    project_id: int
    work_date: date
    hours: float
    description: str | None = None
    billable: bool
    hourly_rate: float | None = None
    started_at: datetime | None = None
    ended_at: datetime | None = None
    created_at: datetime

    model_config = {'from_attributes': True}


class TimeEntryUpdate(BaseModel):

    work_date: date | None = None
    hours: float | None = Field(
        default=None,
        gt=0
    )

    description: str | None = None
    billable: bool | None = None
    hourly_rate: float | None = Field(
        deafult=None,
        ge=0
    )

    started_at: datetime | None = None
    ended_at: datetime | None = None