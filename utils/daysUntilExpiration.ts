export const daysUntilExpiration = (date: string): number => {
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
    text: ''
  }

  if (days > 10) {
    status.text = 'Estas al día'
  } else if (days <= 10) {
    status.text = `Tu documentación expira en ${days} días`
  } else if (days > 0) {
    status.text = `Tu documentación expiró hace ${days} días`
  }

  return status
}
type ColorType = 'danger' | 'primary' | 'warning' | 'default';

// Define la interfaz Result
interface Result {
  text: string;
  color: ColorType; // Usa el alias aquí
  days: number | null;
}

// Implementa la función
export const checkDateForChip = (dateString?: string): Result => {
  const colors: Record<ColorType, ColorType> = {
    danger: 'danger',
    primary: 'primary', // Cambiado a primary
    warning: 'warning',
    default: 'default'
  };

  // Si no se pasa fecha, devolvemos el valor por defecto
  if (!dateString) {
    return {
      text: 'Fecha sin cargar',
      color: colors.default,
      days: null
    };
  }

  const targetDate = new Date(dateString);
  const today = new Date();
  const delta = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let message: string;
  let color: ColorType; // Usa el alias aquí

  if (delta > 0) {
    message = `Faltan ${delta} días`;
    color = colors.primary; // Cambiado a primary cuando la fecha no ha pasado
    if (delta < 7) {
      color = colors.warning; // Cambia a warning si faltan menos de 7 días
    }
  } else if (delta < 0) {
    message = `Vencido hace ${-delta} días`;
    color = colors.danger; // Cambia a danger si está vencido
  } else {
    message = 'Hoy es la fecha';
    color = colors.primary; // Cambia a primary si hoy es la fecha
  }

  return {
    text: message,
    color: color,
    days: delta
  };
};
