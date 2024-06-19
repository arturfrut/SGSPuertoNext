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
import { useState } from 'react'
import { EyeFilledIcon } from '../icons/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon'

interface LoginFormProps {
  setIsLogged: (value: boolean) => void
}

const LoginForm = ({ setIsLogged }: LoginFormProps) => { 
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const handleButon = () => {
    sessionStorage.setItem('isLogged', JSON.stringify(true))
    setIsLogged(true)
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='max-w-[600px] w-full'>
        <CardHeader className='flex gap-3'>
          <Image
            alt='nextui logo'
            height={40}
            radius='sm'
            src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
            width={40}
          />
          <div className='flex flex-col'>
            <p className='text-md'>
              Sistema de Gestión de Seguridad Puerto de MdP
            </p>
            <p className='text-small text-default-500'>Inicio de sesión</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            isClearable
            label='Usuario'
            variant='bordered'
            placeholder='Ingresa tu nombre de usuario'
            className='w-full'
          />
          <Input
            label='Password'
            variant='bordered'
            placeholder='Ingresa tu clave'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className='my-4 w-full'
          />
        </CardBody>
        <Divider />
        <CardFooter className='flex justify-end'>
          <Button onClick={handleButon}>Entrar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginForm