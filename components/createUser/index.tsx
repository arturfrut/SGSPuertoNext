'use client'

import { UserInterface } from '@/app/api/register_user/route'
import { have_companies, have_ships, roles } from '@/mocks/localStorageShips'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Image,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { CompanyOptionsInterface } from '../createShip'

export interface RolInterface {
  rolId: number
  rolName: string
}

export interface ShipOptionInterface {
  omi: number
  ship_name: string
}

export const CreateUser = () => {
  const [companyOptions, setCompanyOptions] = useState<
    CompanyOptionsInterface[]
  >([])
  const [shipOptions, setShipOptions] = useState<ShipOptionInterface[]>([])
  const [loadingCompany, setLoadingCompany] = useState(true)
  const [loadingShip, setLoadingShip] = useState(true)

  const [user, setUser] = useState<UserInterface>({
    name: '',
    last_name: '',
    email: '',
    cellphone_number: '',
    document_number: '',
    document_type: '',
    age: 0,
    city: '',
    nationality: '',
    roles: [],
    comments: '',
    ships_in_charge: [], // Inicializamos como arreglo vacío
    password: '' // Inicializamos la contraseña
  })

  useEffect(() => {
    fetchShips()
    fetchCompanies()
  }, [])

  const fetchShips = async () => {
    try {
      const { data } = await axios.get(`/api/get_ships`)
      setShipOptions(data)
      console.log('ships', data)
    } catch (error) {
      console.error('Error fetching ships:', error)
    } finally {
      setLoadingShip(false)
    }
  }

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(`/api/get_companies`)
      setCompanyOptions(data)
      console.log('companies', data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoadingCompany(false)
    }
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/register_user', user)
      console.log('Company created successfully:', response.data)
      alert('Usuario registradp')
    } catch (error) {
      console.error('Error creating company:', error)
      alert('Error al registrar usuario')
    }
  }
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   try {
  //     await registerUser(user.email, user.password, user)
  //     alert('User registered successfully')
  //   } catch (error) {
  //     console.error('Error registering user:', error)
  //     alert('Error registering user')
  //   }
  // }

  const handleCheckboxChange = (newSelectedValues: string[]) => {
    setUser(prevState => ({
      ...prevState,
      roles: newSelectedValues
    }))

    console.log(user)
  }

  const handleCheckboxChangeShip = (newSelectedValues: string[]) => {
    setUser(prevState => ({
      ...prevState,
      ships_in_charge: newSelectedValues
    }))
  }

  const haveCompaniesAsString = have_companies.map(String)

  const renderCompanies = user.roles.some(role =>
    haveCompaniesAsString.includes(role)
  )

  const haveShipsAsString = have_ships.map(String)

  const renderShips = user.roles.some(role => haveShipsAsString.includes(role))

  const formFields = [
    { name: 'name', placeholder: 'Nombre' },
    { name: 'last_name', placeholder: 'Apellido' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    {
      name: 'cellphone_number',
      placeholder: 'Número de celular',
      type: 'number'
    },
    {
      name: 'document_number',
      placeholder: 'Número de documento',
      type: 'number'
    },
    { name: 'document_type', placeholder: 'Tipo de documento' },
    { name: 'age', placeholder: 'Edad', type: 'number' },
    { name: 'city', placeholder: 'Ciudad' },
    { name: 'nationality', placeholder: 'Nacionalidad' },
    {
      name: 'role_id',
      placeholder: 'roles',
      values: roles
    },
    {
      name: 'company'
    },
    { name: 'ships' },
    { name: 'comments', placeholder: 'Comentarios' },
    {
      name: 'password',
      placeholder: 'password tiene que tener por lo menos 6 caracteres',
      type: 'password'
    }
  ]

  const renderFormField = (
    name: string,
    placeholder?: string,
    type: string = 'text',
    values?: RolInterface[]
  ) => {
    switch (name) {
      case 'role_id':
        return (
          <Fragment key={name}>
            <p className='mb-4'>Seleccione sus roles:</p>
            <CheckboxGroup
              className='mb-4'
              value={user.roles} // Manejado dentro de user
              onChange={handleCheckboxChange}
              aria-label={name}
            >
              {values?.map(value => (
                <Checkbox key={value.rolId} value={String(value.rolId)}>
                  {value.rolName}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Fragment>
        )
      case 'company':
        if (renderCompanies) {
          return (
            <Fragment key={name}>
              <p className='mb-4'>Seleccione compañía:</p>
              <Select
                name='company'
                placeholder='Selecciona empresa'
                onChange={handleInputChange}
                className='mb-4'
                isDisabled={loadingCompany}
                aria-label='Empresa'
              >
                {companyOptions.map(company => (
                  <SelectItem
                    key={company.company_omi}
                    value={company.company_name}
                  >
                    {company.company_name}
                  </SelectItem>
                ))}
              </Select>
            </Fragment>
          )
        }
        break
      case 'ships':
        if (renderShips) {
          return (
            <Fragment key={name}>
              <p className='mb-4'>Seleccione de qué barco se encargará:</p>
              <CheckboxGroup
                className='mb-4'
                value={user.ships_in_charge} // Manejado dentro de user
                onChange={handleCheckboxChangeShip}
                aria-label={name}
              >
                {shipOptions ? (
                  shipOptions?.map(ship => (
                    <Checkbox key={ship.omi} value={String(ship.omi)}>
                      {ship.ship_name}
                    </Checkbox>
                  ))
                ) : (
                  <p>Cargando barcos</p>
                )}
              </CheckboxGroup>
            </Fragment>
          )
        }
        break
      default:
        return (
          <Fragment key={name}>
            <p className='mb-4'>{`Ingrese ${placeholder}`}</p>
            <Input
              key={name}
              name={name}
              placeholder={placeholder}
              type={type}
              value={(user as any)[name]}
              onChange={handleInputChange}
              className='mb-4'
            />
          </Fragment>
        )
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
          <p className='text-xl'>CREAR USUARIO</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Divider className='mb-4' />
        <CardBody>
          {formFields.map(({ name, placeholder, type, values }) =>
            renderFormField(name, placeholder, type, values)
          )}
        </CardBody>
        <Divider />
        <CardFooter className='flex gap-3 justify-end'>
          <Button type='submit'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
