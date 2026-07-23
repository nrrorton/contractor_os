
export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium'
})


export function formatHours(hours: number) {
    return `${hours.toFixed(2)} hrs`
}


export function formatDateOnly(date: string) {
    const [year, month, day] = date.split('-')

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium'
    }).format(
        new Date(Number(year), Number(month) - 1, Number(day))
    )
}