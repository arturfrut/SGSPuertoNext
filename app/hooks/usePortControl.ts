import useGlobalStore from "@/stores/useGlobalStore"
import axios from "axios"
import { useState, useEffect, useMemo } from "react"


interface ObservationData {
  date: string
  observation: string
}

export const usePortControl = () => {
  const { selectedShip } = useGlobalStore()
  const selectedShipOmi = selectedShip?.idOMI
  const [historyData, setHistoryData] = useState<ObservationData[]>([])
  const [page, setPage] = useState(1)

  const rowsPerPage = 7

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const fetchPortControlData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_port_control/${selectedShip?.idOMI}`
        )
        const data = response.data
        setHistoryData(
          data.map((element: { date: string }) => ({
            ...element,
            date: formatDate(element.date)
          }))
        )
        console.log(data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    if (selectedShip?.idOMI) {
      fetchPortControlData()
    }
  }, [selectedShipOmi])

  // Obtener los últimos n días desde hoy
  const getLastNDays = (n: number): string[] => {
    const dates = []
    for (let i = 0; i < n; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push(formatDate(date.toISOString()))
    }
    return dates
  }

  const totalDays = Math.ceil(
    (new Date().getTime() -
      new Date(
        historyData[historyData.length - 1]?.date || new Date()
      ).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const totalPages = Math.ceil(totalDays / rowsPerPage)

  const daysToShow = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    return getLastNDays(rowsPerPage).slice(start, start + rowsPerPage)
  }, [page])

  const isDateChecked = (date: string): boolean => {
    return historyData.some(d => d.date === date)
  }

  const getObservation = (date: string): string => {
    const entry = historyData.find(d => d.date === date)
    return entry?.observation ? entry.observation : 'sin observaciones'
  }


  return {
    historyData,
    page,
    setPage,
    daysToShow,
    isDateChecked,
    getObservation,
    totalPages
  }
}