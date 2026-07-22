
export function getPreviousTwoWeekPeriod() {

    const today = new Date()
    const day = today.getDay()
    const daysSinceMonday = day === 0 ? 6 : day - 1
    const end = new Date(today)

    end.setDate(today.getDate() - daysSinceMonday)

    end.setDate(end.getDate() - 1)

    const start = new Date(end)

    start.setDate(end.getDate() - 13)

    return {
        startDate: formatDate(start),
        endDate: formatDate(end)
    }
}


function formatDate(date: Date) {

    return date.toISOString().split('T')[0]
}