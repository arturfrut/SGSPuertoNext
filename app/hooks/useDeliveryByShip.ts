import { useState, useEffect } from 'react'
import axios from 'axios'

export interface DeliveryInterface {
  id: number
  title: string
  oldComments: string | null
}

export interface ProcessedDeliveryInterface extends DeliveryInterface {
  newComment: string | null
  isChecked: boolean
}

const useDeliveryByShip = (selectedShip: string | number) => {
  const [delivery, setDelivery] = useState<ProcessedDeliveryInterface[]>([])
  const [loadingDelivery, setLoadingDelivery] = useState(false)
  const [errorDelivery, setErrorDelivery] = useState<unknown>(null)
  const [lastCharge, setLastCharge] = useState()

  const processData = (delivery: [any]) => {
    return delivery.map(el => ({
      ...el,
      newComment: null,
      isChecked: false
    }))
  }

  useEffect(() => {
    if (!selectedShip) return

    const fetchDeliveryData = async () => {
      setLoadingDelivery(true)
      setErrorDelivery(null)

      try {
        const res = await axios.get(`/api/get_delivery/${selectedShip}`)
        const data = await res.data
        setDelivery(processData(data.basicData))
        setLastCharge(data.lastCharge)
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

  return { delivery, loadingDelivery, errorDelivery, setDelivery, lastCharge }
}

export default useDeliveryByShip
