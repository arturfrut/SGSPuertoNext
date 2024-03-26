import { Button, Card, CardBody, Tooltip } from '@nextui-org/react'
import { Community } from '../icons/community'

export const NewCrewMemberCard = () => {
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
          <Button>Agregar</Button>
          {/* TODO: Hacer que me lleve a la pantalla de cerrar comando */}
        </div>
      </CardBody>
    </Card>
  )
}
