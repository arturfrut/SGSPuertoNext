import useGetNcnByShip from '@/app/hooks/useGetNcnByShip'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'

interface OrderRepairTableProps {
  idOmi: string | number | undefined
}

export const NonConformityTable = ({ idOmi }: OrderRepairTableProps) => {

  const ordersTabHeader = ['estado', 'título', 'emisor', 'fecha','']
  const [loadingRedirect, setLoadingRedirect] = useState(false)
  const { setNcnActive } = useGlobalStore()
  const { ncnsData } = useGetNcnByShip(idOmi)
  const redirecToNote = async noteId => {
    setLoadingRedirect(true)
    try {
      const res = await axios.get(`/api/get_ncn/${noteId}`)
      const data = await res.data
      setNcnActive(data)
      console.log(data)
      window.location.href = '/non-conformity/new-note'
    } catch (e) {
      alert('Error al obtener la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setLoadingRedirect(false)
    }
  }
  return (
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
      <TableBody emptyContent={'Cargando data'}>
        {ncnsData?.map((element, index) => (
          <TableRow key={index}>
            <TableCell>{element.status}</TableCell>
            <TableCell>{element.title}</TableCell>
            <TableCell>Juan Ramirez</TableCell>
            <TableCell>25/07/2024</TableCell>
            <TableCell>
              <Button
                isLoading={loadingRedirect}
                onClick={() => redirecToNote(element.ncnid)}
              >
                Ir a nota
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
