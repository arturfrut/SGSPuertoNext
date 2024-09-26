export const userShipsData = [
  {
    idOMI: 8883339,
    name: 'Margarita 1',
    company: 'Moscuzza',
    matricula: 8855,
    type: 'pesquero',
    actualTripId: 1
  },
  {
    idOMI: 939395,
    name: 'Paquita 3',
    company: 'Moscuzza',
    matricula: 4432,
    type: 'pesquero',
    actualTripId: 2
  },
  {
    idOMI: 4242339,
    name: 'Romanna 6',
    company: 'Moscuzza',
    matricula: 5678,
    type: 'pesquero',
    actualTripId: 3
  }
]

// Agregar tabla para seleccionar tipo de barco

const shipTypes = [
  'Buque de pasaje',
  'Nave de pasaje de gran velocidad',
  'Nave de carga de gran velocidad',
  'Granelero',
  'Petrolero',
  'Quimiquero',
  'Gasero',
  'Pesquero',
  'Unidad móvil de perforación mar adentro',
  'Buque de carga distinto a los anteriores' // Remolcador
]

// export const roles = [
//   "developer"
//   "administrador", // acceso total
//   "jefe de máquinas", // ve reparaciones y mantenimiento
//   "responsable técnico", // ve reparaciones y mantenimiento
//   "armador", // igual gerente de empresa
//   "representante empresa", // ve barcos de la empresa como capitan, pero no puede hacer modificaciones
//   "responsable de personal", // ve solo legajos y capacitaciones y accidentes
//   "guardia de puerto", // ve solo su formulario
//   "capitan",
//   "coordinador SGS" // ve barcos de la empresa como capitan, pero no puede hacer modificaciones
// ]

export const roles = [
  { rolId: 1, rolName: 'administrador' },
  { rolId: 2, rolName: 'jefe de máquinas' },
  { rolId: 3, rolName: 'responsable/gerente técnico' },
  { rolId: 4, rolName: 'armador' },
  { rolId: 5, rolName: 'representante empresa' },
  { rolId: 6, rolName: 'responsable de personal' },
  { rolId: 7, rolName: 'guardia de puerto' },
  { rolId: 8, rolName: 'capitan' },
  { rolId: 9, rolName: 'coordinador SGS' },
]

// Permite varios roles a la vez

// capitan tiene barcos
// jefe de maquinas tiene barcos
// guardia de puerto

export const have_companies = [3, 4, 5, 6, 9]

export const have_ships = [8, 2, 7]

// quitar representante legal y email

const companyFields = [
  'Dirección',
  'C.U.I.T.',
  'Nombre',
  'Número OMI de compañía', // sirve de id
  'Teléfono',
  'Email'
]

const shipFields = [
  'empresa', //Viene de select
  'idOMI', //sirve de Id
  'matricula',
  'tipo', // es shipTypes
  'nombre',
  'eslora',
  'manga',
  'puntal',
  'T.A.T', // tonelaje de arqueo total
  'potencia'
]
