import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

interface MaintenanceHistoryTableInterface {
  idOmi : number | string | undefined
}

export const MaintenanceHistoryTable:FC<MaintenanceHistoryTableInterface> = ({ idOmi }) => {
  const [historyData, setHistoryData] = useState([])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day} - ${month} - ${year}`
  }
  console.log(idOmi)

  
  useEffect(() => {
    console.log('IDOMI,', idOmi)
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_maintenance_history/${idOmi}`,
          { headers: { 'Cache-Control': 'no-cache' } }
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

    if (idOmi) {
      fetchMaintenanceData()
    }
  }, [idOmi])

  const trainingsTabHeader = ['tipo', 'descripcion', 'fecha']

  return (
    <Table aria-label='Example static collection table w-full' isStriped>
      <TableHeader>
        {trainingsTabHeader.map(header => (
          <TableColumn key={header}>{header}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={'Cargando data'}>
        {
          // !isLoading &&
          historyData.map((element, index) => (
            <TableRow key={index}>
              <TableCell>{element.type}</TableCell>
              <TableCell>{element.description}</TableCell>
              <TableCell>{element.date}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
