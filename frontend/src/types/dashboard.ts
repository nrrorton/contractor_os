
export interface TimeSummary {

    entry_count: number
    total_hours: number
    billable_hours: number
    non_billable_hours: number
    billable_amount: number
}

export interface DashboardData {
    
    active_clients: number
    active_projects: number
    time_summary: TimeSummary
}