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

export const NonConformityTable = ({ idOmi }: OrderRepairTableProps) => {
  const ordersTabHeader = ['estado', 'título', 'emisor', 'fecha']

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
        {/* {historyData.map((element, index) => ( */}
          <TableRow >
            <TableCell>Recepción</TableCell>
            <TableCell>Queja por falta de acción</TableCell>
            <TableCell>Juan Ramirez</TableCell>
            <TableCell>25/07/2024</TableCell>
          </TableRow>
        {/* ))} */}
      </TableBody>
    </Table>
  )
}
