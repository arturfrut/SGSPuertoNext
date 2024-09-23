import { useState, useEffect } from 'react'
import axios from 'axios'

const useAllCompanies = () => {
  const [companyOptions, setCompanyOptions] = useState([])
  const [loadingCompanies, setLoadingCompanies] = useState(false)
  const [errorCompanies, setErrorCompanies] = useState<unknown>(null)

  useEffect(() => {

    const fetchShipData = async () => {
      setLoadingCompanies(true)
      setErrorCompanies(null)

      try {
        const res = await axios.get(`/api/get_companies`)
        const data = await res.data
        setCompanyOptions(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorCompanies(error)
      } finally {
        setLoadingCompanies(false)
      }
    }

    fetchShipData()
  }, [])

  return { companyOptions,  loadingCompanies, errorCompanies }
}

export default useAllCompanies
