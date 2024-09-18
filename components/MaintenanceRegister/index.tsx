'use client'

// FALTA CORREGIR PARA QUE EN CASO DE SUPERPOSICIÓN TOME SOLO EL ÚLTIMO

import { SignatureChecker } from '@/components/signatureChecker'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import useGlobalStore from '@/stores/useGlobalStore'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { useEffect, useState } from 'react'
// import { parseAbsoluteToLocal, getHoursBetween } from '@internationalized/date'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Divider,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'

type MotorData = {
  description: string
  lastCharge: number | null
  actualhours: number | null
  newCharge?: number | null
  related?: string
}

export const MaintenanceRegister = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const { selectedShip, idCaptain } = useGlobalStore()
  const idEngineerChief = 1 // Este valor debería ser dinámico según la tripulación

  const today = parseAbsoluteToLocal(new Date().toISOString())

  const formattedDate = date => {
    const day = date.day.toString().padStart(2, '0')
    const month = date.month.toString().padStart(2, '0')
    const year = date.year
    const hour = date.hour.toString().padStart(2, '0')
    const minute = date.minute.toString().padStart(2, '0')

    return `${day} - ${month} - ${year} - ${hour}:${minute}`
  }

  const [maintenanceData, setMaintenanceData] = useState([])
  const [motorData, setMotorData] = useState<MotorData[]>([])

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_maintenance/${selectedShip?.idOMI}`
        )

        console.log(response)
        const data = response.data.renderData.map(item => {
          const previousCharge = item.lastCharge
            ? parseAbsoluteToLocal(item.lastCharge)
            : null

          return {
            block: item.block,
            description: item.description,
            frecuency: item.frecuency,
            routeDate: today,
            routeTime: null,
            nextRouteTime: null,
            previousCharge,
            recommendation: ''
          }
        })
        setMaintenanceData(data)
        setMotorData(response.data.motorData)
      } catch (error) {
        console.error('Error fetching maintenance data:', error)
      }
    }

    if (selectedShip?.idOMI) {
      fetchMaintenanceData()
    }
  }, [selectedShip?.idOMI])

  const handleDateChange = (date, index) => {
    const updatedData = [...maintenanceData]
    updatedData[index].routeDate = date
    setMaintenanceData(updatedData)
  }

  const handleTimeChange = (time, index) => {
    const updatedData = [...maintenanceData]
    updatedData[index].routeTime = time
    updatedData[index].nextRouteTime = time
      ? parseInt(updatedData[index].frecuency) + parseInt(time)
      : parseInt(updatedData[index].frecuency)
    setMaintenanceData(updatedData)
  }

  const handleSubmit = async () => {
    const filteredData = maintenanceData
      .filter(item => item.routeTime)
      .map(item => ({
        ...item,
        routeDate: formattedDate(item.routeDate)
      }))

    const additionalData = motorData
      .filter(item => item.newCharge) // Filtra aquellos que tengan un valor en newCharge
      .map(item => ({
        block: 'MOTORS',
        description: item.description,
        frecuency: '0',
        routeDate: today, // La fecha de hoy formateada
        routeTime: item.newCharge, // El valor de newCharge
        nextRouteTime: '',
        previousCharge: '',
        recommendation: ''
      }))

    const postData = {
      maintenanceData: [...filteredData, ...additionalData], // Une ambos arrays
      selectedShipIdOmi: selectedShip?.idOMI,
      idCaptain,
      idEngineerChief,
      chiefSign: signatures.registerSign
    }
    console.log(motorData)
    console.log('Data to be submitted:', postData)

    // try {
    //   const response = await axios.post('/api/register_maintenance', postData)
    //   console.log('maintenance report created successfully:', response.data)
    //   alert('Mantenimiento registrado')
    // } catch (error) {
    //   console.error('Error creating maintenance report:', error)
    //   alert('Error al registrar mantenimiento')
    // }
  }

  const groupedData = maintenanceData.reduce((groups, item) => {
    const group = groups[item.block] || []
    group.push(item)
    groups[item.block] = group
    return groups
  }, {})

  const handleMotorChange = (newCharge, description) => {
    setMotorData(prevMotorData =>
      prevMotorData.map(item => {
        // Convertir a minúsculas para comparación sin importar mayúsculas/minúsculas
        const lowerCaseDescription = description.toLowerCase()

        // Verificar si el item es "MOTOR PRINCIPAL" o su related "CAJA REDUCTORA"
        if (
          item.description.toLowerCase() === lowerCaseDescription ||
          item.related?.toLowerCase() === lowerCaseDescription
        ) {
          return {
            ...item,
            newCharge: newCharge
          }
        }

        return item
      })
    )
  }

  return (
    <Card className='w-full  md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>Nuevo registro de mantenimiento</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <div className='flex flex-col gap-5'>
          <Card className='w-full'>
            <CardBody>
              <Table className='w-1/2'>
                <TableHeader>
                  <TableColumn className='w-6/12'> </TableColumn>
                  <TableColumn>Ultima carga</TableColumn>
                  <TableColumn className='w-2/12'>Nueva carga</TableColumn>
                </TableHeader>
                <TableBody emptyContent='Cargando data'>
                  {motorData.map((item, index) => (
                    <TableRow key={index}>
                      {/* <TableCell className='' css={{ backgroundColor: "#27272a", color: "white" }}> */}
                      <TableCell className='bg-[#27272a] w-6/12'>
                        HORAS {item.description}:
                      </TableCell>
                      <TableCell className='w-2/12'>
                        {item.actualhours}
                      </TableCell>
                      <TableCell className='w-60'>
                        <Input
                          type='number'
                          value={item.newCharge ?? ''}
                          onChange={e =>
                            handleMotorChange(e.target.value, item.description)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {Object.keys(groupedData).map((block, blockIndex) => (
                <div key={blockIndex}>
                  <h3>{block}</h3>
                  <Table aria-label={`Table for ${block}`} className='w-full'>
                    <TableHeader>
                      <TableColumn>Item</TableColumn>
                      <TableColumn>Descripción</TableColumn>
                      <TableColumn>Frecuecia</TableColumn>
                      <TableColumn>Fecha recorrido</TableColumn>
                      <TableColumn>Hrs recorrido al recorrido</TableColumn>
                      <TableColumn>Hrs próximo recorrido</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent='Cargando data'>
                      {groupedData[block].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.frecuency}</TableCell>
                          <TableCell>
                            <DatePicker
                              hideTimeZone={true}
                              hourCycle={24}
                              granularity='hour'
                              className='max-w-md'
                              label='Date'
                              value={row.routeDate}
                              onChange={date => handleDateChange(date, index)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type='number'
                              placeholder={row.recommendation}
                              value={row.routeTime ?? ''}
                              onChange={e =>
                                handleTimeChange(e.target.value, index)
                              }
                            />
                          </TableCell>
                          <TableCell>{row.nextRouteTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
        <div className='w-full flex justify-end'>
          <div className='flex items-center gap-5'>
            <SignModal
              onSave={data => handleSaveSignature(data, 'registerSign')}
              title='Firma Tripulante'
            />
            <SignatureChecker status={signatures?.registerSign} />
            <Button color='primary' onPress={handleSubmit}>
              Enviar Data
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
