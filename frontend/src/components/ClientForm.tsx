import { useState } from 'react'

import { ui } from '../styles/ui'



interface ClientFormProps {

    onSubmit: (clientData: {
        company_name: string
        contact_name: string | null
        contact_email: string | null
        phone: string | null
        notes: string | null
    }) => Promise<void>

    submitting: boolean
}


function ClientForm({onSubmit, submitting}: ClientFormProps) {

    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        await onSubmit({
            company_name: companyName,
            contact_name: contactName || null,
            contact_email: contactEmail || null,
            phone: phone || null,
            notes: notes || null
        })

        setCompanyName('')
        setContactName('')
        setContactEmail('')
        setPhone('')
        setNotes('')
    }

    return (
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
                    disabled={submitting}
                >
                    {submitting ? 'Creating...' : 'Create Client'}
                </button>

            </form>

        </div>
    )
}

export default ClientForm