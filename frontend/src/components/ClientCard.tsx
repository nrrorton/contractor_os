import type { Client } from '../types/client'
import { ui } from '../styles/ui'



interface ClientCardProps {

    client: Client
}


function ClientCard({ client }: ClientCardProps) {

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

        </div>
    )
}

export default ClientCard