import { useEffect, useState } from 'react'

import api from '../services/api'
import type { Client } from '../types/client'



function Clients() {

    const [clients, setClients] = useState<Client[]>([])

    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')

    async function fetchClients() {
        const response = await api.get('/clients')

        setClients(response.data)
    }

    useEffect(() => {
        fetchClients()
    }, [])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        await api.post('/clients', {
            company_name: companyName,
            contact_name: contactName || null,
            contact_email: contactEmail || null,
            phone: phone || null,
            notes: notes || null
        })

        await fetchClients()

        setCompanyName('')
        setContactName('')
        setContactEmail('')
        setPhone('')
        setNotes('')
    }

    return (
        <div>
            <h1>Clients</h1>

                <h2>Create Client</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                    />

                    <input
                        placeholder="Contact Name"
                        value={contactName}
                        onChange={(event) => setContactName(event.target.value)}
                    />

                    <input
                        placeholder="Email"
                        value={contactEmail}
                        onChange={(event) => setContactEmail(event.target.value)}
                    />

                    <input
                        placeholder="Phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />

                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                    />

                    <button type="submit">
                        Create Client
                    </button>

                </form>

                    {clients.map((client) => (
                        <div key={client.id}>
                            <h2>
                                {client.company_name}
                            </h2>

                            <p>
                                Contact: {client.contact_name ?? 'N/A'}
                            </p>

                            <p>
                                Email: {client.contact_email ?? 'N/A'}
                            </p>
                        </div>
                    ))}
        </div>
    )
}

export default Clients