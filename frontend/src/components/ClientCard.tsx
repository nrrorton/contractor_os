import type { Client } from '../types/client'
import { ui } from '../styles/ui'



interface ClientCardProps {

    client: Client
    onEdit: (client: Client) => void
    onArchive: (clientId: number) => void
}


function ClientCard({ client, onEdit, onArchive }: ClientCardProps) {

    return (
        <div className={ui.listItem}>

            <h3 className={ui.cardTitle}>
                {client.company_name}
            </h3>

            <p className={ui.mutedText}>
                Contact: {client.contact_name ?? 'N/A'}
            </p>

            <p className={ui.mutedText}>
                Email: {client.contact_email ?? 'N/A'}
            </p>

            <p className={ui.mutedText}>
                Phone: {client.phone ?? 'N/A'}
            </p>

            <div className="mt-4 flex gap-2">

                <button
                    className={ui.secondaryButton}
                    onClick={() => onEdit(client)}
                >
                    Edit
                </button>

                <button
                    className={ui.secondaryButton}
                    onClick={() => {
                        const confirmed = window.confirm(
                            `Archive ${client.company_name}?`
                        )

                        if (confirmed) {
                            onArchive(client.id)
                        }
                    }}
                >
                    Archive
                </button>

            </div>

        </div>
    )
}

export default ClientCard