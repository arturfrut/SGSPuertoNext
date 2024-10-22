import {
  CheckboxGroup,
  Checkbox,
  Select,
  SelectItem,
  Input
} from '@nextui-org/react'
import { Fragment } from 'react'
import { RolInterface } from '.'
import { EyeFilledIcon } from '../icons/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon'
import useCreateUser from '@/app/hooks/components/useCreateUser'

export const RenderFormField = (
  name: string,
  placeholder?: string,
  type: string = 'text',
  values?: RolInterface[],
  stateData?: {
    user: any
    handleCheckboxChange: any
    loadingCompany: any
    loadingShip: any
    renderShips: any
    companyOptions: any
    shipOptions: any
    handleInputChange: any
    toggleVisibility: any
    handleCheckboxChangeShip: any
    handleCompany: any
    isVisible: any
    name?: any
  }
) => {


  switch (name) {
    case 'role_id':
      return (
        <Fragment key={name}>
          <p className='mb-4'>Seleccione sus roles:</p>
          <CheckboxGroup
            className='mb-4'
            value={stateData.user.roles} // Manejado dentro de user
            onChange={stateData.handleCheckboxChange}
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
      return (
        <Fragment key={name}>
          <p className='mb-4'>Seleccione compañía:</p>
          <Select
            name='company'
            placeholder='Selecciona empresa'
            onChange={stateData.handleCompany}
            className='mb-4'
            isDisabled={stateData.loadingCompany}
            aria-label='Empresa'
          >
            {stateData.companyOptions.map(company => (
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
    case 'ships':
      if (stateData.renderShips) {
        return (
          <Fragment key={name}>
            <p className='mb-4'>Seleccione de qué barco se encargará:</p>
            {!stateData.user.company && (
              <p className='text-red-600 '>Sin empresa seleccionada</p>
            )}
            <CheckboxGroup
              className='mb-4'
              value={stateData.user.ships_in_charge} // Manejado dentro de user
              onChange={stateData.handleCheckboxChangeShip}
              aria-label={stateData.name}
              isDisabled={stateData.loadingShip}
            >
              {stateData.shipOptions ? (
                stateData.shipOptions?.map(ship => (
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
    case 'password':
      return (
        <Fragment key={name}>
          <p className='mb-4'>{`Ingrese password`}</p>
          <Input
            key={name}
            name={name}
            placeholder='password tiene que tener por lo menos 6 caracteres'
            type={stateData.isVisible ? 'text' : 'password'}
            value={(stateData.user as any)[name]}
            onChange={stateData.handleInputChange}
            className='mb-4'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={stateData.toggleVisibility}
                aria-label='toggle password visibility'
              >
                {stateData.isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
          />
        </Fragment>
      )
    default:
      return (
        <Fragment key={name}>
          <p className='mb-4'>{`Ingrese ${placeholder}`}</p>
          <Input
            key={name}
            name={name}
            placeholder={placeholder}
            type={type}
            value={(stateData.user as any)[name]}
            onChange={stateData.handleInputChange}
            className='mb-4'
          />
        </Fragment>
      )
  }
}
