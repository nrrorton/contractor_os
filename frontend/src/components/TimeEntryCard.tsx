import { ui } from '../styles/ui'

import type { TimeEntry } from '../types/time_entry'

import { currencyFormatter, formatHours, dateFormatter } from '../utils/formatters'



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
                {dateFormatter.format(new Date(entry.work_date))}
            </p>

            <p className={ui.mutedText}>
                {formatHours(entry.hours)}
            </p>

            <p className={ui.mutedText}>
                {entry.billable ? 'Billable' : 'Non-billable'}
            </p>

            <p className={ui.mutedText}>
                Rate: {
                    entry.hourly_rate
                        ? `${currencyFormatter.format(entry.hourly_rate)}/hr`
                        : 'No hourly rate'
                }
            </p>

            {entry.description && (

                <p className={ui.mutedText}>
                    {entry.description}
                </p>
            )}
            

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