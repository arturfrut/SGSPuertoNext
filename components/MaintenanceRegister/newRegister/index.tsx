'use client'
// PRIMER CARGA LA HAGO YO
// {
//   /* <div>MM PP y ubicar en proa popa babor estribor crujia</div> */
// }

// FECHA RECORRIDO por defecto hoy, pero se puede cambiar

// HRS. PROX. RECORRIDO es suma automatica

import { SignatureChecker } from '@/components/signatureChecker'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { parseAbsoluteToLocal } from '@internationalized/date'
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useState } from 'react'

export const NewMaintenanceRegister = () => {
  const apiData = [
    {
      block: 'MOTOR PRINCIPAL',
      description: 'Limpieza filtro de combustible (cartucho)',
      frecuency: '250',
      routeDate: '09-04-2024',
      routeTime: null,
      nextRouteTime: null
    },
    {
      block: 'MOTOR PRINCIPAL',
      description: 'Limpieza de filtro aire turbo-soplante',
      frecuency: '250',
      routeDate: '09-04-2024',
      routeTime: null,
      nextRouteTime: null
    },
    {
      block: 'MOTOR PRINCIPAL',
      description: 'Limpieza de filtro de aceite (lavable)',
      frecuency: '250',
      routeDate: '09-04-2024',
      routeTime: null,
      nextRouteTime: null
    },
    {
      block: 'MOTOR PRINCIPAL',

      description: 'Cambio de aceite',
      frecuency: '250',
      routeDate: '09-04-2024',
      routeTime: null,
      nextRouteTime: null
    },
    {
      block: 'CAJA REDUCTORA',

      description: 'Limpieza de filtro de aceite (lavable)',
      frecuency: '250',
      routeDate: '09-04-2024',
      routeTime: null,
      nextRouteTime: null
    },
    {
      block: 'CAJA REDUCTORA',

      description: 'Cambio de aceite',
      frecuency: '250',
      routeDate: '09-04-2024',
      routeTime: null,
      nextRouteTime: null
    }
  ]
  const { signatures, handleSaveSignature } = useSignModal()

  const today = parseAbsoluteToLocal(new Date().toISOString())
  const formattedDate = date =>
    `${date.day.toString().padStart(2, '0')} - ${date.month
      .toString()
      .padStart(2, '0')} - ${date.year}`

  // Manejamos la fecha y los tiempos de recorrido por estado
  const [maintenanceData, setMaintenanceData] = useState(
    apiData.map(item => ({
      ...item,
      nextRouteTime: parseInt(item.frecuency) + parseInt(item.nextRouteTime ?? 0),
      routeDate: today,
      routeTime: item.routeTime || ''
    }))
  )

  const handleDateChange = (date, index) => {
    const updatedData = [...maintenanceData]
    updatedData[index].routeDate = date
    setMaintenanceData(updatedData)
  }

  const handleTimeChange = (time, index) => {
    const updatedData = [...maintenanceData]
    updatedData[index].routeTime = time
    setMaintenanceData(updatedData)
  }

  const handleSubmit = () => {
    // Filtra los elementos que tienen `routeTime`
    const filteredData = maintenanceData
      .filter(item => item.routeTime)
      .map(item => ({
        ...item,
        routeDate: formattedDate(item.routeDate)
      }))
    console.log('Data to be submitted:', filteredData)
  }

  // Agrupar datos por bloques
  const groupedData = maintenanceData.reduce((groups, item) => {
    const group = groups[item.block] || []
    group.push(item)
    groups[item.block] = group
    return groups
  }, {})

  return (
    <div className='h-full lg:px-6 w-full'>
      <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full'>
          <div className='flex flex-col gap-5'>
            <Card className='w-full '>
              <CardBody>
                {Object.keys(groupedData).map((block, blockIndex) => (
                  <div key={blockIndex}>
                    <h3>{block}</h3> {/* Título del bloque */}
                    <Table aria-label={`Table for ${block}`} className='w-full'>
                      <TableHeader>
                        <TableColumn>Item</TableColumn>
                        <TableColumn>Descripción</TableColumn>
                        <TableColumn>Frecuecia</TableColumn>
                        <TableColumn>Fecha recorrido</TableColumn>
                        <TableColumn>Hrs recorrido al recorrido</TableColumn>
                        <TableColumn>Hrs próximo recorrido</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {groupedData[block].map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.frecuency}</TableCell>
                            <TableCell>
                              <DatePicker
                                className='max-w-md'
                                granularity='day'
                                label='Date'
                                value={row.routeDate}
                                onChange={date => handleDateChange(date, index)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type='number'
                                value={row.routeTime}
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
              <Button color='primary' onPress={handleSubmit}>
                Enviar Data
              </Button>
              <SignModal
                onSave={data => handleSaveSignature(data, 'registerSign')}
                title='Firma Tripulante'
              />
              <SignatureChecker status={signatures?.registerSign} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
