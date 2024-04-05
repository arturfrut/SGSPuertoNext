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
import { getCurrentDateTime } from '@/utils/dateSelector'
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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
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

  const [selectedMemberIndex, setSelectedMemberIndex] = useState(-1) // Estado para almacenar el índice del tripulante seleccionado

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
      accidentTime: getCurrentDateTime(),
      place: null,
      LECrew: null
    },
    witness: [],
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

  const handleSelectChange = e => {
    setSelectedMemberIndex(parseInt(e.target.value, 10)) // Almacena el índice del tripulante seleccionado al cambiar la selección
  }

  const addWitness = () => {
    if (selectedMemberIndex !== -1) {
      const selectedMember =
        accidentReportData.crewList[selectedMemberIndex - 1]

      // Verifica si el testigo ya está presente en el estado
      const isWitnessAlreadyAdded = formData.witness.some(
        witness => witness.id === selectedMember.id
      )

      if (!isWitnessAlreadyAdded) {
        const newWitness = {
          id: selectedMember.id,
          name: selectedMember.name,
          lastName: selectedMember.lastName
        }
        setFormData(prevState => ({
          ...prevState,
          witness: [...prevState.witness, newWitness]
        }))
      } else {
        // TODO: hacer que aparezca modal que diga q no se puede agregar dos veces al mismo
        console.log('Este testigo ya ha sido añadido.')
      }
    }
  }

  const removeWitness = indexToRemove => {
    setFormData(prevState => ({
      ...prevState,
      witness: prevState.witness.filter((_, index) => index !== indexToRemove)
    }))
  }

  const handleAccidentTypes = (event: {
    target: { name: string; checked: boolean }
  }) => {
    const { name, checked } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      accidentType: {
        ...prevFormData.accidentType,
        [name]: checked
      }
    }))
  }

  const handleAccidentTimeYear = (event: {
    target: { name: any; value: any }
  }) => {
    const { name, value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      accidentDescription: {
        ...prevFormData.accidentDescription,
        accidentTime: {
          ...prevFormData.accidentDescription.accidentTime,
          [name]: value
        }
      }
    }))
  }

  const handleAccidentDay = (event: { target: { name: any; value: any } }) => {
    const { value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      accidentDescription: {
        ...prevFormData.accidentDescription,
        accidentTime: {
          ...prevFormData.accidentDescription.accidentTime,
          day: value
        }
      }
    }))
  }

  const handeAccidentHour = (event: {
    target: { name: string; value: any }
  }) => {
    const { value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      accidentDescription: {
        ...prevFormData.accidentDescription,
        accidentTime: {
          ...prevFormData.accidentDescription.accidentTime,
          hour: value
        }
      }
    }))
  }

  const handeAccidentMinute = (event: {
    target: { name: string; value: any }
  }) => {
    const { value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      accidentDescription: {
        ...prevFormData.accidentDescription,
        accidentTime: {
          ...prevFormData.accidentDescription.accidentTime,
          minute: value
        }
      }
    }))
  }
  const handeAccidentPlace = (event: {
    target: { name: string; value: any }
  }) => {
    const { value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      accidentDescription: {
        ...prevFormData.accidentDescription,
        place: value
      }
    }))
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
          <p className='text-xl'>
            FR-802 RREPORTE DE ACCIDENTE y CUASIACCIDENTE
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex flex-col md:flex-row md:justify-between md:w-2/4 '>
          <p className='text-xl'>Buque: {formData.ship.shipName} </p>
          <p className='text-xl'>Nro: {formData.ship.shipNumber} </p>
        </div>
      </CardBody>
      <Divider />
      <CardBody>
        <p className='text-xl pb-4'>Tipo de Accidente</p>
        <CheckboxGroup className='pb-4'>
          {accidentTypes.map(value => (
            <Checkbox
              key={`accidentTypeId-${value}`}
              name={value}
              value={value}
              checked={formData.accidentType[value]}
              // TODO: FALTA TIPADO de formData
              onChange={handleAccidentTypes}
            >
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
                max={getCurrentDateTime().year + 2}
                label='Año'
                onChange={handleAccidentTimeYear}
                defaultValue={formData.accidentDescription.accidentTime.year}
              />
              {/* 
              ------------------------------------------------------------
              ------------------------------------------------------------
              ------------------------------------------------------------
              ------------------------------------------------------------
              ------------------------------------------------------------
              ------------------------------------------------------------
              ------------------------------------------------------------
              TODO: USAR MES CON STATE */}
              <Select label='Mes'>
                {monthsSelect.map(month => (
                  <SelectItem key={`monthsSelectId-${month}`} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
              {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
              <Input
                type='number'
                max={31}
                label='Día'
                value={formData.accidentDescription.accidentTime.day}
                onChange={handleAccidentDay}
              />
            </div>
          </div>
          <div className='md:w-1/2'>
            <div>
              <p className='w-1/2 my-2'>Hora</p>
              <div className='flex w-full  flex-nowrap gap-4'>
                <Input
                  type='number'
                  max={24}
                  label='Hora'
                  value={formData.accidentDescription.accidentTime.hour}
                  onChange={handeAccidentHour}
                />
                <Input
                  type='number'
                  max={60}
                  label='Minutos'
                  value={formData.accidentDescription.accidentTime.minute}
                  onChange={handeAccidentMinute}
                />
              </div>
            </div>
          </div>
        </div>
        <p className='my-2'>Lugar:</p>
        <Input
          className='w-full'
          type='string'
          label='Indique lugar'
          value={formData.accidentDescription.place ?? ''}
          onChange={handeAccidentPlace}
        />
        {/* TODO: MANEJAR TRIPULANTE DE FORMA SIMILARA COMO SE MANEJA MES 
        ---------------------------------------------------------------------
         --------------------------------------------------------------------
        ---------------------------------------------------------------------
        ---------------------------------------------------------------------
        ---------------------------------------------------------------------
        
        */}
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
          <Select
            label='Seleccione Tripulante'
            className='w-full my-4'
            onChange={handleSelectChange}
          >
            {accidentReportData.crewList.map(
              (
                member: { id: number; name: string; lastName: string },
                index: number
              ) => (
                <SelectItem key={member.id} value={index}>
                  {`${member.name} ${member.lastName}`}
                </SelectItem>
              )
            )}
          </Select>
          <Button onClick={addWitness} size='lg'>
            Agregar
          </Button>
        </div>
        <Table aria-label='Example static collection table' isStriped>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn className='flex justify-end items-center px-8'>
              Eliminar
            </TableColumn>
          </TableHeader>
          <TableBody>
            {formData.witness.length > 0 ? (
              formData.witness.map((witness, index) => (
                <TableRow
                  key={index}
                  className='cursor-pointer'
                  onClick={() => removeWitness(index)}
                >
                  <TableCell>{witness?.name}</TableCell>
                  <TableCell className='flex justify-end px-10'>
                    <CrossIcon />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No hay testigos</TableCell>
                <TableCell>
                  <p></p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
