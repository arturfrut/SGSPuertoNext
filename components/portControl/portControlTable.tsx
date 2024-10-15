import { usePortControl } from '@/app/hooks/components/usePortControl'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Pagination
} from '@nextui-org/react'

export const PortControlTable = () => {
  const {
    page,
    setPage,
    daysToShow,
    isDateChecked,
    getObservation,
    totalPages
  } = usePortControl()
  const ordersTabHeader = ['Fecha', 'Observado', 'Observaciones']

  return (
    <>
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
                  disableAnimation={isDateChecked(day)}
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
    </>
  )
}
