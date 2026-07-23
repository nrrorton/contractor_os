from datetime import date, datetime

from pydantic import BaseModel, Field



class TimerStart(BaseModel):

    project_id: int
    description: str | None = None
    billable: bool = True
    hourly_rate: float | None = Field(
        default=None,
        ge=0
    )



class ActiveTimerResponse(BaseModel):

    id: int
    project_id: int
    project_name: str
    work_date: date
    started_at: datetime
    ended_at: datetime | None
    hours: float
    description: str | None
    billable: bool
    hourly_rate: float | None

    class Config:
        from_attributes = True