import { Button, Card, CardBody } from '@nextui-org/react'
import NextLink from 'next/link'
import { Community } from '../icons/community'

export const NewPortControlCard = () => {
  return (
    <Card className='bg-danger rounded-xl shadow-md px-3 w-full'>
      <CardBody className='py-5'>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <Community />
            <div className='flex flex-col'>
              <span className='text-white'>
                Nuevo control de puerto
              </span>
              <span className='text-white text-xs'>
                Pensar bien que voy a meter aca adentro
              </span>
            </div>
          </div>
        </div>

        <div className='flex gap-2.5 py-2 items-center justify-end'>

          <Button>
            <NextLink href={'/port-control/new-control'}>Nuevo registro</NextLink>
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
