import type { InvoicePreview as InvoicePreviewType } from '../types/invoice'
import { ui } from '../styles/ui'



interface Props {
    invoice: InvoicePreviewType
}


function InvoicePreview({invoice}: Props) {

    return (

        <div className={`${ui.card} ${ui.sectionSpacing}`}>

            <h2 className={ui.sectionTitle}>
                Invoice Preview
            </h2>

            <div className="mb-6">

                <p>
                    <strong>Client:</strong> {invoice.client_name}
                </p>

                <p>
                    <strong>Billing Period:</strong>{" "}
                    {invoice.start_date} - {invoice.end_date}
                </p>

            </div>

            <table className={ui.table}>

                <thead>

                    <tr className={ui.tableRow}>

                        <th className={ui.tableHeading}>
                            Project
                        </th>

                        <th className={ui.tableHeading}>
                            Hours
                        </th>

                        <th className={ui.tableHeading}>
                            Amount
                        </th>


                    </tr>

                </thead>

                <tbody>

                    {invoice.projects.map(project => (

                        <tr
                            key={project.project_id}
                            className={ui.tableRow}
                        >

                            <td className={ui.tableCell}>
                                {project.project_name}
                            </td>

                            <td className={ui.tableCell}>
                                {project.hours}
                            </td>

                            <td className={ui.tableCell}>
                                $
                                {Number(project.amount).toLocaleString(
                                    undefined,
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                )}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="mt-6 space-y-1 text-right">

                <p>

                    <strong>Total Hours:</strong>{" "}
                    {invoice.total_hours}

                </p>

                <p className="text-lg font-semibold">

                    <strong>Total Due:</strong>{" "}
                    $
                    {Number(invoice.total_amount).toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    )}

                </p>

            </div>

        </div>
    )
}

export default InvoicePreview