import { useEffect, useState } from 'react'

import api from '../services/api'
import ClientCard from '../components/ClientCard'
import ClientForm from '../components/ClientForm'

import type { Client, ClientCreateData } from '../types/client'
import { ui } from '../styles/ui'



function Clients() {

    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function fetchClients() {
        
        try {
            setLoading(true)
            setError('')

            const response = await api.get('/clients')

            setClients(response.data)

        } catch (error) {
            setError('Failed to load clients.')

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    async function handleCreateClient(clientData: ClientCreateData) {

        try {
            setSubmitting(true)
            setError('')

            await api.post('/clients', clientData)

            await fetchClients()

        } catch {
            setError('Failed to create client.')

        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Clients
            </h1>

            {error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}

            <ClientForm
                submitting={submitting}
                onSubmit={handleCreateClient}
            />

            <div className={ui.sectionSpacing}>

                <h2 className={ui.sectionTitle}>
                    Existing Clients
                </h2>

                <div className={ui.stack}>

                    {loading && (
                        <p className={ui.mutedText}>
                            Loading clients...
                        </p>
                    )}

                    {!loading && clients.length === 0 && (
                        <p className={ui.mutedText}>
                            No clients found.
                        </p>
                    )}

                    {!loading && clients.map((client) => (

                        <ClientCard
                            key={client.id}
                            client={client}
                        />

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Clients