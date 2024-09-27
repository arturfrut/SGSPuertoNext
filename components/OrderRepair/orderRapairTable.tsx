import { useOrderRepairByShip } from '@/app/hooks/useOrderRepairByShip'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'

interface OrderRepairTableProps {
  idOmi: string | number | undefined
}

export const OrderRepairTable = ({ idOmi }: OrderRepairTableProps) => {
  const ordersTabHeader = ['estado', 'tipo', 'descripcion', 'fecha']
  const { historyData } = useOrderRepairByShip(idOmi)

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
      <TableBody
        emptyContent={
          'Cargando data'

        }
      >
        {
          historyData.map((element, index) => (
            <TableRow key={index}>
              <TableCell>{element.type}</TableCell>
              <TableCell>reparación</TableCell>
              <TableCell>{element.description}</TableCell>
              <TableCell>{element.date}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
