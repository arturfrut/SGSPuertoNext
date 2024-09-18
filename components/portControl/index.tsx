'use client'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { NewPortControlCard } from './newPortControlCard'

export const PortControl = () => {
  const { selectedShip } = useGlobalStore()
  const selectedShipOmi = selectedShip?.idOMI
  const [historyData, setHistoryData] = useState([])
  const [page, setPage] = useState(1)

  const rowsPerPage = 7

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const fetchPortControlData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_port_control/${selectedShip?.idOMI}`
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
      fetchPortControlData()
    }
  }, [selectedShipOmi])

  // Obtener los últimos n días desde hoy
  const getLastNDays = (n: number): string[] => {
    const dates = []
    for (let i = 0; i < n; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push(formatDate(date.toISOString()))
    }
    return dates
  }

  const totalDays = Math.ceil(
    (new Date().getTime() -
      new Date(
        historyData[historyData.length - 1]?.date || new Date()
      ).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const totalPages = Math.ceil(totalDays / rowsPerPage)

  const daysToShow = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    return getLastNDays(rowsPerPage).slice(start, start + rowsPerPage)
  }, [page])

  const isDateChecked = (date: string): boolean => {
    return historyData.some(d => d.date === date)
  }

  const getObservation = (date: string): string => {
    const entry = historyData.find(d => d.date === date)
    return entry?.observation ? entry.observation : 'sin observaciones'
  }

  const ordersTabHeader = ['Fecha', 'Observado', 'Observaciones']

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
          <p className='text-xl'>Registro control de puerto</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <NewPortControlCard />
        <Table
          topContent={<h1>Por defecto se muestran los últimos 7 días</h1>}
          aria-label='Example static collection table w-full'
          isStriped
          className='my-4'
        >
          <TableHeader>
            {ordersTabHeader.map(header => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={'No hay capacitaciones registradas'}>
            {daysToShow.map((day, index) => (
              <TableRow key={index}>
                <TableCell>{day}</TableCell>
                <TableCell>
                  <Checkbox
                    isReadOnly
                    className='cursor-default'
                    isSelected={isDateChecked(day)}
                  />
                </TableCell>
                <TableCell>
                  {isDateChecked(day) ? getObservation(day) : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='secondary'
            page={page}
            total={totalPages}
            onChange={page => setPage(page)}
          />
        </div>
      </CardBody>
    </Card>
  )
}

// 'use client'
// import useGlobalStore from '@/stores/useGlobalStore'
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Divider,
//   Image,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow
// } from '@nextui-org/react'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { NewPortControlCard } from './newPortControlCard'

// export const PortControl = () => {
//   const { selectedShip } = useGlobalStore()
//   const selectedShipOmi = selectedShip?.idOMI
//   const [historyData, setHistoryData] = useState([])

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr)
//     const day = String(date.getUTCDate()).padStart(2, '0')
//     const month = String(date.getUTCMonth() + 1).padStart(2, '0')
//     const year = date.getUTCFullYear()
//     return `${day} - ${month} - ${year}`
//   }

//   useEffect(() => {
//     const fetchPortControlData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/get_port_control/${selectedShip?.idOMI}`
//         )
//         const data = response.data
//         setHistoryData(
//           data.map(element => ({ ...element, date: formatDate(element.date) }))
//         )
//         console.log(data)
//       } catch (error) {
//         console.error('Error fetching history data:', error)
//       }
//     }

//     if (selectedShip?.idOMI) {
//       fetchPortControlData()
//     }
//   }, [selectedShipOmi])

//   const ordersTabHeader = ['fecha', 'comentarios']

//   return (
//     <Card className='w-full  md:px-10 md:py-5'>
//       <CardHeader className='flex gap-3'>
//         <Image
//           alt='nextui logo'
//           height={40}
//           radius='sm'
//           src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
//           width={40}
//         />
//         <div className='flex flex-col'>
//           <p className='text-xl'>Registro control de puerto</p>
//         </div>
//       </CardHeader>
//       <Divider className='mb-4' />
//       <CardBody>
//         <NewPortControlCard />
//         <Table
//           aria-label='Example static collection table w-full'
//           isStriped
//           className='my-4'
//         >
//           <TableHeader>
//             {ordersTabHeader.map(header => (
//               <TableColumn key={header}>{header}</TableColumn>
//             ))}
//           </TableHeader>
//           <TableBody
//             emptyContent={
//               'No hay capacitaciones registradas'

//               // isLoading ? 'Cargando data...' : 'No hay capacitaciones registradas'
//             }
//           >
//             {
//               // !isLoading &&
//               historyData.map((element, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{element.date}</TableCell>
//                   <TableCell>{element.observation}</TableCell>
//                 </TableRow>
//               ))
//             }
//           </TableBody>
//         </Table>
//       </CardBody>
//     </Card>
//   )
// }
