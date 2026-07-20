
interface DashboardCardProps {

    title: string
    value: string | number
}

function DashboardCard ({title, value}: DashboardCardProps) {

    return (
        <div className="rounded-lg border bg-white p-6 shadow">

            <h3 className="text-sm font-medium text-gray-500">
                {title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
                {value}
            </p>
        </div>
    )
}

export default DashboardCard