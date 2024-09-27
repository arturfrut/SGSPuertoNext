// CONSTANTS FOR formReports

export const cardinalDirections = ['Norte', 'Sur', 'Este', 'Oeste', 'Noreste', 'Noroeste', 'Sureste', 'Suroeste']
export const windPower = ['1', '2', '3', '4', '5']
export const seaPower = ['1', '2', '3', '4', '5']
export const seaCurrentPower = ['1', '2', '3', '4', '5']
export const hydrocarbonsTypes = [
  'Aceite',
  'Aceite hidraúlico',
  'Combustible',
  'Grasa',
  'Lodos'
]
export const yesNoSelect = ['Si', 'No']

export const accidentTypes = [
  'Daños al buque',
  'Daños a terceros',
  'Daños al medio ambiente',
  'Hecho potencialmente peligroso',
  'Accidente personal grave/leve'
]

export const monthsSelect = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

export const shipCondition = ['Calado proa', 'Calado popa', 'Fondeado']

export const shipStatusRadios = [
  'En navegación',
  'Maniobra puerto',
  'Alijo',
  'Carga/descarga',
  'Otras circunstancias'
]

export const shipOrCompany = ['Buque', 'Empresa']

export const noteClasification = ['Grave', 'Moderado']

export const noteStatus = [
  'Creación de la nota',
  'Recepción',
  'Acción',
  'Aceptación',
  'Finalizada'
]

export const riskEvaluationStatus = [
  'Primera evaluación de riesgos',
  'Segunda evaluación de riesgos'
]

export const trainingExercises = [
  {
    name: "Hombre al agua",
    id: 1,
    frequency: 60,
  },
  
  {
    name: "Colisión y Varadura",
    id: 2,
    frequency: 60,
  },
  {
    name: "Lucha contra incendio",
    id: 3,
    frequency: 30,
  },
  {
    name: "Abandono",
    id: 4,
    frequency: 30,
  },
  {
    name: "Rol de respuesta por derrame de hidrocarburos",
    id: 5,
    frequency: 30,
  },
  {
    name: "Evacuación de tripulante",
    id: 6,
    frequency: 60,
  },
  {
    name: "Buque sin propulsión / gobierno",
    id: 7,
    frequency: 365,
  },
  {
    name: "Entrada y rescate espacios cerrados",
    id: 8,
    frequency: 60,
  },

]

// Cuando hay toma de mando, cuando devuelve el mando se suspende y tiene que avisar que hay que quitar el barco de servicio
