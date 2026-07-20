
export interface Project {

    id: number
    client_id: number
    name: string
    hourly_rate: number | null
    description: string | null
    status: string
    created_at: string
}