export const generateExpirationDate = (): string => {
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)
  return nextYear.toISOString().split('T')[0]
}