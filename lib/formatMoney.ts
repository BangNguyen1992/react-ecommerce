export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }

  // Not display decimal if it's a whole number
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0
  }

  const formatter = Intl.NumberFormat('en-US', options)

  return formatter.format(amount / 100)
}
