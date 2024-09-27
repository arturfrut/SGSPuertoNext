import { Card, CardBody } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Community } from '../icons/community'
import { NewCrewMemberModal } from './NewCrewMemberModal'

export const NewCrewMemberCard = () => {
  const [searchOptions, setSearchOptions] = useState([{label:'222', value:'222'}])

  async function fetchData() {
    try {
      const res = await axios.get(`/api/get_sailors_for_search`)
      const data = await res.data.map((sailor: { name: any; sailor_book_number: any }) => ({
        label: sailor.name,
        value: sailor.sailor_book_number,
      }))
      setSearchOptions(data)
    } catch (error) {
      console.error("Error fetching sailors:", error)
    } 
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card className='bg-danger rounded-xl shadow-md px-3 w-full'>
      <CardBody className='py-5'>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <Community />
            <div className='flex flex-col'>
              <span className='text-white'>Agregar nuevo Tripulante</span>
              <span className='text-white text-xs'>
                Pensar bien que voy a meter aca adentro, y si se agregar aparte
                la carga de libretas
              </span>
            </div>
          </div>
        </div>
        <div className='flex gap-2.5 py-2 items-center'>
          <span className='text-white'>Status:</span>
          <span className='text-white'>OK</span>
        </div>
        <div className='flex gap-2.5 py-2 items-center justify-end'>
          <NewCrewMemberModal
            searchOptions={searchOptions}
            // loadingOptions={isLoading}
          />
        </div>
      </CardBody>
    </Card>
  )
}