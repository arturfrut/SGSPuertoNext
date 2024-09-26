'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import {
  cardinalDirections,
  seaCurrentPower,
  seaPower,
  windPower
} from '@/constants/strings'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  DatePicker,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'
import Modalfr83 from './modalFR802'

export const FormFr83 = () => {
  const { onOpen } = useDisclosure()
  const { tripulation, selectedShip } = useGlobalStore()
  const weatherStepsArray = [
    {
      action: 'Control totalidad cierres estacos',
      checked: false
    },
    {
      action: 'Tincar objetos sueltos en cubierta',
      checked: false
    },
    {
      action: 'Suspender actividad de pesca',
      checked: false
    },
    {
      action: 'Informar persona designada y/o relevo',
      checked: false,
      modalTitle: 'Ingrese nombre de persona designada',
      inputPlaceHolder: 'Ingrese medio utilizado',
      tableDescription: `Persona designada:`
    },
    {
      action: 'Informar persona designada y/o relevo',
      checked: false,
      modalTitle: 'Nº de servicio informando a la Autoridad marítima',
      inputPlaceHolder: 'Ingrese nro utilizado',
      tableDescription: `Nº:`
    },
    {
      action:
        'Ha sufrido accidentes o cuasi accidentes durante período de alerta meteorológico?',
      checked: false,
      modalTitle: 'Escriba SI o NO en mayúsculas',
      inputPlaceHolder: 'SI/NO',
      tableDescription: `Respuesta: `
    },
    {
      action: 'Duración estimada del alerta',
      checked: false,
      modalTitle: 'Ingrese tiempo estimado',
      inputPlaceHolder: 'Ingrese tiempo',
      tableDescription: `Tiempo estimado: `
    },
    {
      action: 'Finalizado alerta informas a persona designada',
      checked: false
    }
  ]
  const [weatherSteps, setWeatherSteps] = useState(weatherStepsArray)
  const { signatures, handleSaveSignature } = useSignModal()
  const crewList = tripulation

  const handleRowClick = (index: number) => {
    const step = weatherSteps[index]
    if (step.modalTitle) {
      onOpen()
    } else {
      const updatedWeatherSteps = [...weatherSteps]
      updatedWeatherSteps[index].checked = !updatedWeatherSteps[index].checked
      setWeatherSteps(updatedWeatherSteps)
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
          <p className='text-xl'>FR - 83 REPORTE ALERTA METEOROLÓGICA</p>
        </div>
      </CardHeader>
      <form>
        <Divider className='mb-4' />
        <p className='text-xl '>Información general</p>
        <p className='mt-4'> Buque: {selectedShip?.name}</p>

        <DatePicker granularity='day' className='w-1/2 mt-4' />
        <Divider className='my-4' />
        <p className='my-4'> Posición:</p>
        <div className='flex gap-4 '>
          <Input placeholder='ingrese latitud' />
          <Input placeholder='ingrese longitud' />
        </div>
        <p className='my-4'> Nro de servicio de alerta de P.N.A:</p>
        <Input placeholder='ingrese número' />
        <Divider className=' my-4' />
        <CardBody>
          <p className='text-xl mb-4'>
            Condiciones hidrometeorológicas en la zona
          </p>
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
                <SelectItem
                  key={`windDirection-${direction}`}
                  value={direction}
                >
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
                  <SelectItem
                    key={`seaDirection-${direction}`}
                    value={direction}
                  >
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
          <Divider className='my-4' />
          <p className='text-xl mb-4'>Siga las siguientes acciones:</p>
          <Table aria-label='Example static collection table' isStriped>
            <TableHeader>
              <TableColumn className='w-6'>{'    '}</TableColumn>
              <TableColumn className='w-2'>Hecho</TableColumn>
              <TableColumn>Acción</TableColumn>
              <TableColumn>Detalle</TableColumn>
            </TableHeader>
            <TableBody>
              {weatherSteps.map((step, index) => (
                <TableRow
                  key={index}
                  className='cursor-pointer'
                  onClick={() => handleRowClick(index)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Checkbox
                      isSelected={step.checked}
                      onValueChange={() => handleRowClick(index)}
                    />
                  </TableCell>
                  <TableCell>{step.action}</TableCell>
                  <TableCell>
                    {step.modalTitle ? (
                      <Modalfr83
                        modalTitle={step.modalTitle}
                        inputPlaceHolder={step.inputPlaceHolder}
                        tableDescription={step.tableDescription}
                        setWeatherSteps={setWeatherSteps}
                        index={index}
                        weatherSteps={weatherSteps}
                      />
                    ) : (
                      ''
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider className='my-4' />
          <p className='mb-4'> Novedades / Información adicional</p>
          <Textarea
            labelPlacement='outside'
            placeholder='Escriba aqui su reseña'
          />
          <Divider className=' my-4' />
          <p className='mb-4'>Encargado de dar la capacitación:</p>
          <Select label='Seleccione Tripulante' className='w-full my-4'>
            {/* {crewList.map(
              (
                member: { id: number; name: string; lastName: string },
                index: number
              ) => (
                <SelectItem key={member.id} value={index}>
                  {`${member.name} ${member.lastName}`}
                </SelectItem>
              )
            )} */}
            <SelectItem key={1} value={1}>
              Corregir en desarrollo
            </SelectItem>
          </Select>
          <div className='w-full my-4 md:w-1/2 flex items-center justify-center gap-5'>
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, 'personInChargeSignature')
              }
              title='FIRMA DE PERSONA ENCARGADA'
            />
            <SignatureChecker status={signatures?.personInChargeSignature} />{' '}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
          <Button>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
