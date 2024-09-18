'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import { parseAbsoluteToLocal } from '@internationalized/date'
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
import axios from 'axios'

import { useEffect, useState } from 'react'

export const NewControl = () => {
  const today = parseAbsoluteToLocal(new Date().toISOString())
  const [loadingCompany, setLoadingCompany] = useState(true)
  const [shipOptions, setShipOptions] = useState([])
  const { signatures, handleSaveSignature } = useSignModal()
  const [controlData, setControlData] = useState({
    date: today,
    observation: '',
    isAllChecked: false,
    checkedPoints: []
  })

  const globalData = {
    shipIomi: 8883339,
    libreta: 123456,
    nombreTripulante: 'Juan Perezcuzo'
  }

  const portGuardPoints = [
    'Sentina Control de Nivel',
    'Tanque Diario de Combustible (Nivel)',
    'Bomba de Sanidad Control de Funcionamiento',
    'Bomba Agua potable Control de Funcionamiento',
    'Control de Cabos de Amarre',
    'Control de planchada',
    'Recorrida general por el Buque',
    'Sistema de control de estanqueidad'
  ]

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const selectedShip = shipOptions.find(
      ship => ship.ship_omi === parseInt(value)
    )

    if (selectedShip) {
      setControlData(prevData => ({
        ...prevData,
        shipOmi: selectedShip
      }))
    }
  }

  const handleCheckboxChange = (index: number) => {
    setControlData(prevData => {
      const updatedCheckedPoints = [...prevData.checkedPoints]
      updatedCheckedPoints[index] = !updatedCheckedPoints[index]

      const allChecked = updatedCheckedPoints.every(checked => checked === true)

      return {
        ...prevData,
        checkedPoints: updatedCheckedPoints,
        isAllChecked: allChecked
      }
    })
  }

  const handleCheckAll = () => {
    setControlData(prevData => ({
      ...prevData,
      checkedPoints: Array(portGuardPoints.length).fill(true),
      isAllChecked: true
    }))
  }

  async function fetchData() {
    try {
      const res = await axios.get(`/api/get_ships/${globalData.shipIomi}`)
      const data = await res.data
      setShipOptions(data)
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
  const formattedDate = date => {
    const day = date.day.toString().padStart(2, '0')
    const month = date.month.toString().padStart(2, '0')
    const year = date.year

    return `${year}-${month}-${day}`
  }

  const submitData = async () => {
    try {
      const submitedData = {
        date: formattedDate(controlData.date),
        shipOmi: globalData.shipIomi,
        guardOmi: globalData.libreta,
        sign: signatures.guardianSignature,
        observation: controlData.observation
      }
      const response = await axios.post(
        '/api/register_port_control/',
        submitedData
      )
      console.log('Data submitted:', response.data)

      console.log(submitedData)
    } catch (error) {
      console.error('Error submitting data:', error)
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
          <p className='text-xl'>
            INSTRUCCIONES DE CONTROL DE GUARDIA EN PUERTO
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className=''>Seleccione barco:</p>
        <Select
          name='ship'
          placeholder='Seleccione buque'
          value={'asd'}
          onChange={handleSelectChange}
          className='my-4 max-w-md'
          isDisabled={loadingCompany}
          aria-label='Empresa'
        >
          {shipOptions.map(ship => (
            <SelectItem key={ship.omi} value={ship.omi}>
              {ship?.ship_name}
            </SelectItem>
          ))}
        </Select>
        <p className=''>Fecha de revisión</p>

        <DatePicker
          hideTimeZone={true}
          hourCycle={24}
          granularity='day'
          className='max-w-md my-2'
          label='Fecha'
          value={controlData.date}
          onChange={date => setControlData(prevData => ({ ...prevData, date }))}
        />

        <p className='mb-4'>
          {' '}
          Nombre del tripulante: {globalData.nombreTripulante}
        </p>
        <p className='mb-4'> Libreta de embarque / DNI: {globalData.libreta}</p>
        <Divider />
        <p className='my-4 text-small'>
          * las presentes instrucciones, son obligatorias y de consignas para
          todos aquellos tripulantes que cumplan funciones de guardia en puerto
          a bordo del buque
        </p>
      </CardBody>
      <Divider />
      <Table
        aria-label='Table for port guard points'
        className='w-full'
        isStriped
      >
        <TableHeader>
          <TableColumn>Tema</TableColumn>
          <TableColumn>Cumplimiento</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Cargando data'>
          {portGuardPoints.map((theme, index) => (
            <TableRow key={index}>
              <TableCell>{theme}</TableCell>
              <TableCell>
                <Checkbox
                  isSelected={controlData.checkedPoints[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className='mt-4' onClick={handleCheckAll}>
        Check All
      </Button>

      <p className='mt-4 mb-2'>Observaciones:</p>
      <Textarea
        labelPlacement='outside'
        placeholder='Escriba aqui su reseña'
        value={controlData.observation}
        onChange={(e: { target: { value: any } }) =>
          setControlData(prevData => ({
            ...prevData,
            observation: e.target.value
          }))
        }
      />
      <p className='my-4 text-tiny'>
        * En caso de emergencia ver listas de verificación LE-01, LE-07 y LE-10
      </p>

      <CardBody className='flex gap-4'>
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <SignModal
            onSave={(data: any) =>
              handleSaveSignature(data, 'guardianSignature')
            }
            title='FIRMA GUARDIA PUERTO'
          />
          <SignatureChecker status={signatures?.guardianSignature} />
        </div>
      </CardBody>
      <CardFooter className=' flex gap-3 justify-end'>
        <Button isDisabled={!controlData.isAllChecked} onClick={submitData}>
          Enviar
        </Button>
      </CardFooter>
    </Card>
  )
}
