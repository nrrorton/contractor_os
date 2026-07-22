
export interface InvoiceLineItem {

    id: number
    work_date: string
    project_name: string
    description: string | null
    hours: number
    hourly_rate: number
    amount: number
}

export interface InvoicePreview {

    client_id: number
    client_name: string
    start_date: string
    end_date: string
    line_items: InvoiceLineItem[]
    total_hours: number
    total_amount: number
}