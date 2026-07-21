import { useEffect, useState } from 'react'

import api from '../services/api'
import type { DashboardData } from '../types/dashboard'

import { currencyFormatter } from '../utils/formatters'

import DashboardCard from '../components/DashboardCard'
import TimerCard from '../components/TimerCard'



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

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            {dashboard && (

                <div className="mt-6">

                    <TimerCard />

                    <h2 className="mb-4 text-xl font-semibold">
                        Overview
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <DashboardCard
                            title="Active Clients"
                            value={dashboard.active_clients}
                        />

                        <DashboardCard
                            title="Active Projects"
                            value={dashboard.active_projects}
                        />
                    
                    </div>

                    <h2 className="mb-4 mt-8 text-xl font-semibold">
                        Time Summary
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <DashboardCard
                            title="Total Hours"
                            value={dashboard.time_summary.total_hours}
                        />

                        <DashboardCard
                            title="Billable Hours"
                            value={dashboard.time_summary.billable_hours}
                        />

                        <DashboardCard
                            title="Non-Billable Hours"
                            value={dashboard.time_summary.non_billable_hours}
                        />

                        <DashboardCard
                            title="Revenue"
                            value={currencyFormatter.format(
                                dashboard.time_summary.billable_amount
                            )}
                        />

                    </div>

                </div>
            )}
        </div>
    )
}

export default Dashboard