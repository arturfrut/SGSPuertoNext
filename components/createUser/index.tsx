'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image
} from '@nextui-org/react'
import useCreateUser from '@/app/hooks/components/useCreateUser'
import { RenderFormField } from './renderFormField'

export interface RolInterface {
  rolId: number
  rolName: string
}

export interface ShipOptionInterface {
  omi: number
  ship_name: string
}

export const CreateUser = () => {
  const {
    formFields,
    handleSubmit,
    waitingResponse,
    user,
    handleCheckboxChange,
    loadingCompany,
    loadingShip,
    renderShips,
    companyOptions,
    shipOptions,
    handleInputChange,
    toggleVisibility,
    handleCheckboxChangeShip,
    handleCompany,
    isVisible
  } = useCreateUser()

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
          <p className='text-xl'>CREAR USUARIO</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className='mb-4' />
        <CardBody>
          {formFields.map(({ name, placeholder, type, values }) =>
            RenderFormField(name, placeholder, type, values, {
              user,
              handleCheckboxChange,
              loadingCompany,
              loadingShip,
              renderShips,
              companyOptions,
              shipOptions,
              handleInputChange,
              toggleVisibility,
              handleCheckboxChangeShip,
              handleCompany,
              isVisible
            })
          )}
        </CardBody>
        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button type='submit' isLoading={waitingResponse}>
            Enviar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
