'use client'
import useAccidentsByShip from '@/app/hooks/useAccidentsByShip'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AccidentReportCard } from './accidentReportCard'
import AccidentModal from './accidentModal'

interface HistoryDataInterface {
  description: string // Descripción del mantenimiento realizado
  date: Date // Fecha en la que se realizó el mantenimiento
  type: string // Tipo de tarea, en este caso siempre 'mantenimiento'
}
export const AccidentReports = () => {
  const { selectedShip } = useGlobalStore()
  const selectedShipOmi = selectedShip?.idOMI
  const [historyData, setHistoryData] = useState<HistoryDataInterface[]>([])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day} - ${month} - ${year}`
  }
  const { accidents, loadingAccidents } = useAccidentsByShip(8123123)

  const ordersTabHeader = [
    'Estado',
    'Barco',
    'Fecha',
    'Última Modificación',
    'Ver/Modificar'
  ]

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
          <p className='text-xl'>Ordenes y reparaciones</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <AccidentReportCard />
        <Table
          aria-label='Example static collection table w-full'
          isStriped
          className='my-4'
        >
          <TableHeader>
            {ordersTabHeader.map(header => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={'No hay accidentes registrados'}>
            {
              // !isLoading &&
              accidents?.map((element, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {element?.open_case ? 'En proceso' : 'Terminado'}
                  </TableCell>
                  <TableCell>{element.shipData.ship_name}</TableCell>
                  <TableCell>{element.date}</TableCell>
                  <TableCell>{element.date} </TableCell>
                  {/* <TableCell><AccidentModal accidentData={element} /></TableCell>  */}
                  <TableCell>
                    <AccidentModal accidentData={element} />
                  </TableCell>
                  {/* hacer función para que tome última modificación */}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}
