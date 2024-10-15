import useGlobalStore from '@/stores/useGlobalStore'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCrewMembersAccordion = () => {
  const [loadingCrew, setLoadingCrew] = useState(false)
  const [errorCrew, setErrorCrew] = useState<unknown>(null)
  const { setTripulation, selectedShip } = useGlobalStore()

  useEffect(() => {
    const fetchCrewData = async () => {
      setLoadingCrew(true)
      setErrorCrew(null)

      try {
        const res = await axios.get(
          `/api/get_crew_by_ship/${selectedShip.idOMI}`
        )
        const data = await res.data
        console.log(data)
        setTripulation(data)
      } catch (error) {
        console.error('Error fetching crew:', error)
        setErrorCrew(error)
      } finally {
        setLoadingCrew(false)
      }
    }

    fetchCrewData()
  }, [])

  return {  errorCrew, loadingCrew }
}
