import { ProductInterface } from '@/components/crewForms/fp502'
import axios from 'axios'
import { useState, useEffect } from 'react'

const useEppByWhitness = (sailorBook: string | number | undefined) => {
  const [eppData, setEppData] = useState<ProductInterface[]>(null)
  const [loadingEpp, setLoadingEpp] = useState(false)
  const [errorNcn, setErrorNcn] = useState<unknown>(null)
  console.log(eppData)
  useEffect(() => {
    if (!sailorBook) return
    const fetchAccidentsData = async () => {
      setLoadingEpp(true)
      setErrorNcn(null)

      try {
        const res = await axios.get(`/api/get_epp/${sailorBook}`)
        const data = await res.data
        setEppData(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorNcn(error)
      } finally {
        setLoadingEpp(false)
      }
    }

    fetchAccidentsData()
  }, [sailorBook])

  return { eppData, loadingEpp, errorNcn }
}

export default useEppByWhitness
