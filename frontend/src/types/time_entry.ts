
export interface TimeEntry {

    id: number
    project_id: number
    work_date: string
    hours: number
    description: string | null
    billable: boolean
    hourly_rate: number | null
    started_at: string | null
    ended_at: string | null
    created_at: string
}