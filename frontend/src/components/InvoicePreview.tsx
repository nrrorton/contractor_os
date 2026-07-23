import type { InvoicePreview as InvoicePreviewType } from '../types/invoice'

import { ui } from '../styles/ui'

import { formatDateOnly, currencyFormatter } from '../utils/formatters'



interface Props {
    invoice: InvoicePreviewType
    showDescriptions: boolean
}


function InvoicePreview({invoice, showDescriptions}: Props) {

    return (

        <div className={`invoice-document ${ui.card}`}>

            <h2 className="invoice-title">
                Invoice
            </h2>

            <div className="mb-8 space-y-2">

                <div>

                    <h3 className="font-semibold">
                        Bill To: {invoice.client_name}
                    </h3>

                </div>

                <div>

                    <strong>Billing Period:</strong>{' '}
                    {formatDateOnly(invoice.start_date)}
                    {" - "}
                    {formatDateOnly(invoice.end_date)}

                </div>

            </div>
            
            <table className={ui.table}>

                <thead>

                    <tr className={ui.tableRow}>

                        <th className={ui.tableHeading}>
                            Date
                        </th>

                        <th className={ui.tableHeading}>
                            Project
                        </th>

                        {showDescriptions && (
                        
                            <th className={ui.tableHeading}>
                                Description
                            </th>

                        )}

                        <th className={ui.tableHeading}>
                            Hours
                        </th>

                        <th className={ui.tableHeading}>
                            Rate
                        </th>

                        <th className={ui.tableHeading}>
                            Amount
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {invoice.line_items.map((item) => (

                        <tr
                            key={item.id}
                            className={ui.tableRow}
                        >

                            <td className={ui.tableCell}>
                                {formatDateOnly(item.work_date)}
                            </td>

                            <td className={ui.tableCell}>
                                {item.project_name}
                            </td>

                            {showDescriptions && (

                                <td className={ui.tableCell}>
                                    {item.description ?? 'N/A'}
                                </td>

                            )}

                            <td className={ui.tableCell}>
                                {item.hours}
                            </td>

                            <td className={ui.tableCell}>
                                {currencyFormatter.format(Number(item.hourly_rate))}
                            </td>

                            <td className={ui.tableCell}>
                                {currencyFormatter.format(Number(item.amount))}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="mt-8 pt-4 text-right space-y-2">

                <p>

                    <strong>Total Hours:</strong>{" "}
                    {invoice.total_hours}

                </p>

                <p className="text-lg font-semibold">

                    <strong>Total Due:</strong>{" "}
                    {currencyFormatter.format(Number(invoice.total_amount))}

                </p>

            </div>

        </div>
    )
}

export default InvoicePreview