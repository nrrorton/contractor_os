from pydantic import BaseModel
from datetime import date
from decimal import Decimal



class InvoiceProjectSummary(BaseModel):

    project_id: int
    project_name: str
    hours: Decimal
    amount: Decimal


class InvoicePreview(BaseModel):

    client_id: int
    client_name: str
    start_date: date
    end_date: date
    projects: list[InvoiceProjectSummary]
    total_hours: Decimal
    total_amount: Decimal