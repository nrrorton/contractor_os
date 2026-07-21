
export interface InvoiceProjectSummary {

    project_id: number
    project_name: string
    hours: number
    amount: number
}

export interface InvoicePreview {

    client_id: number
    client_name: string
    start_date: string
    end_date: string
    projects: InvoiceProjectSummary[]
    total_hours: number
    total_amount: number
}