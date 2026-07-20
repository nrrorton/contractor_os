import { useEffect, useState } from 'react'

import api from '../services/api'

import type { Client } from '../types/client'
import type { Project } from '../types/project'
import type { TimeEntry } from '../types/time_entry'

import { ui } from '../styles/ui'



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
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Time Entries
            </h1>

            <div className={ui.card}>

                <h2 className={ui.sectionTitle}>
                    Create Time Entry
                </h2>

                <form 
                    className={ui.form}
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label className={ui.label}>
                            Client
                        </label>

                        <select
                            className={ui.select}
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

                    </div>

                    <div>

                        <label className={ui.label}>
                            Project
                        </label>

                        <select
                            className={ui.select}
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

                    </div>

                    <div>

                        <label className={ui.label}>
                            Work Date
                        </label>

                        <input
                            className={ui.input}
                            type="date"
                            value={workDate}
                            onChange={(event) => setWorkDate(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Hours
                        </label>

                        <input
                            className={ui.input}
                            type="number"
                            step="0.25"
                            value={hours}
                            onChange={(event) => setHours(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Description
                        </label>

                        <textarea
                            className={ui.textarea}
                            rows={4}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Hourly Rate
                        </label>
                    
                        <input
                            className={ui.input}
                            type="number"
                            step="0.01"
                            value={hourlyRate}
                            onChange={(event) => setHourlyRate(event.target.value)}
                        />

                    </div>

                    <label className="flex items-center gap-3">

                        <input
                            className={ui.checkbox}
                            type="checkbox"
                            checked={billable}
                            onChange={(event) => setBillable(event.target.checked)}
                        />

                        <span className={ui.label}>
                            Billable
                        </span>

                    </label>

                    <button 
                        className={ui.button}
                        type="submit"
                    >
                        Create Time Entry
                    </button>

                </form>

            </div>

            <div className={ui.sectionSpacing}>

                <h2 className={ui.sectionTitle}>
                    Time Entries
                </h2>

                <div className={ui.stack}>

                    {timeEntries.map((entry) => (

                        <div 
                            key={entry.id}
                            className={ui.listItem}
                        >

                            <h3 className={ui.cardTitle}>
                                {getProjectName(entry.project_id)}
                            </h3>

                            <p className={ui.mutedText}>
                                Date: {entry.work_date}
                            </p>

                            <p className={ui.mutedText}>
                                Hours: {entry.hours}
                            </p>

                            <p className={ui.mutedText}>
                                Billable: {entry.billable ? 'Yes': 'No'}
                            </p>

                            <p className={ui.mutedText}>
                                Rate: {entry.hourly_rate ? `$${entry.hourly_rate}/hr` : 'N/A'}
                            </p>

                            <p className={ui.mutedText}>
                                Description: {entry.description ?? 'N/A'}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default TimeEntries