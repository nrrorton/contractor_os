import { useState, useEffect } from 'react'

import api from '../services/api'

import ProjectForm from '../components/ProjectForm'
import ProjectCard from '../components/ProjectCard'

import type { Client } from '../types/client'
import type { Project } from '../types/project'

import { ui } from '../styles/ui'



function Projects() {

    const [clients, setClients] = useState<Client[]>([])
    const [projects, setProjects] = useState<Project[]>([])

    const [editingProject, setEditingProject] = useState<Project | null>(null)

    async function fetchClients() {

        try {
            const response = await api.get('/clients')

            setClients(response.data)

        } catch (error) {
            console.error("Failed to fetch clients:", error)
        }

    }

    async function fetchProjects() {

        try {
            const response = await api.get('/projects')

            setProjects(response.data)

        } catch (error) {
            console.error("Failed to fetch projects:", error)

        }

    }

    useEffect(() => {
        fetchClients()
        fetchProjects()
    }, [])


    function getClientName(clientId: number) {

        const client = clients.find((client) => client.id === clientId)

        return client?.company_name ?? 'Unknown Client'
    }

    return (
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Projects
            </h1>

                <ProjectForm
                    clients={clients}
                    project={editingProject}
                    onSuccess={() => {
                        fetchProjects()
                        setEditingProject(null)}}
                    onCancel={() => setEditingProject(null)}
                />

            <div className={ui.sectionSpacing}>

                <h2 className={ui.sectionTitle}>
                    Existing Projects
                </h2>

                <div className={ui.stack}>

                    {projects.map((project) => (

                        <ProjectCard
                            key={project.id}
                            project={project}
                            clientName={getClientName(project.client_id)}
                            onEdit={setEditingProject}
                            onArchived={fetchProjects}
                        />

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Projects