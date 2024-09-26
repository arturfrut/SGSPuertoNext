export function calculateExpirationInfo(expirationData: {
  id?: number
  id_title?: number
  id_omi?: number
  captain_id?: number
  next_expiration: any
  final_expiration: any
  lapse_expiration: any
  creation_date?: string
  images_urls?: string[]
}) {
  const now = new Date().getTime()
  const nextExpiration = new Date(expirationData.next_expiration).getTime()
  const finalExpiration = new Date(expirationData.final_expiration).getTime()
  const lapseExpiration = expirationData.lapse_expiration
    ? new Date(expirationData.lapse_expiration).getTime()
    : null

  // Calcular los días restantes para cada tipo de expiración

  const daysUntilNext = Math.ceil(
    (nextExpiration - now) / (1000 * 60 * 60 * 24)
  ) // Días para next_expiration
  const daysUntilFinal = Math.ceil(
    (finalExpiration - now) / (1000 * 60 * 60 * 24)
  ) // Días para final_expiration
  const daysUntilLapse = lapseExpiration
    ? Math.ceil((lapseExpiration - now) / (1000 * 60 * 60 * 24))
    : null // Días para lapse_expiration

  let nearExpiration = {
    message: '',
    color: '' as
      | 'danger'
      | 'warning'
      | 'primary'
      | 'default'
      | 'secondary'
      | 'success'
  }
  let lapseMessage = null

  expirationData && console.log(expirationData)

  // Calcular el estado de near expiration
  if (daysUntilNext <= 0) {
    // Si ya se venció el next_expiration
    nearExpiration.message = `Se venció hace ${Math.abs(daysUntilNext)} días`
    nearExpiration.color = 'danger'
  } else if (daysUntilNext <= 7) {
    // Si faltan 7 días o menos para next_expiration
    nearExpiration.message = `Faltan ${daysUntilNext} días para el próximo vencimiento`
    nearExpiration.color = 'warning'
  } else {
    // Si faltan más de 7 días
    nearExpiration.message = `Faltan ${daysUntilNext} días para el próximo vencimiento`
    nearExpiration.color = 'primary'
  }
  expirationData && console.log(nearExpiration.color)
  // Si existe lapse_expiration, verificar si está dentro o fuera del plazo
  if (lapseExpiration) {
    if (now >= nextExpiration && now <= lapseExpiration) {
      // Dentro del período de lapse expiration
      lapseMessage = `El período de gracia comenzó hace ${Math.abs(
        daysUntilNext
      )} días y finaliza en ${daysUntilLapse} días`
      nearExpiration.color = 'warning' // Cambiar a amarillo durante el período de gracia
    } else if (now > lapseExpiration) {
      // Si ya pasó el período de lapse expiration
      lapseMessage = `El período de gracia venció hace ${Math.abs(
        daysUntilLapse!
      )} días`
      nearExpiration.color = 'danger' // Cambiar a rojo si ya pasó lapse_expiration
    }
  }

  return {
    daysUntilNext,
    daysUntilFinal,
    daysUntilLapse,
    nearExpiration,
    lapseMessage
  }
}
