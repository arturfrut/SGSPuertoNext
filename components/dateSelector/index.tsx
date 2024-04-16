import { monthsSelect } from '@/constants/strings'
import { Input, Select, SelectItem } from '@nextui-org/react'

type Month = (typeof monthsSelect)[number]

interface DateSelectorInterface {
  baseDate?: {
    day?: { default: string; max: number } 
    month?: { default: Month} 
    year?: { default: string; max: number }
  }
  title: string
}

export const DateSelector = ({
  baseDate: {
    day: { default: dayDefault, max: dayMax } = {}, // Proporcionando un objeto vacío como valor por defecto para day
    month: { default: monthDefault} = {}, // Proporcionando un objeto vacío como valor por defecto para month
    year: { default: yearDefault, max: yearMax } = {} // Proporcionando un objeto vacío como valor por defecto para year
  } = {},
  title
}: DateSelectorInterface) => {
  return (
    <div >
      <p className='my-4'>{title}</p>
      <div className='flex w-full  flex-nowrap  gap-4'>
        <Input
          type='number'
          max={yearMax}
          // TODO: No funciona el Max, probar poniendolo como variable de renderizado
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
        {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
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
