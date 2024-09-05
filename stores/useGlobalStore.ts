import { mockTripulation } from '@/mocks/crewListMock'
import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'

// Definimos los tipos de datos para nuestro estado
export interface Ship {
  idOMI: number
  name: string
  company: string
  matricula: number
  type: string
  actualTripulationID?: number
  // Puedes añadir más propiedades según tu estructura de datos
}

interface TripulationExpirationsInterface {
  sailor_book_first: string
  renovation: string
  medical_certification: string | null
  cense: string | null
  stcw: string | null
}

export interface TripulationMemberInterface {
  sailor_book_number: number
  name: string
  rol: string
  observationsNumber: number
  documentsRegisterId: number
  sailorBookData?: TripulationExpirationsInterface | {} // Permitimos objeto vacío
  provisory_card?: TripulationExpirationsInterface
  politicsSigned: boolean
  familiarizationSigned: boolean
  protectionExpiration: string
  expiration_controls: TripulationExpirationsInterface
}

interface State {
  ships: Ship[]
  selectedShip: Ship | null
  tripulation: TripulationMemberInterface[]
  idCaptain: number | null,
  setSelectedShip: (ship: Ship | null) => void
  setShips: (barcos: Ship[]) => void
  setTripulation: (sailor: TripulationMemberInterface[]) => void
  setIdCaptain: (captain : number | null) => void
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
      reset: () => set({ ships: [] }),

      // // Estados comunes que no se almacenan en localStorage
      // selectedShip: null,
      // setSelectedShip: (ship) => set({ selectedShip: ship }),

      // Estados persistidos en localStorage
      tripulation: mockTripulation,
      setTripulation: tripulation => set({ tripulation }),
      selectedShip: null,
      setSelectedShip: ship => set({ selectedShip: ship }),
      ships: [],
      setShips: ships => set({ ships }),
      idCaptain: 442, // Setear en login
      setIdCaptain: idCaptain => set({ idCaptain })
    }),
    {
      name: 'mi-storage', // Nombre del key en localStorage
      storage: localStorageWrapper, // Usamos el wrapper en lugar de localStorage directamente
      partialize: state => ({
        ships: state.ships,
        selectedShip: state.selectedShip
      }) // Solo guarda estos estados
    }
  )
)

export default useGlobalStore
