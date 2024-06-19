import { monthsSelect } from '@/constants/strings'
import { Input, Select, SelectItem } from '@nextui-org/react'

type Month = (typeof monthsSelect)[number]

interface DateSelectorInterface {
  baseDate?: {
    day?: { default: string; max: number }
    month?: { default: Month }
    year?: { default: string; max: number }
  }
  title: string
}

export const DateSelector = ({
  baseDate = {}, // Proporcionar un valor por defecto para baseDate
  title
}: DateSelectorInterface) => {
  // Desestructurar y proporcionar valores predeterminados dentro de la función
  const {
    day: { default: dayDefault = '', max: dayMax = 31 } = { default: '', max: 31 },
    month: { default: monthDefault = monthsSelect[0] } = { default: monthsSelect[0] },
    year: { default: yearDefault = '', max: yearMax = new Date().getFullYear() } = { default: '', max: new Date().getFullYear() }
  } = baseDate

  return (
    <div>
      <p className='my-4'>{title}</p>
      <div className='flex w-full flex-nowrap gap-4'>
        <Input
          type='number'
          max={yearMax}
          // TODO: No funciona el Max, probar poniéndolo como variable de renderizado
          defaultValue={yearDefault}
          label='Año'
        />
        <Select label='Mes' value={monthDefault}>
          {monthsSelect.map(month => (
            <SelectItem key={`monthsSelectId-${month}`} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
        {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
        {/* TODO: HACER FUNCIÓN PARA CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUÉS DE TENER UN DATO EN EL MES */}
        <Input
          type='number'
          max={dayMax}
          label='Día'
          defaultValue={dayDefault}
        />
      </div>
    </div>
  )
}