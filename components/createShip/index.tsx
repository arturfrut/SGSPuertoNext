'use client'

import useAllCompanies from '@/app/hooks/useAllCompanies'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'

export interface ShipInterface {
  ship_name: string
  omi: string
  matricula: string
  ship_type: string
  eslora: string
  manga: string
  puntal: string
  TAT: string
  potencia: string
  company: string
  company_omi?: number | null
  charged_by?: number
}

export interface CompanyOptionsInterface {
  company_omi: number
  company_name: string
}

export const CreateShip = () => {
  const createShipInitialValue: ShipInterface = {
    ship_name: '',
    omi: '',
    matricula: '',
    ship_type: '',
    eslora: '',
    manga: '',
    puntal: '',
    TAT: '',
    potencia: '',
    company: '',
    company_omi: null
  }

  const validateShipData = (data: ShipInterface) => {
    for (const key in data) {
      if (
        data[key as keyof ShipInterface] === '' ||
        data[key as keyof ShipInterface] === null
      ) {
        alert(`Falta ${key}`)
        return false
      }
    }
    return true
  }

  const formFields = [
    { name: 'ship_name', placeholder: 'nombre del barco' },
    { name: 'omi', placeholder: 'OMI' }, //sirve de Id
    { name: 'matricula', placeholder: 'matricula' },
    {
      name: 'ship_type',
      placeholder: 'Tipo de barco',
      defaultValue: '',
      values: [
        'Buque de pasaje',
        'Nave de pasaje de gran velocidad',
        'Nave de carga de gran velocidad',
        'Granelero',
        'Petrolero',
        'Quimiquero',
        'Gasero',
        'Pesquero',
        'Unidad móvil de perforación mar adentro',
        'Buque de carga distinto a los anteriores' // Remolcador
      ]
    }, // es shipTypes
    { name: 'eslora', placeholder: 'eslora' },
    { name: 'manga', placeholder: 'manga' },
    { name: 'puntal', placeholder: 'puntal' },
    { name: 'TAT', placeholder: 'TAT' }, //tonelaje de arqueo total
    { name: 'potencia', placeholder: 'potency' },
    { name: 'company', placeholder: 'empresa', defaultValue: '', values: [] },
    { name: 'company_omi' }
  ]

  const { companies, userData } = useGlobalStore()
  const [ship, setShip] = useState<ShipInterface>(createShipInitialValue)
  const [awaitResponse, setAwaitResponse] = useState(false)

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShip(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const selectedCompany = companies.find(
      company => company.company_omi === parseInt(value)
    )

    if (selectedCompany) {
      setShip(prevState => ({
        ...prevState,
        company: selectedCompany.company_name, // actualizar company
        company_omi: selectedCompany.company_omi // actualizar company_omi
      }))
    }
  }
  const handleShipType =(e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setShip(prevState => ({
      ...prevState,
      ship_type: value // actualizar company
    })
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(ship)
    if (validateShipData(ship)) {
      setAwaitResponse(true)
      const apiData = { ...ship, charged_by: userData.id }
      try {
        await axios.post('/api/register_ship', apiData)
        alert('Barco registrado')
      } catch (error) {
        alert('Error al registrar barco')
      }
      setAwaitResponse(false)
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
          <p className='text-xl'>REGISTRAR NUEVO BARCO</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className='mb-4' />

        <CardBody>
          {formFields.map(
            ({ name, placeholder, values }) =>
              name !== 'company' &&
              name !== 'company_omi' &&
              (values ? (
                <Fragment key={name}>
                  <p className='mb-4'>Seleccione tipo de barco:</p>
                  <Select
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    value={name}
                    onChange={handleShipType}
                    className='mb-4'
                    aria-label={name}
                  >
                    {values.map(value => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </Select>
                </Fragment>
              ) : (
                <Fragment key={name}>
                  <p className='mb-4'>{`ingrese ${placeholder}`}</p>
                  <Input
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    value={(ship as any)[name]}
                    onChange={handleInputChange}
                    className='mb-4'
                  />
                </Fragment>
              ))
          )}
          <p className='mb-4'>Seleccione empresa:</p>
          <Select
            name='company'
            placeholder='Selecciona empresa'
            value={ship.company}
            onChange={handleSelectChange}
            className='mb-4'
            aria-label='Empresa'
          >
            {companies.map(company => (
              <SelectItem
                key={company.company_omi}
                value={company.company_name}
              >
                {company?.company_name}
              </SelectItem>
            ))}
          </Select>
        </CardBody>

        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button type='submit' isLoading={awaitResponse}>
            Enviar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
