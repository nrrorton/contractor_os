import { useEffect, useState } from 'react'

import api from '../services/api'

import type { Client } from '../types/client'
import type { Project } from '../types/project'

import { ui } from '../styles/ui'

import { getPreviousTwoWeekPeriod } from '../utils/dates'



interface InvoiceFiltersProps {

    onPreview: (
        clientId: number,
        projectId: number | null,
        startDate: string,
        endDate: string
    ) => void
}

function InvoiceFilters({onPreview}: InvoiceFiltersProps) {

    const [clients, setClients] = useState<Client[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [clientId, setClientId] = useState<number | null>(null)
    const [projectId, setProjectId] = useState<number | null>(null)

    const defaultPeriod = getPreviousTwoWeekPeriod()

    const [startDate, setStartDate] = useState(defaultPeriod.startDate)
    const [endDate, setEndDate] = useState(defaultPeriod.endDate)


    useEffect(() => {

        async function fetchClients() {

            const response = await api.get('/clients')
            setClients(response.data)
        }

        fetchClients()
    }, [])

    async function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {

        const selectedClientId = Number(event.target.value)
        setClientId(selectedClientId)
        setProjectId(null)

        const response = await api.get('/projects')

        const clientProjects = response.data.filter(
            (project: Project) => project.client_id === selectedClientId
        )

        setProjects(clientProjects)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (
            clientId === null ||
            startDate === "" ||
            endDate === ""
        ) {
            return
        }

        onPreview(clientId, projectId, startDate, endDate)
    }

    return (
        <div className={ui.card}>

            <h2 className={ui.sectionTitle}>
                Invoice Filters
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
                        value={clientId ?? ''}
                        onChange={handleClientChange}
                    >

                        <option value="">
                            Select Client
                        </option>

                        {clients.map(client => (

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
                        Project (optional)
                    </label>

                    <select
                        className={ui.select}
                        value={projectId ?? ''}
                        onChange={(event) => {
                            const value = event.target.value
                            setProjectId(value ? Number(value) : null)
                        }}
                        disabled={!clientId}
                    >

                        <option value="">
                            All Projects
                        </option>

                        {projects.map(project => (

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
                            Start Date
                        </label>

                        <input
                            className={ui.input}
                            type="date"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            End Date
                        </label>

                        <input
                            className={ui.input}
                            type="date"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                        />

                    </div>

                    <div>
        
                        <button
                            type="submit"
                            className={ui.button}
                            disabled={
                                clientId === null ||
                                startDate === "" ||
                                endDate === ""
                            }
                        >
                            Preview Invoice
                        </button>

                    </div>

            </form>

        </div>

    )
}

export default InvoiceFilters