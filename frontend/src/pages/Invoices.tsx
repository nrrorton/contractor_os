import { useState } from 'react'

import InvoiceFilters from '../components/InvoiceFilters'
import InvoicePreview from '../components/InvoicePreview'

import type { InvoicePreview as InvoicePreviewData } from '../types/invoice'
import { ui } from '../styles/ui'

import api from '../services/api'




function Invoices () {

    const [invoice, setInvoice] = useState<InvoicePreviewData | null>(null)

    async function handlePreview(
        clientId: number,
        projectId: number | null,
        startDate: string,
        endDate: string
    ) {

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
    }

    return (
        <div className={ui.page}>

            <h1 className={ui.pageTitle}>
                Invoices
            </h1>

            <InvoiceFilters 
                onPreview={handlePreview}
            />

            {
                invoice && (
                    <InvoicePreview invoice={invoice} />
                )

            }

        </div>
    )

}


export default Invoices