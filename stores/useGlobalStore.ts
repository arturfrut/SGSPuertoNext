

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Definimos los tipos de datos para nuestro estado
interface Ship {
  id: number
  nombre: string
  // Puedes añadir más propiedades según tu estructura de datos
}

interface State {
  ships: Ship[]
  selectedShip: Ship | null
  setSelectedShip: (ship: Ship | null) => void
  // setIdCapitan: (id: number) => void
  setShips: (barcos: Ship[]) => void
}

// Creamos el store usando los tipos definidos y el middleware persist
const useGlobalStore = create<State>()(
  persist(
    set => ({
      // Función para limpiar los estados
      reset: () => set({ ships: [] }),

      // Estados comunes que no se almacenan en localStorage
      selectedShip: null,
      setSelectedShip: ship => set({ selectedShip: ship }),

      // Estados persistidos en localStorage
      ships: [],
      setShips: ships => set({ ships })
    }),
    {
      name: 'mi-storage', // Nombre del key en localStorage
      getStorage: () => localStorage, // Puedes cambiarlo a sessionStorage si prefieres
      partialize: state => ({
        barcos: state.ships
      }) // Solo guarda estos estados
    }
  )
)

export default useGlobalStore
