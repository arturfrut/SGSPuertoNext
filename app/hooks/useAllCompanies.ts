import { useState, useEffect } from 'react'
import axios from 'axios'
import useGlobalStore from '@/stores/useGlobalStore'

const useAllCompanies = () => {
  const [loadingCompanies, setLoadingCompanies] = useState(false)
  const [errorCompanies, setErrorCompanies] = useState<unknown>(null)
  const { setCompanies } = useGlobalStore()

  useEffect(() => {
    const fetchCompaniesData = async () => {
      setLoadingCompanies(true)
      setErrorCompanies(null)
      console.log('t')
      try {
        const res = await axios.get(`/api/get_companies`)
        const data = await res.data
        setCompanies(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        alert(error.message)
        alert(error.response.data.error)
        setErrorCompanies(error)
      } finally {
        setLoadingCompanies(false)
      }
    }

    fetchCompaniesData()
  }, [])

  return { loadingCompanies, errorCompanies }
}

export default useAllCompanies
