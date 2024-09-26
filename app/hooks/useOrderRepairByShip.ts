import axios from 'axios'
import { useEffect, useState } from 'react'

export const useOrderRepairByShip = (
  selectedShipOmi: string | number | undefined
) => {
  const [historyData, setHistoryData] = useState([])
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
          `http://localhost:3000/api/get_maintenance_history/${selectedShipOmi}`
        )
        const data = response.data
        setHistoryData(
          data.map(element => ({ ...element, date: formatDate(element.date) }))
        )
        console.log('maintenance', data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    if (selectedShipOmi) {
      fetchMaintenanceData()
    }
  }, [selectedShipOmi])

  return {
    historyData,
    setHistoryData
  }
}
