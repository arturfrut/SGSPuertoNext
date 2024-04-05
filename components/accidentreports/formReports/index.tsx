'use client'
import ModalFormSend from '@/components/captainForms/form501/modalFormSend'
import { CheckIcon } from '@/components/icons/checkIcon'
import { CrossIcon } from '@/components/icons/crossIcon'
import {
  accidentTypes,
  cardinalDirections,
  hydrocarbonsTypes,
  monthsSelect,
  seaCurrentPower,
  seaPower,
  shipCondition,
  shipStatus,
  windPower,
  yesNoSelect
} from '@/constants/strings'
import { crewListMock } from '@/mocks/crewListMock'
import { shipMock } from '@/mocks/shipMock'
import { getYear } from '@/utils/dateSelector'
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
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import { useState } from 'react'

export const FormReports = (accidentReportData: {
  ship: any
  crewList: any
}) => {
  accidentReportData = {
    ship: shipMock,
    crewList: crewListMock
  }
  const [formData, setFormData] = useState({
    ship: {
      shipName: accidentReportData.ship.shipName ?? 'Cargando Barco',
      shipNumber: accidentReportData.ship.shipNumber ?? 'Cargando Nro Barco'
    },
    formName: 'FR-802',
    crewList: accidentReportData.ship ?? ['Cargando Tripulación'],
    accidentType: {
      'Daños al buque': false,
      'Daños a terceros': false,
      'Daños al medio ambiente': false,
      'Hecho potencialmente peligroso': false,
      'Accidente personal grave/leve': false
    },
    accidentDescription: {
      accidentTime: {
        year: getYear(),
        month: 'Marzo',
        day: '21',
        hour: '13',
        minutes: '20'
      },
      place: null,
      LECrew: null
    },
    witness: [{}],
    shipStatus: {
      shipStatus: null,
      'Calado popa': false,
      'Calado proa': false,
      Fondeado: false
    },
    weatherStatus: {
      windStatus: {
        windPower: null,
        windDirection: null
      },
      seaStatus: {
        seaPower: null,
        seaDirection: null
      },
      seaCurrent: {
        seaCurrentPower: null,
        seaCurrentDirection: null
      },
      tideHeight: null
    },
    hydrocarbonsAccident: {
      isHCAccident: true,
      ltsAmmount: null,
      hydrocarbonsTypes: null,
      actionsDescription: null
    },
    verifications: null,
    opinions: null,
    signs: {
      captain: true,
      SGSAdmin: false,
      crewMember: false
    }
  })

  const addWitness = () => console.log('testigo agregado')
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
          <p className='text-xl'>
            FR-802 RREPORTE DE ACCIDENTE y CUASIACCIDENTE
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex flex-col md:flex-row md:justify-between md:w-2/4 '>
          <p className='text-xl'>Buque: {accidentReportData.ship.shipName} </p>
          <p className='text-xl'>Nro: {accidentReportData.ship.shipNumber} </p>
        </div>
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl pb-4'>Tipo de Accidente</p>
        <CheckboxGroup className='pb-4'>
          {accidentTypes.map(value => (
            <Checkbox key={`accidentTypeId-${value}`} value={value}>
              {value}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl pb-4'>Descripción del acontecimiento</p>
        <div className='w-full md:flex md:gap-4'>
          <div className='md:w-1/2'>
            <p className='my-2'>Fecha</p>
            <div className='flex w-full  flex-nowrap  gap-4'>
              <Input
                type='number'
                max={getYear() + 2}
                label='Año'
                defaultValue={getYear().toString()}
              />
              <Select label='Mes'>
                {monthsSelect.map(month => (
                  <SelectItem key={`monthsSelectId-${month}`} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
              <Input type='number' max={31} label='Día necesita función' />
            </div>
          </div>
          <div className='md:w-1/2'>
            <div>
              <p className='w-1/2 my-2'>Hora</p>
              <div className='flex w-full  flex-nowrap gap-4'>
                <Input type='number' max={24} label='Hora' />
                <Input type='number' max={60} label='Minutos' />
              </div>
            </div>
          </div>
        </div>
        <p className='my-2'>Lugar:</p>
        <Input className='w-full' type='email' label='Indique lugar' />
        <p className='my-2'>Tripulante L.E</p>
        <Select label='Seleccione un tripulante de la lista' className='w-full'>
          {accidentReportData.crewList.map(
            (member: { id: number; name: string; lastName: string }) => (
              <SelectItem key={member.id} value={member.id}>
                {`${member.name} ${member.lastName}`}
              </SelectItem>
            )
          )}
        </Select>
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl pb-4'>Testigos:</p>
        <div className='flex w-full items-center gap-4'>
          <Select label='Seleccione Tripulante' className='w-full'>
            {accidentReportData.crewList.map(
              (member: { id: number; name: string; lastName: string }) => (
                <SelectItem key={member.id} value={member.id}>
                  {`${member.name} ${member.lastName}`}
                </SelectItem>
              )
            )}
          </Select>
          <Button onClick={addWitness} size='lg'>
            Agregar/Quitar testigo
          </Button>
        </div>
        <p>Lista de testigos agregados:</p>
        <p>No hubieron testigos -render condicional -</p>
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl mb-4'>Condición del buque</p>
        <RadioGroup
        // onValueChange={setSelected}
        >
          {shipStatus.map(option => (
            <Radio key={`shipStatusId-${option}`} value={option}>
              {option}
            </Radio>
          ))}
        </RadioGroup>
        <Input
          className='my-4'
          type='text'
          label='Describa la circunstancia // renderizado condicional'
        />
        <CheckboxGroup
        // onValueChange={setSelected}
        >
          {shipCondition.map(option => (
            <Checkbox key={`shipConditionId-${option}`} value={option}>
              {option}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl my-4'>Condiciones hidrometeorológicas</p>
        <p className='my-2'>Viento</p>
        <div className='flex gap-4 '>
          <Select label='Fuerza'>
            {windPower.map(power => (
              <SelectItem key={`windPower-${power}`} value={power}>
                {power}
              </SelectItem>
            ))}
          </Select>
          <Select label='Dirección'>
            {cardinalDirections.map(direction => (
              <SelectItem key={`windDirection-${direction}`} value={direction}>
                {direction}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <p className='my-2'>Mar</p>
          <div className='flex gap-4'>
            <Select label='Fuerza'>
              {seaPower.map(power => (
                <SelectItem key={`seaPower-${power}`} value={power}>
                  {power}
                </SelectItem>
              ))}
            </Select>
            <Select label='Dirección'>
              {cardinalDirections.map(direction => (
                <SelectItem key={`seaDirection-${direction}`} value={direction}>
                  {direction}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <p className='my-2'>Corriente </p>
        <div className='flex gap-4'>
          <Select label='Fuerza'>
            {seaCurrentPower.map(power => (
              <SelectItem key={`seaCurrentPower-${power}`} value={power}>
                {power}
              </SelectItem>
            ))}
          </Select>
          <Select label='Dirección'>
            {cardinalDirections.map(direction => (
              <SelectItem
                key={`seaCurrentDirection-${direction}`}
                value={direction}
              >
                {direction}
              </SelectItem>
            ))}
          </Select>
        </div>
        <p className='my-4'>Altura de la marea</p>
        <Input
          endContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-default-400 text-small'>Mts</span>
            </div>
          }
          className='w-1/2'
          type='number'
          label='Ingrese altura'
        />
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl my-4'>
          Derrame de hidrocarburos Radiobutton condicional
        </p>
        <Select label='Seleccione una opción' className='w-full'>
          {yesNoSelect.map(selection => (
            <SelectItem
              key={`hydrocarbonsSelect-${selection}`}
              value={selection}
            >
              {selection}
            </SelectItem>
          ))}
        </Select>

        <div className='flex gap-4 my-4'>
          <Select label='Tipo de derrame'>
            {hydrocarbonsTypes.map(selection => (
              <SelectItem
                key={`hydrocarbonsTypesSelect-${selection}`}
                value={selection}
              >
                {selection}
              </SelectItem>
            ))}
          </Select>
          <Input
            endContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-400 text-small'>Lts</span>
              </div>
            }
            type='number'
            label='Cantidad de litros'
          />
        </div>
        <p className='mb-4'>Medidas adoptadas</p>
        <Input type='email' label='Describa las medidas que adopto' />
      </CardBody>
      <Divider />
      <Divider />
      <CardBody>
        <p className='text-xl my-4'>
          Verificaciones realizadas en el acontecimiento
        </p>
        <Textarea
          labelPlacement='outside'
          placeholder='Recuerde detallar el antes durante y después'
        />
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl my-4'>
          Opinión del capitán/compañía sobre las medidas correctivas a aplicar
        </p>
        <Textarea
          labelPlacement='outside'
          placeholder='Describa su opinión aquí'
        />
      </CardBody>
      <Divider />
      <CardBody className='flex gap-4'>
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <Button className='w-full'> Firma Capitan </Button>
          <CheckIcon />
        </div>
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <Button className='w-full'> Firma Responsable SGS </Button>
          <CrossIcon />
        </div>
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <Button className='w-full'> Firma Tripulante </Button>
          <CrossIcon />
        </div>
      </CardBody>
      <Divider />
      <CardFooter className=' flex gap-3 justify-end'>
        <ModalFormSend />
        <Button> Reset</Button>
      </CardFooter>
    </Card>
  )
}
