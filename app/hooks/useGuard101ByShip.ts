import axios from 'axios'
import { useState, useEffect } from 'react'

export interface GuardInfo {
  id: number
  charged_by: number
  guard_sign: string
  guard_name: string
  ship_id_omi: number
  charged_date: string // ISO 8601 date format
  expiration_date: string // 'YYYY-MM-DD' format
  docType: string
}

const useGuard101ByShip = (shipId: string | number | undefined) => {
  const [guardData, setGuardData] = useState<GuardInfo>(null)
  const [loadingGuard, setLoadingGuard] = useState(false)
  const [errorGuard, setErrorGuard] = useState<unknown>(null)

  useEffect(() => {
    if (!shipId) return
    const fetchAccidentsData = async () => {
      setLoadingGuard(true)
      setErrorGuard(null)

      try {
        const res = await axios.get(
          `/api/get_port_control_101_by_ship/${shipId}`
        )
        const data = await res.data
        setGuardData(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorGuard(error)
      } finally {
        setLoadingGuard(false)
      }
    }

    fetchAccidentsData()
  }, [shipId])

  return { guardData, loadingGuard, errorGuard }
}

export default useGuard101ByShip
