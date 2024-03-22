import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input
} from '@nextui-org/react'
import ModalFormSend from './modalFormSend'
import Link from 'next/link'

export const Formulario501 = () => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-md'>Formulario 501</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Pregunta 1</p>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input type='email' variant={'underlined'} label='Email' />
        </div>
      </CardBody>
      <Divider />
      <CardBody>
        <p>Pregunta 1</p>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input type='email' variant={'underlined'} label='Email' />
        </div>
      </CardBody>
      <Divider />
      <CardBody>
        <p>Pregunta 1</p>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input type='email' variant={'underlined'} label='Email' />
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className=' flex gap-3 justify-end'>
          <ModalFormSend />
          <Link href={'/captainForms'}>
            <Button> Cancelar</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
