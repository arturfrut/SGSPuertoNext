'use client'

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
import axios from 'axios'
import { useState } from 'react'

export interface CompanyInterface {
  company_name: string
  cuit: string
  direction: string
  company_omi: string
  company_representant: string
  contact_number: string
  company_email: string
}

export const CreateCompany = () => {
  const createCompanyInitialValue: CompanyInterface = {
    company_name: '',
    cuit: '',
    direction: '',
    company_omi: '',
    company_representant: '',
    contact_number: '',
    company_email: ''
  }

  const formFields = [
    { name: 'company_name', placeholder: 'Nombre de compañía' },
    { name: 'cuit', placeholder: 'CUIT sin puntos, espacios ni guiones' },
    { name: 'direction', placeholder: 'Dirección' },
    { name: 'company_omi', placeholder: 'Número de OMI de compañía' }, // sirve de id
    { name: 'company_representant', placeholder: 'Representante legal' },
    { name: 'contact_number', placeholder: 'Número de contacto' },
    { name: 'company_email', placeholder: 'Email' }
  ]

  const [company, setCompany] = useState<CompanyInterface>(createCompanyInitialValue)
  const [awaitResponse, setAwaitResponse] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompany(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAwaitResponse(true)
    try {
      const response = await axios.post('/api/register_company', company)
      console.log('Company created successfully:', response.data)
      console.log(company)
      alert('Compañía registrada')
    } catch (error) {
      console.error('Error creating company:', error)
      alert('Error al registrar compañía')
    }
    setAwaitResponse(false)
  }

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
          <p className='text-xl'>REGISTRAR COMPAÑÍA</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className='mb-4' />

        <CardBody>
          {formFields.map(({ name, placeholder }) => (
            <>
            <p className='mb-4'>{`Ingrese ${placeholder}:`}</p>
            <Input
              key={name}
              name={name}
              placeholder={placeholder}
              value={(company as any)[name]}
              onChange={handleInputChange}
              className='mb-4'
              required // Marca los campos como obligatorios
              />
              </>
          ))}
        </CardBody>

        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button type='submit' isLoading={awaitResponse}>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}