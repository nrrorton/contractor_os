import { useEffect, useState } from 'react'

import api from '../services/api'

import { useTimer } from '../context/TimerContext'
import { ui } from '../styles/ui'

import type { Project } from '../types/project'



function TimerCard() {

    const {activeTimer, startTimer, stopTimer} = useTimer()

    const [projects, setProjects] = useState<Project[]>([])
    const [projectId, setProjectId] = useState<number | null>(null)
    const [description, setDescription] = useState('')
    const [elapsed, setElapsed] = useState('')

    function calculateElapsed(startedAt: string) {

        const start = new Date(startedAt)
        const now = new Date()
        const seconds = Math.floor(
            (now.getTime() - start.getTime()) / 1000
        )
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            remainingSeconds.toString().padStart(2, '0')
        ].join(':')
    }

    useEffect(() => {

        async function fetchProjects() {
            const response = await api.get('/projects')
            setProjects(response.data)

        }

        fetchProjects()
    }, [])

    useEffect(() => {

        if (!activeTimer) {
            setElapsed('')
            return
        }

        const timer = activeTimer

        function updateElapsed() {
            setElapsed(calculateElapsed(timer.started_at))
        }

        updateElapsed()

        const interval = setInterval(updateElapsed, 1000)

        return () => {clearInterval(interval)}
    }, [activeTimer])


    async function handleStart() {

        if (!projectId) {
            return
        }

        await startTimer({
            project_id: projectId,
            description: description || null,
            billable: true,
            hourly_rate: null
        })

        setDescription('')
    }

    return (
        <div className={`${ui.card} max-w-sm`}>

            <h2 className={ui.sectionTitle}>
                Timer
            </h2>

            {!activeTimer && (

                <div className="space-y-4">

                    <select
                        className={ui.input}
                        value={projectId ?? ''}
                        onChange={(event) => setProjectId(Number(event.target.value))}
                    >

                        <option value="">
                            Select Project
                        </option>

                        {projects.map((project) => (

                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.name}
                            </option>

                        ))}

                    </select>

                    <input
                        className={ui.input}
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <button
                        className={ui.button}
                        onClick={handleStart}
                    >
                        Start Timer
                    </button>

                </div>
            )}

            {activeTimer && (

                <div className="space-y-4">

                    <p className={ui.mutedText}>
                        Running
                    </p>

                    <p className="text-3xl font-bold">
                        {elapsed}
                    </p>

                    <p>
                        {activeTimer.description ?? 'No description'}
                    </p>

                    <button
                        className={ui.button}
                        onClick={stopTimer}
                    >
                        Stop Timer
                    </button>

                </div>
            )}

        </div>
    )
}

export default TimerCard