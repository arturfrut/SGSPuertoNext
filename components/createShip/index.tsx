'use client'

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
import { Fragment, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useGlobalStore from '@/stores/useGlobalStore'
import { useCompaniesQuery } from '@/app/hooks/useCompaniesQuery'

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
    { name: 'omi', placeholder: 'OMI' },
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
        'Buque de carga distinto a los anteriores'
      ]
    },
    { name: 'eslora', placeholder: 'eslora' },
    { name: 'manga', placeholder: 'manga' },
    { name: 'puntal', placeholder: 'puntal' },
    { name: 'TAT', placeholder: 'TAT' },
    { name: 'potencia', placeholder: 'potency' },
    { name: 'company', placeholder: 'empresa', defaultValue: '', values: [] },
    { name: 'company_omi' }
  ]

  const { userData } = useGlobalStore()
  const [ship, setShip] = useState<ShipInterface>(createShipInitialValue)
  
  // Usar React Query para obtener las compañías
  const { data: companies = [], isLoading: isLoadingCompanies } = useCompaniesQuery()

  // Mutation para crear barco
  const createShipMutation = useMutation({
    mutationFn: (shipData: ShipInterface) => 
      axios.post('/api/register_ship', shipData),
    onSuccess: () => {
      alert('Barco registrado exitosamente')
      setShip(createShipInitialValue)
    },
    onError: (error) => {
      console.error('Error registering ship:', error)
      alert('Error al registrar barco')
    }
  })

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
        company: selectedCompany.company_name,
        company_omi: selectedCompany.company_omi
      }))
    }
  }

  const handleShipType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setShip(prevState => ({
      ...prevState,
      ship_type: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateShipData(ship)) {
      const apiData = { ...ship, charged_by: userData.id }
      createShipMutation.mutate(apiData)
    }
  }

  if (isLoadingCompanies) {
    return <div>Cargando compañías...</div>
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
                    required
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
            required
          >
            {companies.map(company => (
              <SelectItem
                key={company.company_omi}
                value={company.company_omi}
              >
                {company?.company_name}
              </SelectItem>
            ))}
          </Select>
        </CardBody>

        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button 
            type='submit' 
            isLoading={createShipMutation.isPending}
          >
            Enviar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}