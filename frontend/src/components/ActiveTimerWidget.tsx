import { useEffect, useState } from 'react'

import { useTimer } from '../context/TimerContext'

import { ui } from '../styles/ui'



function ActiveTimerWidget() {

    const { activeTimer, stopTimer } = useTimer()

    const [elapsed, setElapsed] = useState('00:00:00')

    useEffect(() => {

        if (!activeTimer) {
            setElapsed('00:00:00')
            return
        }

        const timer = activeTimer

        function updateElapsed() {

            const start = new Date(timer.started_at)
            const now = new Date()
            const seconds = Math.floor((now.getTime() - start.getTime()) / 1000)
            const hours = Math.floor(seconds / 3600)
            const minutes = Math.floor((seconds % 3600) / 60)
            const remainingSeconds = seconds % 60

            setElapsed(
                `${String(hours).padStart(2, '0')}:` +
                `${String(minutes).padStart(2, '0')}:` +
                `${String(remainingSeconds).padStart(2, '0')}`
            )
        }

        updateElapsed()

        const interval = setInterval(updateElapsed, 1000)

        return () => clearInterval(interval)

    }, [activeTimer])

    if (!activeTimer) {
        return null
    }

    return (

        <div className="flex items-center gap-3">

            <div className="text-sm">

                <div className="font-medium">
                    {activeTimer.project_name}
                </div>

                <div className="text-slate-500">
                    {elapsed}
                </div>

            </div>

            <button
                className={ui.button}
                onClick={stopTimer}
            >
                Stop
            </button>

        </div>

    )
}

export default ActiveTimerWidget