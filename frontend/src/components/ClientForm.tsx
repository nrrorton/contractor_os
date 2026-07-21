import { useState, useEffect } from 'react'

import type { Client } from '../types/client'
import { ui } from '../styles/ui'



interface ClientFormProps {

    client: Client | null

    onSubmit: (clientData: {
        company_name: string
        contact_name: string | null
        contact_email: string | null
        phone: string | null
        notes: string | null
    }) => Promise<void>

    onCancel: () => void

    submitting: boolean
}


function ClientForm({client, onSubmit, onCancel, submitting}: ClientFormProps) {

    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {

        if (client) {
            setCompanyName(client.company_name)
            setContactName(client.contact_name ?? '')
            setContactEmail(client.contact_email ?? '')
            setPhone(client.phone ?? '')
            setNotes(client.notes ?? '')

        } else {
            setCompanyName('')
            setContactName('')
            setContactEmail('')
            setPhone('')
            setNotes('')
        }
    }, [client])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        await onSubmit({
            company_name: companyName,
            contact_name: contactName || null,
            contact_email: contactEmail || null,
            phone: phone || null,
            notes: notes || null
        })
    }

    return (
        <div className={ui.card}>

            <h2 className={ui.sectionTitle}>
                {client ? 'Edit Client' : 'Create Client'}
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

                <div className="flex gap-2">

                    <button
                        className={ui.button}
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? client
                                ? 'Saving...' : 'Creating...'
                            : client
                                ? 'Save Changes' : 'Create Client'
                        }

                    </button>

                    {client && (

                        <button
                            type="button"
                            className={ui.secondaryButton}
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>

        </div>
    )
}

export default ClientForm