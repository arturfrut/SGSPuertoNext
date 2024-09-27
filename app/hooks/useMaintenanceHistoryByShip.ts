import axios from "axios"
import { useState, useEffect } from "react"

interface HistoryDataInterface {
  description: string; // Descripción del mantenimiento realizado
  date: Date; // Fecha en la que se realizó el mantenimiento
  type: string; // Tipo de tarea, en este caso siempre 'mantenimiento'
}

export const useMaintenanceHistoryByShip = (idOmi: string | null | undefined | number) => {
  const [historyData, setHistoryData] = useState<HistoryDataInterface[]>([])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day} - ${month} - ${year}`
  }
  
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_maintenance_history/${idOmi}`,
          { headers: { 'Cache-Control': 'no-cache' } }
        )
        const data = response.data
        setHistoryData(
          data.map((element: HistoryDataInterface)=> ({ ...element, date: formatDate(String(element.date)) }))
        )
        console.log(data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    if (idOmi) {
      fetchMaintenanceData()
    }
  }, [idOmi])

  return {historyData, setHistoryData}

}