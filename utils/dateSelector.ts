export const getCurrentDateTime = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString()
  const month = (currentDate.getMonth() + 1).toString() // Sumamos 1 para que los meses comiencen desde 1
  const day = currentDate.getDate().toString()
  const hour = currentDate.getHours().toString()
  const minute = currentDate.getMinutes().toString()

  return { year, month, day, hour, minute }
}
