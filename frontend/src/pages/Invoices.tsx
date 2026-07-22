import { useState } from 'react'

import InvoiceFilters from '../components/InvoiceFilters'
import InvoicePreview from '../components/InvoicePreview'
import PrintableInvoice from '../components/PrintableInvoice'

import type { InvoicePreview as InvoicePreviewData } from '../types/invoice'
import { ui } from '../styles/ui'

import api from '../services/api'




function Invoices () {

    const [invoice, setInvoice] = useState<InvoicePreviewData | null>(null)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handlePreview(
        clientId: number,
        projectId: number | null,
        startDate: string,
        endDate: string
    ) {

        try {

            setLoading(true)
            setError('')

            const response = await api.get('/invoices/preview',
                {
                    params: {
                        client_id: clientId,
                        project_id: projectId,
                        start_date: startDate,
                        end_date: endDate
                    }
                }
            )

            setInvoice(response.data)

        } catch(error) {
            console.error('Failed to generate invoice:', error)
            setError('Unable to generate invoice.')

        } finally {
            setLoading(false)
        }
    }

    function handlePrint() {
        window.print()
    }

    return (
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Invoices
            </h1>

            <InvoiceFilters 
                onPreview={handlePreview}
            />

            {error && (
                <div className="mt-4 text-red-600">
                    {error}
                </div>
            )}

            {loading && (
                <div className="mt-4">
                    Generating invoice...
                </div>
            )}

            {invoice && (

                <div className="space-y-6">

                    <InvoicePreview invoice={invoice} />

                    <button
                        className={`${ui.button} no-print`}
                        onClick={handlePrint}
                    >
                        Print Invoice
                    </button>

                    <PrintableInvoice invoice={invoice} />

                </div>

            )}

        </div>
    )

}


export default Invoices