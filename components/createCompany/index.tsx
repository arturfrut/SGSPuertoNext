'use client'

import { useState } from 'react'
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

interface CompanyInterface {
  company: string
  CUIL: string,
  company_representant: string,
  contact_number: string
  company_email: string
}

export const CreateCompany = () => {
  const createCompanyInitialValue = {
    company: '',
    CUIL: '',
    company_representant: '',
    contact_number: '',
    company_email: '',
  }

  const formFields = [
    { name: 'company', placeholder: 'company' },
    { name: 'CUIL', placeholder: 'CUIL' },
    { name: 'company_representant', placeholder: 'Representante legal' },
    { name: 'contact_number', placeholder: 'Número de contacto' },
    { name: 'company_email', placeholder: 'Email', type: 'email' }
  ]

  const [user, setUser] = useState<CompanyInterface>(createCompanyInitialValue)

  const [password, setPassword] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log()
    // try {
    //   await registerUser(user.email, password, user);
    //   alert('User registered successfully');
    // } catch (error) {
    //   console.error('Error registering user:', error);
    //   alert('Error registering user');
    // }
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
          <p className='text-xl'>REGISTRAR EMPRESA</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className='mb-4' />

        <CardBody>
          {formFields.map(({ name, placeholder, type = 'text' }) => (
            <Input
              key={name}
              name={name}
              placeholder={placeholder}
              type={type}
              value={(user as any)[name]}
              onChange={handleInputChange}
              className='mb-4'
            />
          ))}
          <Input
            name='password'
            placeholder='Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='mb-4'
          />
        </CardBody>

        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button type='submit'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
