import { useState, useEffect } from 'react'

import api from '../services/api'
import type { Client } from '../types/client'
import type { Project } from '../types/project'



function Projects() {

    const [clients, setClients] = useState<Client[]>([])
    const [projects, setProjects] = useState<Project[]>([])

    const [clientId, setClientId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

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
            description: description || null
        })

        await fetchProjects()

        setClientId('')
        setName('')
        setDescription('')
    }

    return (
        <div>
            <h1>Projects</h1>

            <h2>Create Project</h2>

            <form onSubmit={handleSubmit}>

                <select
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

                <input
                    placeholder="Project Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <button type="submit">
                    Create Project
                </button>
            </form>

            {projects.map((project) => (
                <div key={project.id}>
                    <h2>{project.name}</h2>

                    <p>
                        Status: {project.status}
                    </p>

                    <p>
                        Description: {project.description ?? 'No description'}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Projects