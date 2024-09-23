import { useState, useEffect } from 'react'
import axios from 'axios'

const useShipsByCompany = (selectedCompany: string | number) => {
  const [shipOptions, setShipOptions] = useState([])
  const [loadingShip, setLoadingShip] = useState(false)
  const [errorShip, setErrorShip] = useState<unknown>(null)

  useEffect(() => {
    if (!selectedCompany) return

    const fetchShipData = async () => {
      setLoadingShip(true)
      setErrorShip(null)

      try {
        const res = await axios.get(`/api/get_ships/${selectedCompany}`)
        const data = await res.data
        setShipOptions(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorShip(error)
      } finally {
        setLoadingShip(false)
      }
    }

    fetchShipData()
  }, [selectedCompany])

  return { shipOptions, loadingShip, errorShip }
}

export default useShipsByCompany
