from pydantic import BaseModel, Field



class TimerStart(BaseModel):

    project_id: int
    description: str | None = None
    billable: bool = True
    hourly_rate: float | None = Field(
        default=None,
        ge=0
    )