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

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_maintenance/${selectedShip?.idOMI}`
        )
        const data = response.data.map(item => {
          const previousCharge = item.lastCharge
            ? parseAbsoluteToLocal(item.lastCharge)
            : null
          const recommendation = previousCharge
            ? `La última carga se hizo hace ${getHoursBetween(new Date, item.lastCharge)} horas`    
            : 'Sin recomendaciones'

          return {
            block: item.block,
            description: item.description,
            frecuency: item.frecuency,
            routeDate: today,
            routeTime: null,
            nextRouteTime: null,
            previousCharge,
            recommendation
          }
        })
        setMaintenanceData(data)
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

  const getHoursBetween = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffInMs = Math.abs(endDate - startDate)
    return Math.floor(diffInMs / (1000 * 60 * 60))
  }

  const handleSubmit = async () => {
    const filteredData = maintenanceData
      .filter(item => item.routeTime)
      .map(item => ({
        ...item,
        routeDate: formattedDate(item.routeDate)
      }))

    const postData = {
      maintenanceData: filteredData,
      selectedShipIdOmi: selectedShip?.idOMI,
      idCaptain,
      idEngineerChief,
      chiefSign: signatures.registerSign
    }

    console.log('Data to be submitted:', postData)

    try {
      const response = await axios.post('/api/register_maintenance', postData)
      console.log('maintenance report created successfully:', response.data)
      alert('Mantenimiento registrado')
    } catch (error) {
      console.error('Error creating maintenance report:', error)
      alert('Error al registrar mantenimiento')
    }
  }

  const groupedData = maintenanceData.reduce((groups, item) => {
    const group = groups[item.block] || []
    group.push(item)
    groups[item.block] = group
    return groups
  }, {})

  return ( <Card className='w-full  md:px-10 md:py-5'>
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
                {Object.keys(groupedData).map((block, blockIndex) => (
                  <div key={blockIndex}>
                    <h3>{block}</h3>
                    <Table  aria-label={`Table for ${block}`} className='w-full'>
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