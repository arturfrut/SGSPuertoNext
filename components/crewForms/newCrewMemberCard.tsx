import { Card, CardBody } from '@nextui-org/react'
import { Community } from '../icons/community'
import { NewCrewMemberModal } from './NewCrewMemberModal'
import { useAllSailors } from '@/app/hooks/useAllSailors'


export const NewCrewMemberCard = () => {
  const {searchOptions, loadingSailors } = useAllSailors()

  console.log(searchOptions)

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
            loadingOptions={loadingSailors}
          />
        </div>
      </CardBody>
    </Card>
  )
}