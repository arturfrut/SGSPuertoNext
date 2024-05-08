import { Button, Card, CardBody, Tooltip } from '@nextui-org/react'
import { Community } from '../icons/community'
import Link from 'next/link'

export const AccidentReportCard = () => {
  return (
    <Card className='bg-danger rounded-xl shadow-md px-3 w-full'>
      <CardBody className='py-5'>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <Community />
            <div className='flex flex-col'>
              <span className='text-white'>Reportar nuevo accidente</span>
              <span className='text-white text-xs'>18/03/2024 16:13:00</span>
            </div>
          </div>
          <Tooltip
            showArrow
            content='Recuerde cerrar comando al terminar su viaje'
          >
            <div className='flex items-center justify-center rounded-full bg-gray-300 w-5 h-5'>
              <h2 className='text-gray-600'>&#8520;</h2>
            </div>
          </Tooltip>
        </div>
        <div className='flex gap-2.5 py-2 items-center'>
          <span className='text-white'>Status:</span>
          <span className='text-white'>OK</span>
        </div>
        <div className='flex gap-2.5 py-2 items-center justify-end'>
          {/* <Button color='warning'>Cerrar comando</Button> */}
          <Link href='/accidentreports/formReports'>
            <Button>Reportar</Button>
          </Link>
          {/* TODO: Hacer que me lleve a la pantalla de cerrar comando */}
        </div>
      </CardBody>
    </Card>
  )
}
