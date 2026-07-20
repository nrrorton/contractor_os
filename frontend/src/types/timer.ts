
export interface ActiveTimer {

    id: number
    project_id: number
    work_date: string
    started_at: string
    ended_at: string | null
    hours: number
    description: string | null
    billable: boolean
    hourly_rate: number | null
}


export interface TimerStartData {

    project_id: number
    description: string | null
    billable: boolean
    hourly_rate: number | null
}