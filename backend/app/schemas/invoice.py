from pydantic import BaseModel
from datetime import date



class InvoiceProjectSummary(BaseModel):

    project_id: int
    project_name: str
    hours: float
    amount: float


class InvoicePreview(BaseModel):

    client_id: int
    client_name: str
    start_date: date
    end_date: date
    projects: list[InvoiceProjectSummary]
    total_hours: float
    total_amount: float