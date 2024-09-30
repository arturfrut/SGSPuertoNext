import axios from 'axios'
import { useState, useEffect } from 'react'

export interface ExpirationsDataInterface {
  id: number // Unique identifier for the document
  title: string // Title of the document (e.g., C.D.C.)
  have_lapse: boolean // Whether the document has a lapse period
  have_expiration: boolean // Whether the document has an expiration date
  lastChargeData: {
    // Information about the last time the document was charged
    id: number
    id_title: number
    id_omi: number
    captain_id: number
    next_expiration: string // Date in YYYY-MM-DD format
    final_expiration: string // Date in YYYY-MM-DD format
    lapse_expiration: string | null // Date in YYYY-MM-DD format or null if no lapse
    creation_date: string // Date and time in YYYY-MM-DDTHH:mm:ss.ssssss format
    images_urls: string[] // Array of image URLs as strings
  } | null // Can be null if there's no last charge data
  final_expiration: string // Date in YYYY-MM-DD format
}
export const useExpirationsByShip = (idOmi: string | number | undefined) => {
  const [expirationsData, setExpirationsData] = useState<
    ExpirationsDataInterface[]
  >([])
  useEffect(() => {
    const fetchExpirationData = async () => {
      try {
        const response = await axios.get(`/api/get_expirations/${idOmi}`)
        const data = response.data
        setExpirationsData(data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    if (idOmi) {
      fetchExpirationData()
    }
  }, [idOmi])
  return { expirationsData, setExpirationsData }
}
