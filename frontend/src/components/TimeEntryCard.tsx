import { ui } from '../styles/ui'

import type { TimeEntry } from '../types/time_entry'



interface TimeEntryCardProps {

    entry: TimeEntry
    projectName: string
    onEdit: (entry: TimeEntry) => void
    onArchive: (id: number) => void
}


function TimeEntryCard({entry, projectName, onEdit, onArchive}: TimeEntryCardProps) {

    return (

        <div className={ui.listItem}>

            <h3 className={ui.cardTitle}>
                {projectName}
            </h3>

            <p className={ui.mutedText}>
                Date: {entry.work_date}
            </p>

            <p className={ui.mutedText}>
                Hours: {entry.hours}
            </p>

            <p className={ui.mutedText}>
                Billable: {entry.billable ? 'Yes' : 'No'}
            </p>

            <p className={ui.mutedText}>
                Rate: {
                    entry.hourly_rate
                        ? `$${entry.hourly_rate}/hr`
                        : 'N/A'
                }
            </p>

            <p className={ui.mutedText}>
                Description: {entry.description ?? 'N/A'}
            </p>

            <div className={ui.buttonGroup}>

                <button
                    className={ui.button}
                    onClick={() => onEdit(entry)}
                >
                    Edit
                </button>

                <button
                    className={ui.button}
                    onClick={() => onArchive(entry.id)}
                >
                    Archive
                </button>
                
            </div>

        </div>
    )
}

export default TimeEntryCard