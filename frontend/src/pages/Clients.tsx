import { useEffect, useState } from 'react'

import api from '../services/api'

import type { Client } from '../types/client'
import { ui } from '../styles/ui'



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
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Clients
            </h1>

            <div className={ui.card}>

                <h2 className={ui.sectionTitle}>
                    Create Client
                </h2>

                <form
                    className={ui.form}
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label className={ui.label}>
                            Company Name
                        </label>

                        <input
                            className={ui.input}
                            value={companyName}
                            onChange={(event) => setCompanyName(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Contact Name
                        </label>

                        <input
                            className={ui.input}
                            value={contactName}
                            onChange={(event) => setContactName(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Email
                        </label>

                        <input
                            className={ui.input}
                            type="email"
                            value={contactEmail}
                            onChange={(event) => setContactEmail(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Phone
                        </label>

                        <input
                            className={ui.input}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />

                    </div>

                    <div>

                        <label className={ui.label}>
                            Notes
                        </label>

                        <textarea
                            className={ui.textarea}
                            rows={4}
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />

                    </div>

                    <button
                        className={ui.button}
                        type="submit"
                    >
                        Create Client
                    </button>

                </form>

            </div>

            <div className={ui.sectionSpacing}>

                <h2 className={ui.sectionTitle}>
                    Existing Clients
                </h2>

                <div className={ui.stack}>

                    {clients.map((client) => (

                        <div 
                            key={client.id}
                            className={ui.listItem}
                        >

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

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Clients