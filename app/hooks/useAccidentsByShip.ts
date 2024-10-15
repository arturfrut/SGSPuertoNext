import { useState, useEffect } from 'react'
import axios from 'axios'

interface AdditionalInfo {
  modified_date: string // Fecha en formato string
  newSign: string | null // Cadena larga
  imageadded: string | null // Array de strings
  newcomment: string | null // Cadena para el comentario
  charged_by: number | string
}

interface ChargedByData {
  name: string // Nombre de la persona encargada
  roles: number[] // Array de números para los roles
}

interface ShipData {
  ship_name: string // Nombre del barco
  company: string // Nombre de la compañía
}

export interface Accident {
  id: number
  accident_type: string[] // Array de tipos de accidentes
  date: string // Fecha del accidente
  place: string // Lugar del accidente
  le_id: string // ID relacionado al marinero
  whitness_ids: string[] | null // IDs de testigos
  ship_condition: string // Condición del barco
  wind_power: number // Fuerza del viento
  wind_direction: string // Dirección del viento
  sea_power: number // Poder del mar
  sea_direction: string // Dirección del mar
  sea_current_power: number // Fuerza de la corriente marina
  sea_current_direction: string // Dirección de la corriente marina
  sea_height: number // Altura del mar
  hc: boolean // Si hay hidrocarburos
  hc_type: string | null // Tipo de hidrocarburos
  hc_lts: string | null // Litros de hidrocarburos
  hc_actions: string | null // Acciones tomadas
  verifications: string | null // Verificaciones realizadas
  capitan_opinions: string | null // Opiniones del capitán
  captain_sign: string | null // Firma del capitán, base64 o null
  company_responsable_sign: string | null // Firma de la compañía, base64 o null
  sgs_sign: string | null // Firma del SGS, base64 o null
  ship_number: number // Número del barco
  need_comite: boolean // Si se necesita comité
  open_case: boolean // Si el caso está abierto
  additionalInfo: AdditionalInfo[] | null // Información adicional (array de objetos)
  charged_by: number // ID de la persona a cargo
  chargedByData: ChargedByData  // Datos de la persona encargada
  le_id_name: string // Nombre relacionado al le_id
  whitness_names: string[] | null // Array de nombres de los testigos
  shipData: ShipData // Datos del barco
}

const useAccidentsByShip = (shipId: string | number | undefined) => {
  const [accidents, setAccidents] = useState<Accident[]>([])
  const [loadingAccidents, setLoadingAccidents] = useState(false)
  const [errorAccidents, setErrorAccidents] = useState<unknown>(null)

  useEffect(() => {
    if (!shipId) return
    const fetchAccidentsData = async () => {
      setLoadingAccidents(true)
      setErrorAccidents(null)

      try {
        const res = await axios.get(`/api/get_accidents/${shipId}`)
        const data = await res.data
        setAccidents(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorAccidents(error)
      } finally {
        setLoadingAccidents(false)
      }
    }

    fetchAccidentsData()
  }, [shipId])

  return { accidents, loadingAccidents, errorAccidents }
}

export default useAccidentsByShip
