import { Button, Card, CardBody, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { Community } from '../icons/community'

export const CardForm501 = () => {
  return (
    <Card className='xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full'>
      <CardBody className='py-5'>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <Community />
            <div className='flex flex-col'>
              <span className='text-white'>Formulario 501</span>
              <span className='text-white text-xs'> - / - / - -:-</span>
            </div>
          </div>
          <Tooltip showArrow content='Micro resumen de este formulario'>
            <div className='flex items-center justify-center rounded-full bg-gray-300 w-5 h-5'>
              <h2 className='text-gray-600'>&#8520;</h2>
            </div>
          </Tooltip>
        </div>
        <div className='flex gap-2.5 py-2 items-center'>
          <span className='text-white'>Status:</span>
          <span className='text-white'>Sin completar</span>
        </div>
        <div className='flex gap-2.5 py-2 items-center justify-end'>
          <Link href='/captainForms/form501'>
            <Button color='warning'>Completar formulario 501</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
