import { useState, useEffect } from 'react'

import api from '../services/api'

import type { Client } from '../types/client'
import type { Project } from '../types/project'
import type { TimeEntry } from '../types/time_entry'

import { ui } from '../styles/ui'



interface TimeEntryFormProps {

    clients: Client[]
    projects: Project[]
    onSuccess: () => void
    entry?: TimeEntry | null
    onCancel: () => void
}


function TimeEntryForm({clients, projects, onSuccess, entry, onCancel}: TimeEntryFormProps) {

    const [selectedClientId, setSelectedClientId] = useState('')
    const [projectId, setProjectId] = useState('')

    const [workDate, setWorkDate] = useState('')
    const [hours, setHours] = useState('')
    const [description, setDescription] = useState('')
    const [billable, setBillable] = useState(true)
    const [hourlyRate, setHourlyRate] = useState('')

    const [formError, setFormError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const isEditing = entry !== null && entry !== undefined

    const availableProjects = projects.filter(
        (project) => project.client_id === Number(selectedClientId)
    )

    function resetForm() {

        setSelectedClientId('')
        setProjectId('')
        setWorkDate('')
        setHours('')
        setDescription('')
        setBillable(true)
        setHourlyRate('')
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        setFormError('')

        if (!projectId) {
            setFormError('Please select a project.')
            return
        }

        if (!hours || Number(hours) <= 0) {
            setFormError('Hours must be greater than zero.')
            return
        }

        if (!workDate) {
            setFormError('Please select a work date.')
            return
        }

        try {

            setSubmitting(true)

            if (isEditing) {

                await api.put(`/time-entries/${entry.id}`, {
                    work_date: workDate,
                    hours: Number(hours),
                    description: description || null,
                    billable,
                    hourly_rate: hourlyRate ? Number(hourlyRate) : null
                })

            } else {

                await api.post('/time-entries', {
                    project_id: Number(projectId),
                    work_date: workDate,
                    hours: Number(hours),
                    description: description || null,
                    billable,
                    hourly_rate: hourlyRate ? Number(hourlyRate) : null
                })
            }

            onSuccess()
            resetForm()

        } catch (error) {
            console.error('Failed to save time entry:', error)
            setFormError('Unable to save time entry.')

        } finally {
            setSubmitting(false)
        }

    }


    useEffect(() => {

        setFormError('')

        if (!entry) {
            return
        }

        const project = projects.find(
            (project) => project.id === entry.project_id
        )

        setProjectId(entry.project_id.toString())
        setSelectedClientId(project ? project.client_id.toString() : '')
        setWorkDate(entry.work_date)
        setHours(entry.hours.toString())
        setDescription(entry.description ?? '')
        setBillable(entry.billable)
        setHourlyRate(entry.hourly_rate?.toString() ?? '')

    }, [entry, projects])

    return (


        <div className={ui.card}>

            <h2 className={ui.sectionTitle}>
                {isEditing ? 'Edit Time Entry' : 'Add Time Entry'}
            </h2>

            {formError && (
                <p className="text-red-600">
                    {formError}
                </p>
            )}

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

                <div className={ui.buttonGroup}>

                    <button
                        className={ui.button}
                        type="submit"
                        disabled={submitting}
                    >
                        {
                            submitting
                                ? 'Saving...'
                                : isEditing
                                    ? 'Update Time Entry'
                                    : 'Create Time Entry'
                        }
                    </button>

                    {isEditing && (

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

export default TimeEntryForm