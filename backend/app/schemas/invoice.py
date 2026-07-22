from pydantic import BaseModel
from datetime import date
from decimal import Decimal



class InvoiceLineItem(BaseModel):

    id: int
    work_date: date
    project_name: str
    description: str | None
    hours: Decimal
    hourly_rate: Decimal
    amount: Decimal


class InvoicePreview(BaseModel):

    client_id: int
    client_name: str
    start_date: date
    end_date: date
    line_items: list[InvoiceLineItem]
    total_hours: Decimal
    total_amount: Decimal