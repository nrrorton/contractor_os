import type { InvoicePreview as InvoicePreviewType } from '../types/invoice'

import { ui } from '../styles/ui'



interface PrintableInvoiceProps {

    invoice: InvoicePreviewType
}


function PrintableInvoice({invoice}: PrintableInvoiceProps) {

    return (

        <div className={`print-area ${ui.card}`}>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Invoice
                </h1>

                <p>
                    Invoice Period:
                    {' '}
                    {invoice.start_date}
                    {' '}
                    -
                    {' '}
                    {invoice.end_date}
                </p>

            </div>

            <div className="mb-8">

                <h2 className="text-xl font-semibold">
                    Bill To:
                </h2>

                <p>
                    {invoice.client_name}
                </p>

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

                        <th className={ui.tableHeading}>
                            Description
                        </th>

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
                                {item.work_date}
                            </td>

                            <td className={ui.tableCell}>
                                {item.project_name}
                            </td>

                            <td className={ui.tableCell}>
                                {item.description ?? 'N/A'}
                            </td>

                            <td className={ui.tableCell}>
                                {item.hours}
                            </td>

                            <td className={ui.tableCell}>
                                $
                                {Number(item.hourly_rate).toFixed(2)}
                            </td>

                            <td className={ui.tableCell}>
                                $
                                {Number(item.amount).toFixed(2)}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="mt-8 text-right">

                <p>
                    Total Hours:
                    {' '}
                    {invoice.total_hours}
                </p>

                <p className="text-xl font-bold">
                    Total Due:
                    {' '}
                    ${Number(invoice.total_amount).toFixed(2)}
                </p>

            </div>

        </div>
    )
}

export default PrintableInvoice