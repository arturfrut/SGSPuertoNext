import { Button, Card, CardBody } from '@nextui-org/react'
import NextLink from 'next/link'
import { Community } from '../icons/community'

export const NewOrderRepairCard = () => {
  return (
    <Card className='bg-danger rounded-xl shadow-md px-3 w-full'>
      <CardBody className='py-5'>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <Community />
            <div className='flex flex-col'>
              <span className='text-white'>
                Crear nueva orden de reparación
              </span>
              <span className='text-white text-xs'>
                Pensar bien que voy a meter aca adentro
              </span>
            </div>
          </div>
        </div>

        <div className='flex gap-2.5 py-2 items-center justify-end'>
          {/* <NewCrewMemberModal
            searchOptions={searchOptions}
            loadingOptions={isLoading}
          /> */}
          <Button>
            <NextLink href={'/order-repair/new-order'}>Nueva reparación</NextLink>
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
