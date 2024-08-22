import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Definimos los tipos de datos para nuestro estado
interface Barco {
  id: number
  nombre: string
  // Puedes añadir más propiedades según tu estructura de datos
}

interface State {
  barcoSeleccionado: Barco | null
  setBarcoSeleccionado: (barco: Barco | null) => void
  idCapitan: number | null
  barcos: Barco[]
  setIdCapitan: (id: number) => void
  setBarcos: (barcos: Barco[]) => void
}

// Creamos el store usando los tipos definidos y el middleware persist
const useGlobalStore2 = create<State>()(
  persist(
    set => ({
      // Función para limpiar los estados
      reset: () =>
        set({ idCapitan: null, barcos: [], barcoSeleccionado: null }),

      // Estados comunes que no se almacenan en localStorage
      barcoSeleccionado: null,
      setBarcoSeleccionado: barco => set({ barcoSeleccionado: barco }),

      // Estados persistidos en localStorage
      idCapitan: null,
      barcos: [],
      setIdCapitan: id => set({ idCapitan: id }),
      setBarcos: barcos => set({ barcos })
    }),
    {
      name: 'mi-storage', // Nombre del key en localStorage
      getStorage: () => localStorage, // Puedes cambiarlo a sessionStorage si prefieres
      partialize: state => ({
        idCapitan: state.idCapitan,
        barcos: state.barcos
      }) // Solo guarda estos estados
    }
  )
)

export default useGlobalStore2
