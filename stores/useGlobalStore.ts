import { NcnInterface } from '@/app/hooks/useGetNcnByShip'
import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'

// Definimos los tipos de datos para nuestro estado
export interface Ship {
  idOMI: number
  name: string
  company: string
  matricula: number
  type: string
  // Puedes añadir más propiedades según tu estructura de datos
}

export interface DocumentData {
  doc_type: string
  charged_date: string // o Date si prefieres usar objetos Date
  expiration_date: string // o Date si prefieres usar objetos Date
  sailor_book_number: number | string
  img_url: string | null // Considera que puede ser nulo como en tu JSON
  sign?: string // Si sign no es obligatorio, puede ser opcional
  charged_by: number
}

interface SailorBookData {
  sailor_book_first: DocumentData[]
  renovation: DocumentData[]
  medical_certification: DocumentData[]
  cense: DocumentData[]
  stcw: DocumentData[]
}

interface ProvisoryCardData {
  provisory_sailor_book_first: DocumentData[]
  provisory_renovation: DocumentData[]
  provisory_medical_certification: DocumentData[]
  provisory_cense: DocumentData[]
  provisory_stcw: DocumentData[]
}

export interface TripulationMemberInterface {
  sailor_book_number: number
  name: string
  rol?: string
  sailorBookData?: SailorBookData
  provisory_card?: ProvisoryCardData
  politicsSigned?: DocumentData[]
  familiarizationSigned?: DocumentData[]
  protectionExpiration?: DocumentData[] // REVISAR ESTA PARTE
  expiration_controls?: DocumentData[] // REVISAR ESTA PARTE
}

export interface CompanyInterface {
  company_name: string
  company_omi: number
}

export interface UserInfo {
  id: number
  name: string
  lastName: string
  email: string
  cellphone_number: string
  document_number: string
  document_type: string
  age: number
  city: string
  nationality: string
  comments: string
  uid: string
  roles: number[]
  ships_in_charge: number[]
}

interface SelectedTripulantInterface {
  sailor_book_number: number
  name: string
  rol?: string
}


interface State {
  userId: number | null
  userData: UserInfo | null
  roles: string[] | null
  rolSelected: string | null
  ships: Ship[]
  selectedShip: Ship | null
  tripulation: TripulationMemberInterface[]
  idCaptain: number | null // cambiar por idUser
  companyInUse: CompanyInterface | null
  companies: CompanyInterface[]
  selectedTripulant: SelectedTripulantInterface | null
  userSign: string
  ncnActive: null | NcnInterface
  setNcnActive:(ncnActive: NcnInterface) => void
  setUserSign: (userSign: string) => void
  setSelectedTripulant: (tripulant: SelectedTripulantInterface) => void
  setUserId: (userId: number) => void
  setCompanyInUse: (company: CompanyInterface) => void
  setCompanies: (companies: CompanyInterface[]) => void
  setRoles: (rol: string[]) => void
  setRolSelected: (roles: string | null) => void
  setUserData: (user: UserInfo | null) => void
  setSelectedShip: (ship: Ship | null) => void
  setShips: (barcos: Ship[]) => void
  setTripulation: (sailor: TripulationMemberInterface[]) => void
  setIdCaptain: (captain: number | null) => void
  reset: () => void
}

// Creamos un envoltorio (wrapper) para localStorage que implementa la interfaz PersistStorage
const localStorageWrapper: PersistStorage<{ ships: Ship[] }> = {
  getItem: name => {
    const item = localStorage.getItem(name)
    return item ? JSON.parse(item) : null
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: name => {
    localStorage.removeItem(name)
  }
}

// Creamos el store usando los tipos definidos y el middleware persist
const useGlobalStore = create<State>()(
  persist(
    set => ({
      // Función para limpiar los estados
      reset: () =>
        set({
          ships: []
          // userData: null,
          // roles: [],
          // rolSelected: null,
          // selectedShip: null,
          // companyInUse: null,
          // companies: []
        }),

      // Estados persistidos en localStorage
      // userId: null,

      userId: 2, // RECORDAR HACER ESTO DINÁMICO
      setUserId: userId => set({ userId }),
      companyInUse: null,
      setCompanyInUse: companyInUse => set({ companyInUse }),
      companies: [],
      setCompanies: companies => set({ companies }),
      roles: [],
      setRoles: roles => set({ roles }),
      rolSelected: null,
      setRolSelected: rolSelected => set({ rolSelected }),
      userData: null,
      setUserData: user => set({ userData: user }),
      tripulation: null,
      setTripulation: tripulation => set({ tripulation }),
      selectedShip: null,
      setSelectedShip: ship => set({ selectedShip: ship }),
      ships: [],
      setShips: ships => set({ ships }),
      idCaptain: 442, // Setear en login   Recordar sacarlo para poner userId
      setIdCaptain: idCaptain => set({ idCaptain }),
      selectedTripulant: null,
      setSelectedTripulant: selectedTripulant => set({ selectedTripulant }),
      userSign: null,
      setUserSign: userSign => set({ userSign }),
      ncnActive: null,
      setNcnActive: ncnActive => set({ ncnActive })
    }),
    {
      name: 'mi-storage', // Nombre del key en localStorage
      storage: localStorageWrapper, // Usamos el wrapper en lugar de localStorage directamente
      partialize: state => ({
        roles: state.roles,
        rolSelected: state.rolSelected,
        companies: state.companies,
        companyInUse: state.companyInUse,
        userData: state.userData,
        userId: state.userId,
        ships: state.ships,
        selectedShip: state.selectedShip,
        selectedTripulant: state.selectedTripulant,
        tripulation: state.tripulation,
        userSign: state.userSign,
        ncnActive: state.ncnActive
      }) // Solo guarda estos estados
    }
  )
)

export default useGlobalStore
