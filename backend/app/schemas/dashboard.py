from pydantic import BaseModel

from app.schemas.time_entry import TimeEntrySummary



class DashboardResponse(BaseModel):

    active_clients: int
    active_projects: int
    time_summary: TimeEntrySummary

    