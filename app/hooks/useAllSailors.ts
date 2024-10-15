import axios from 'axios'
import { useEffect, useState } from 'react'

export interface SearchOptionsInterface {
  label: string;
  value: string;
}

export const useAllSailors = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptionsInterface[]>([{label:'', value:''}])
  const [loadingSailors, setLoadingSailors] = useState(false)

  async function fetchData() {
    try {
      setLoadingSailors(true)

      const res = await axios.get(`/api/get_sailors_for_search`)
      const data = await res.data.map(
        (sailor: { name: any; sailor_book_number: any }) => ({
          label: sailor.name,
          value: String(sailor.sailor_book_number)
        })
      )
      setSearchOptions(data)
      setLoadingSailors(false)
    } catch (error) {
      console.error('Error fetching sailors:', error)
      setLoadingSailors(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    searchOptions,
    loadingSailors
  }
}
