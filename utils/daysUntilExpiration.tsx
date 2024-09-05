

export const daysUntilExpiration = (date: string): number => {
  console.log('date', date)
  const targetDate = new Date(date.split('/').reverse().join('-'))
  const today = new Date()
  const timeDifference = targetDate.getTime() - today.getTime()
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
}

interface ExpirationStatus {
  days: number
  text: string
}

export const getExpirationStatus = (date: string): ExpirationStatus => {
  const days = daysUntilExpiration(date)
  let status: ExpirationStatus = {
    days: days,
    text: '',
  }
  
  if (days > 10) {
    status.text = 'Estas al día'
  } else if (days > 10) {
    status.text = `Tu documentación expira en ${days} días`
  } else if (days > 0) {
    status.text = `Tu documentación expiró hace ${days} días`
  }

  return status
}
