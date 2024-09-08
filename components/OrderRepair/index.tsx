'use client'
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
import { NewOrderRepairCard } from './newOrderRepairCard'

export const OrderReapair = () => {
  const { selectedShip } = useGlobalStore()
  const selectedShipOmi = selectedShip?.idOMI
  const [historyData, setHistoryData] = useState([])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day} - ${month} - ${year}`
  }

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_maintenance_history/${selectedShip?.idOMI}`
        )
        const data = response.data
        setHistoryData(
          data.map(element => ({ ...element, date: formatDate(element.date) }))
        )
        console.log(data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    if (selectedShip?.idOMI) {
      fetchMaintenanceData()
    }
  }, [selectedShipOmi])

  const ordersTabHeader = ['estado', 'tipo','descripcion', 'fecha']

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

        <NewOrderRepairCard />
        <Table aria-label='Example static collection table w-full' isStriped className='my-4'>
          <TableHeader>
            {ordersTabHeader.map(header => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={
              'No hay capacitaciones registradas'

              // isLoading ? 'Cargando data...' : 'No hay capacitaciones registradas'
            }
          >
            {
              // !isLoading &&
              historyData.map((element, index) => (
                <TableRow key={index}>
                  <TableCell>{element.type}</TableCell>
                  <TableCell>'reparación'</TableCell>
                  <TableCell>{element.description}</TableCell>
                  <TableCell>{element.date}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}


