'use client'

import { useState } from 'react'
import axios from 'axios'
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

export interface ShipInterface {
  ship_name: string
  company: string
}

export const CreateShip = () => {
  const createShipInitialValue = {
    ship_name: '',
    company: ''
  }

  const formFields = [
    { name: 'ship_name', placeholder: 'nombre del barco' },
    { name: 'company', placeholder: 'empresa' }
  ]

  const [ship, setShip] = useState<ShipInterface>(createShipInitialValue)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShip(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/register_ship', ship)
      console.log('Ship created successfully:', response.data)
      alert('Barco registrado')
    } catch (error) {
      console.error('Error creating ship:', error)
      alert('Error al registrar barco')
    }
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
          <p className='text-xl'>REGISTRAR BARCO</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className='mb-4' />

        <CardBody>
          {formFields.map(({ name, placeholder }) => (
            <Input
              key={name}
              name={name}
              placeholder={placeholder}
              value={(ship as any)[name]}
              onChange={handleInputChange}
              className='mb-4'
            />
          ))}
        </CardBody>

        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button type='submit'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
