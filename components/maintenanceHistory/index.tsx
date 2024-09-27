'use client'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from '@nextui-org/react'
import { MaintenanceHistoryTable } from './maintenanceHistoryTable'

const MaintenanceHistory = () => {

  const { selectedShip } = useGlobalStore()

  return (
    <Card className='w-full  md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>Historial de mantenimiento</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <MaintenanceHistoryTable idOmi={selectedShip?.idOMI} />
      </CardBody>
    </Card>
  )
}

export default MaintenanceHistory
