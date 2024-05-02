'use client'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image
} from '@nextui-org/react'



export const Page201 = () => {


  return (
    <Card className='w-full md:w-2/3 md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>PC-201 Entrega de comando SIN TERMINAR </p>
        </div>
      </CardHeader>
      <form >
        <Divider />
        <CardBody>
Entrega y recepción de comando
        </CardBody>

        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
        </CardFooter>
      </form>
    </Card>
  )
}
