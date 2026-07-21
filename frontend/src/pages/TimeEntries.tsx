import { useEffect, useState } from 'react'

import api from '../services/api'

import TimeEntryForm from '../components/TimeEntryForm'
import TimeEntryCard from '../components/TimeEntryCard'

import type { Client } from '../types/client'
import type { Project } from '../types/project'
import type { TimeEntry } from '../types/time_entry'

import { ui } from '../styles/ui'



function TimeEntries() {

    const [clients, setClients] = useState<Client[]>([])
    const [projects, setProjects] = useState<Project[]>([])

    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
    const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function fetchClients() {

        try {
            const response = await api.get('/clients')
            setClients(response.data)

        } catch (error) {
            console.error('Failed to fetch clients:', error)
            setError('Unable to load clients')
        }
    }

    async function fetchProjects() {

        try {
            const response = await api.get('/projects')
            setProjects(response.data)
        
        } catch (error) {
            console.error('Failed to fetch projects:', error)
            setError('Unable to load projects')
        }
    }

    async function fetchTimeEntries() {

        try {
            setLoading(true)
            setError('')

            const response = await api.get('/time-entries')
            setTimeEntries(response.data)

        } catch (error) {
            console.error('Failed to fetch time entries:', error)
            setError('Unable to load time entries.')

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
        fetchProjects()
        fetchTimeEntries()
    }, [])


    function getProjectName(projectId: number) {

        const project = projects.find(
            (project) => project.id === projectId
        )

        return project?.name ?? 'Unknown Project'
    }

    async function handleArchiveEntry(id: number) {
        const confirmed = window.confirm('Archive this time entry?')

        if (!confirmed) {
            return

        }

        try {
            setError('')

            await api.patch(`/time-entries/${id}/archive`)

            await fetchTimeEntries()

        } catch (error) {
            console.error('Failed to archive time entry:', error)
            setError('Unable to archive time entry.')
        }
    }

    function handleEditEntry(entry: TimeEntry) {

        setEditingEntry(entry)
    }


    return (

        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Time Entries
            </h1>

            {error && (

                <div className="text-red-600">
                    {error}
                </div>
            )}

            <TimeEntryForm
                clients={clients}
                projects={projects}
                entry={editingEntry}
                onSuccess={() => {
                    fetchTimeEntries()
                    setEditingEntry(null)
                }}
                onCancel={() => setEditingEntry(null)}
            />

            <div className={ui.sectionSpacing}>

                <h2 className={ui.sectionTitle}>
                    Time Entries
                </h2>

                <div className={ui.stack}>

                    {loading && (
                        <p className={ui.mutedText}>
                            Loading time entries...
                        </p>
                    )}

                    {!loading && timeEntries.length === 0 && (
                        <p className={ui.mutedText}>
                            No time entries found.
                        </p>
                    )}

                    {!loading && timeEntries.map((entry) => (

                        <TimeEntryCard
                            key={entry.id}
                            entry={entry}
                            projectName={getProjectName(entry.project_id)}
                            onEdit={handleEditEntry}
                            onArchive={handleArchiveEntry}
                        />
                    ))}

                </div>

            </div>

        </div>
    )
}

export default TimeEntries