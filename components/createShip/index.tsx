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
}

export interface CompanyOptionsInterface {
  company_omi: 1234
  company_name: 'prueba compañia'
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

  const formFields = [
    { name: 'ship_name', placeholder: 'nombre del barco' },
    { name: 'omi', placeholder: 'OMI' }, //sirve de Id
    { name: 'matricula', placeholder: 'matricula' },
    {
      name: 'ship_type',
      placeholder: 'ship_type',
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

  const [ship, setShip] = useState<ShipInterface>(createShipInitialValue)
  const [loadingCompany, setLoadingCompany] = useState<boolean>(true)
  const [companyOptions, setCompanyOptions] = useState<
    CompanyOptionsInterface[]
  >([])
  
  async function fetchData() {
    try {
      const res = await axios.get(`/api/get_companies`)
      const data = await res.data
      setCompanyOptions(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoadingCompany(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShip(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const selectedCompany = companyOptions.find(
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/register_ship', ship)
      alert('Barco registrado')
    } catch (error) {
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
                    value={(ship as any)[name]}
                    onChange={handleSelectChange}
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
            isDisabled={loadingCompany}
            aria-label='Empresa'
          >
            {companyOptions.map(company => (
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
          <Button type='submit'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
