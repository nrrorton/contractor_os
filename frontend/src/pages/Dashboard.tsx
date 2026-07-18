import { useEffect, useState } from 'react'

import api from '../services/api'
import type { DashboardData } from '../types/dashboard'



function Dashboard() {

    const [dashboard, setDashboard] = useState<DashboardData | null>(null)

    useEffect(() => {
        async function fetchDashboard() {
            const response = await api.get('/dashboard')

            console.log("Dashboard response:", response.data)

            setDashboard(response.data)
        }

        fetchDashboard()
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>

            {dashboard && (
                <div>
                    <h2>Overview</h2>

                    <p>
                        Active Clients: {dashboard.active_clients}
                    </p>

                    <p>
                        Active Projects: {dashboard.active_projects}
                    </p>

                    <h2>Time Summary</h2>

                    <p>
                        Total Hours: {dashboard.time_summary.total_hours}
                    </p>

                    <p>
                        Billable Amount: ${dashboard.time_summary.billable_amount}
                    </p>
                </div>
            )}
        </div>
    )
}

export default Dashboard