'use client'

import useGlobalStore from '@/stores/useGlobalStore'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
} from '@nextui-org/react'
import { ExpirationTable } from './expirationTable'

export const ExpirationControls = () => {
  type FN801Values = {
    title: string
    ncn?: number
    status: string
    emisorName: string
    emisorType: 'buque' | 'empresa'
    shipCcompanyName: string
    noteCreationDate: {
      day: string
      month: string
      year: string
    }
    evidence: string
    emisorSignCreation?: {
      hasSsigned: true
      date: string
    }
  }

  const { selectedShip } = useGlobalStore()


  return (
    <Card className='w-full mx-5 md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>FC 101 - Control de vencimiento</p>
        </div>
      </CardHeader>
      <CardBody>
        <p className='mt-4'> Buque: {selectedShip?.name}</p>
        <p className='my-4'> Id OMI: {selectedShip?.idOMI}</p>

        <Button className='my-4' onClick={() => window.location.reload()}>
          Actualizar Data
        </Button>
        <ExpirationTable idOmi={selectedShip?.idOMI}/>
      </CardBody>
      <CardFooter className=' flex gap-3 justify-end'></CardFooter>
    </Card>
  )
}
