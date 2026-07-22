import { useState } from 'react'

import InvoiceFilters from '../components/InvoiceFilters'
import InvoicePreview from '../components/InvoicePreview'

import type { InvoicePreview as InvoicePreviewData } from '../types/invoice'
import { ui } from '../styles/ui'

import api from '../services/api'




function Invoices () {

    const [invoice, setInvoice] = useState<InvoicePreviewData | null>(null)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showDescriptions, setShowDescriptions] = useState(true)

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
        <div className={`${ui.page} invoice-page`}>

            <h1 className={`${ui.pageTitle} no-print`}>
                Invoices
            </h1>

            <div className="no-print">

                <InvoiceFilters 
                    onPreview={handlePreview}
                />

            </div>

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

                <div className="mt-6 space-y-6">

                    <InvoicePreview 
                        invoice={invoice}
                        showDescriptions={showDescriptions} 
                    />

                    <div className="flex items-center justify-between no-print">

                        <label
                            htmlFor="show-descriptions"
                            className="flex items-center gap-2"
                        >

                            <input
                                id="show-descriptions"
                                type="checkbox"
                                checked={showDescriptions}
                                onChange={(event) => setShowDescriptions(event.target.checked)}
                            />

                            <span>
                                Include work descriptions
                            </span>

                        </label>

                        <button
                            className={ui.button}
                            onClick={handlePrint}
                        >
                            Print Invoice
                        </button>

                    </div>

                </div>

            )}

        </div>
    )

}


export default Invoices