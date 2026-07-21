
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