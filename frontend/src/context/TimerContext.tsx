import { createContext, useContext, useEffect, useState } from 'react'

import api from '../services/api'

import type { ActiveTimer, TimerStartData } from '../types/timer'



interface TimerContextType {

    activeTimer: ActiveTimer | null
    loading: boolean

    startTimer: (timer: TimerStartData) => Promise<void>

    stopTimer: () => Promise<void>

    refreshTimer: () => Promise<void>
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null)
    const [loading, setLoading] = useState(true)

    async function refreshTimer() {

        try {
            setLoading(true)
            const response = await api.get('/timer/active')
            setActiveTimer(response.data)

        } catch (error) {
            console.error('Failed to load active timer:', error)
            setActiveTimer(null)

        } finally {
            setLoading(false)
        }
    }

    async function startTimer(timer: TimerStartData) {

        try {
            const response = await api.post('/timer/start', timer)
            setActiveTimer(response.data)

        } catch (error) {
            console.error('Failed to start timer:', error)

        }
    }

    async function stopTimer() {

        try {
            await api.post('/timer/stop')
            setActiveTimer(null)

        } catch (error) {
            console.error('Failed to stop timer:', error)
        }
    }

    useEffect(() => {

        refreshTimer()
    }, [])

    return (
        <TimerContext.Provider
            value={{activeTimer, loading, refreshTimer, startTimer, stopTimer}}
        >
            {children}
        </TimerContext.Provider>
    )
}

export function useTimer() {

    const context = useContext(TimerContext)

    if (!context) {
        throw new Error('useTimer must be used inside TimerProvider')
    }

    return context
}
