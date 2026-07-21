import api from '../services/api'

import type { Project } from '../types/project'

import { ui } from '../styles/ui'



interface ProjectCardProps {

    project: Project
    clientName: string
    onEdit: (project: Project) => void
    onArchived: () => void
}


function ProjectCard({project, clientName, onEdit, onArchived}: ProjectCardProps) {

    async function handleArchive() {
        const confirmed = window.confirm(
            'Are you sure you want to archive this project?'
        )

        if (!confirmed) {
            return
        }

        await api.patch(`/projects/${project.id}/archive`)
        
        onArchived()

    }

    return (

        <div className={ui.listItem}>

            <h3 className={ui.cardTitle}>
                {project.name}
            </h3>

            <p className={ui.mutedText}>
                Client: {clientName}
            </p>

            <p className={ui.mutedText}>
                Status: {project.status}
            </p>

            <p className={ui.mutedText}>
                Hourly Rate: {project.hourly_rate
                ? `$${project.hourly_rate}/hr`
                : 'No rate set'}
            </p>

            <p className={ui.mutedText}>
                Description: {project.description ?? 'No description'}
            </p>

            <div className={ui.buttonGroup}>

                <button
                    className={ui.button}
                    onClick={() => onEdit(project)}
                >
                    Edit
                </button>

                <button
                    className={ui.button}
                    onClick={handleArchive}
                >
                    Archive
                </button>

            </div>

        </div>
    )
}

export default ProjectCard