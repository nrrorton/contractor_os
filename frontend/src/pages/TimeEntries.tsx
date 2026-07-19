import { useEffect, useState } from 'react'

import api from '../services/api'

import type { Client } from '../types/client'
import type { Project } from '../types/project'
import type { TimeEntry } from '../types/time_entry'



function TimeEntries() {

    const [clients, setClients] = useState<Client[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

    const [selectedClientId, setSelectedClientId] = useState('')
    const [projectId, setProjectId] = useState('')

    const [workDate, setWorkDate] = useState('')
    const [hours, setHours] = useState('')
    const [description, setDescription] = useState('')
    const [billable, setBillable] = useState(true)
    const [hourlyRate, setHourlyRate] = useState('')

    async function fetchClients() {
        const response = await api.get('/clients')

        setClients(response.data)
    }

    async function fetchProjects() {
        const response = await api.get('/projects')

        setProjects(response.data)
    }

    async function fetchTimeEntries() {
        const response = await api.get('/time-entries')

        setTimeEntries(response.data)
    }

    useEffect(() => {
        fetchClients()
        fetchProjects()
        fetchTimeEntries()
    }, [])

    const availableProjects = projects.filter(
        (project) => project.client_id === Number(selectedClientId)
    )

    function getProjectName(projectId: number) {

        const project = projects.find(
            (project) => project.id === projectId
        )

        return project?.name ?? 'Unknown Project'
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        await api.post('/time-entries', {
            project_id: Number(projectId),
            work_date: workDate,
            hours: Number(hours),
            description: description || null,
            billable,
            hourly_rate: hourlyRate ? Number(hourlyRate) : null
        })

        await fetchTimeEntries()

        setSelectedClientId('')
        setProjectId('')
        setWorkDate('')
        setHours('')
        setDescription('')
        setBillable(true)
        setHourlyRate('')
    }

    return (
        <div>
            <h1>Time Entries</h1>

            <h2>Create Time Entry</h2>

            <form onSubmit={handleSubmit}>

                <select
                    value={selectedClientId}
                    onChange={(event) => {
                        setSelectedClientId(event.target.value)
                        setProjectId('')
                    }}
                >
                    <option value="">
                        Select Client
                    </option>

                    {clients.map((client) => (
                        <option
                            key={client.id}
                            value={client.id}
                        >
                            {client.company_name}
                        </option>
                    ))}

                </select>

                <select
                    value={projectId}
                    onChange={(event) => setProjectId(event.target.value)}
                    disabled={!selectedClientId}
                >
                    <option value="">
                        Select Project
                    </option>

                    {availableProjects.map((project) => (
                        <option
                            key={project.id}
                            value={project.id}
                        >
                            {project.name}
                        </option>
                    ))}

                </select>

                <input
                    type="date"
                    value={workDate}
                    onChange={(event) => setWorkDate(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Hours"
                    value={hours}
                    onChange={(event) => setHours(event.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={billable}
                        onChange={(event) => setBillable(event.target.checked)}
                    />

                    Billable
                </label>

                <input
                    type="number"
                    placeholder="Hourly Rate"
                    value={hourlyRate}
                    onChange={(event) => setHourlyRate(event.target.value)}
                />

                <button type="submit">
                    Create Time Entry
                </button>

            </form>

            <h2>Time Entries</h2>

            {timeEntries.map((entry) => (
                <div key={entry.id}>

                    <p>
                        Date: {entry.work_date}
                    </p>

                    <p>
                        Project: {getProjectName(entry.project_id)}
                    </p>

                    <p>
                        Hours: {entry.hours}
                    </p>

                    <p>
                        Description: {entry.description ?? 'No description'}
                    </p>

                    <p>
                        Billable: {entry.billable ? 'Yes' : 'No'}
                    </p>

                    <hr />

                </div>
            ))}

        </div>
    )
}

export default TimeEntries