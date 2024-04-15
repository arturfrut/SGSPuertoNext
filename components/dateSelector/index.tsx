import { monthsSelect } from '@/constants/strings'
import { getCurrentDateTime } from '@/utils/dateSelector'
import { Input, Select, SelectItem } from '@nextui-org/react'

export const DateSeletor = ({
  baseDate: {
    day: { default, max } = {},
    month: { default, max } = {},
    year: { default, max } = {}
  } = {},
  title
}: {
  title: string
  baseDate?: {
    day?: { default?: number; max?: number }
    month?: { default?: number; max?: number }
    year?: { default?: number; max?: number }
  }
}) => {
  
  return (
    <div className='md:w-1/2'>
      <p className='my-4'>{title}</p>
      <div className='flex w-full  flex-nowrap  gap-4'>
        <Input
          type='number'
          max={getCurrentDateTime().year + 2}
          // TODO: No funciona el Max, probar poniendolo como variable de renderizado
          defaultValue={getCurrentDateTime().year}
          label='Año'
        />

        <Select label='Mes' value={'Marzo'}>
          {monthsSelect.map(month => (
            <SelectItem key={`monthsSelectId-${month}`} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
        {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
        {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
        <Input
          type='number'
          max={31}
          label='Día'
          defaultValue={getCurrentDateTime().day}
        />
      </div>
    </div>
  )
}
