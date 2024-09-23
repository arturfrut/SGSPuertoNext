import { useState, useEffect } from 'react'
import axios from 'axios'

interface DeliveryInterface {
id: number
title: string
}


const useDeliveryByShip = (selectedShip: string | number) => {
  const [delivery, setDelivery] = useState<DeliveryInterface[]>([])
  const [loadingDelivery, setLoadingDelivery] = useState(false)
  const [errorDelivery, setErrorDelivery] = useState<unknown>(null)

  useEffect(() => {
    if (!selectedShip) return

    const fetchDeliveryData = async () => {
      setLoadingDelivery(true)
      setErrorDelivery(null)

      try {
        const res = await axios.get(`/api/get_delivery/${selectedShip}`)
        const data = await res.data
        setDelivery(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorDelivery(error)
      } finally {
        setLoadingDelivery(false)
      }
    }

    fetchDeliveryData()
  }, [selectedShip])

  return { delivery, loadingDelivery, errorDelivery }
}

export default useDeliveryByShip
