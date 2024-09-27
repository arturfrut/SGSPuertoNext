import { useMaintenanceHistoryByShip } from '@/app/hooks/useMaintenanceHistoryByShip'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { FC } from 'react'

interface MaintenanceHistoryTableInterface {
  idOmi: number | string | undefined
}

export const MaintenanceHistoryTable: FC<MaintenanceHistoryTableInterface> = ({
  idOmi
}) => {
  const { historyData } = useMaintenanceHistoryByShip(idOmi)

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
              <TableCell>{String(element.date)}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
