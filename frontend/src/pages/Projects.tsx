import { useState, useEffect } from 'react'

import api from '../services/api'
import type { Client } from '../types/client'
import type { Project } from '../types/project'

import { ui } from '../styles/ui'



function Projects() {

    const [clients, setClients] = useState<Client[]>([])
    const [projects, setProjects] = useState<Project[]>([])

    const [clientId, setClientId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [hourlyRate, setHourlyRate] = useState('')

    async function fetchClients() {
        const response = await api.get('/clients')

        setClients(response.data)
    }

    async function fetchProjects() {
        const response = await api.get('/projects')

        setProjects(response.data)
    }

    useEffect(() => {
        fetchClients()
        fetchProjects()
    }, [])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        await api.post('/projects', {
            client_id: Number(clientId),
            name: name,
            description: description || null,
            hourly_rate: hourlyRate ? Number(hourlyRate) : null
        })

        await fetchProjects()

        setClientId('')
        setName('')
        setDescription('')
        setHourlyRate('')
    }

    function getClientName(clientId: number) {

        const client = clients.find((client) => client.id === clientId)

        return client?.company_name ?? 'Unknown Client'
    }

    return (
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Projects
            </h1>

            <div className={ui.card}>

                <h2 className={ui.sectionTitle}>
                    Create Project
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
                            value={clientId}
                            onChange={(event) => setClientId(event.target.value)}
                        >
                            <option value="">
                                Select a Client
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
                            Project Name
                        </label>

                        <input
                            className={ui.input}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Hourly Rate
                        </label>

                        <input
                            className={ui.input}
                            type="number"
                            value={hourlyRate}
                            onChange={(event) => setHourlyRate(event.target.value)}
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

                    <button 
                        className={ui.button}
                        type="submit"
                    >
                        Create Project
                    </button>

                </form>

            </div>

            <div className={ui.sectionSpacing}>

                <h2 className={ui.sectionTitle}>
                    Existing Projects
                </h2>

                <div className={ui.stack}>

                    {projects.map((project) => (

                        <div 
                            key={project.id}
                            className={ui.listItem}
                        >

                            <h3 className={ui.cardTitle}>
                                {project.name}
                            </h3>

                            <p className={ui.mutedText}>
                                Client: {getClientName(project.client_id)}
                            </p>

                            <p className={ui.mutedText}>
                                Status: {project.status}
                            </p>

                            <p className={ui.mutedText}>
                                Description: {project.description ?? 'No description'}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Projects