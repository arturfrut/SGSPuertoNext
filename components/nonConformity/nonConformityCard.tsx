import { Community } from '@/components/icons/community'
import useGlobalStore from '@/stores/useGlobalStore'
import { Button, Card, CardBody } from '@nextui-org/react'

export const NonConformityCard = () => {
  const { setNcnActive } = useGlobalStore()

  const redirecToNote = () => {
    setNcnActive(null)
    window.location.href = '/non-conformity/new-note'
  }
  return (
    <Card className='bg-danger rounded-xl shadow-md px-3 w-full'>
      <CardBody className='py-5'>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <Community />
            <div className='flex flex-col'>
              <span className='text-white'>
                Crear nueva nota de no conformidad
              </span>
            </div>
          </div>
        </div>

        <div className='flex gap-2.5 py-2 items-center justify-end'>
          {/* <Button color='warning'>Cerrar comando</Button> */}
          <Button onClick={redirecToNote}>Crear</Button>
          {/* TODO: Hacer que me lleve a la pantalla de cerrar comando */}
        </div>
      </CardBody>
    </Card>
  )
}
