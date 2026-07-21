import { useEffect, useState } from 'react'

import api from '../services/api'
import type { Client } from '../types/client'
import type { Project } from '../types/project'

import { ui } from '../styles/ui'



interface ProjectFormProps {

    clients: Client[]
    project?: Project | null
    onSuccess: () => void
    onCancel: () => void
}


function ProjectForm({clients, project, onSuccess, onCancel}: ProjectFormProps) {

    const [clientId, setClientId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [hourlyRate, setHourlyRate] = useState('')

    useEffect(() => {

        if (project) {
            setClientId(String(project.client_id))
            setName(project.name)
            setDescription(project.description ?? '')
            setHourlyRate(project.hourly_rate ? String(project.hourly_rate) : '')

        } else {
            resetForm()

        }
    }, [project])

    function resetForm() {

        setClientId('')
        setName('')
        setDescription('')
        setHourlyRate('')

    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const data = {
            client_id: Number(clientId),
            name,
            description: description || null,
            hourly_rate: hourlyRate ? Number(hourlyRate) : null
        }

        if (project) {
            await api.put(`/projects/${project.id}`, data)

        } else {
            await api.post('/projects', data)

        }

        resetForm()
        onSuccess()
    }

    return (

        <div className={ui.card}>

            <h2 className={ui.sectionTitle}>
                {project ? 'Edit Project' : 'Create Project'}
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
                        disabled={Boolean(project)}
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

                <div className={ui.buttonGroup}>

                    <button
                        className={ui.button}
                        type="submit"
                    >
                        {project ? 'Update Project' : 'Create Project'}
                    </button>

                    {project && (

                        <button
                            className={ui.button}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </form>

        </div>
    )

}

export default ProjectForm