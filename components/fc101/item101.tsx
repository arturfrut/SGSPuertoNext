import { monthsSelect } from '@/constants/strings'
import { getCurrentDateTime } from '@/utils/dateSelector'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { ClockIcon } from '../icons/clock-icon'

export const Item1011 = ({
  title,
  withEvidence,
  itemData,
  setItemDate
}: {
  title: string
  withEvidence?: boolean
  itemData?: { nummber: string; vi: {}; va: {}; vf: {} }
  setItemDate?: Function
}) => {
  return (
    <>
      <p className='my-4 text-xl'>{title}:</p>
      <div className='w-full md:flex md:gap-4 mb-4'>
        <div className='md:w-1/2'>
          <p className='my-4'>Número</p>
          <div className='flex w-full  flex-nowrap  gap-4'>
            <Input
              type='number'
              max={getCurrentDateTime().year + 2}
              // TODO: No funciona el Max, probar poniendolo como variable de renderizado
              defaultValue={getCurrentDateTime().year}
              label='Número'
            />
          </div>
        </div>
        <div className='md:w-1/2'>
          <p className='my-4'>Vencimiento Anual</p>
          <div className='flex w-full  flex-nowrap  gap-4'>
            <Input
              type='number'
              max={getCurrentDateTime().year + 2}
              // TODO: No funciona el Max, probar poniendolo como variable de renderizado
              defaultValue={getCurrentDateTime().year}
              label='Año'
            />

            <Select
              label='Mes'
              value={'Marzo'}
              {...register('accidentDescription.accidentTime.month')}
            >
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
      </div>

      <div className='w-full md:flex md:gap-4 mb-4'>
        <div className='md:w-1/2'>
          <p className='my-4'>Vencimiento Indicado</p>
          <div className='flex w-full  flex-nowrap  gap-4'>
            <Input
              type='number'
              max={getCurrentDateTime().year + 2}
              // TODO: No funciona el Max, probar poniendolo como variable de renderizado
              defaultValue={getCurrentDateTime().year}
              label='Año'
              {...register('accidentDescription.accidentTime.year')}
            />

            <Select
              label='Mes'
              value={'Marzo'}
              {...register('accidentDescription.accidentTime.month')}
            >
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
              {...register('accidentDescription.accidentTime.day')}
            />
          </div>
        </div>
        <div className='md:w-1/2'>
          <p className='my-4'>Vencimiento final</p>
          <div className='flex w-full  flex-nowrap  gap-4'>
            <Input
              type='number'
              max={getCurrentDateTime().year + 2}
              // TODO: No funciona el Max, probar poniendolo como variable de renderizado
              defaultValue={getCurrentDateTime().year}
              label='Año'
              {...register('accidentDescription.accidentTime.year')}
            />

            <Select
              label='Mes'
              value={'Marzo'}
              {...register('accidentDescription.accidentTime.month')}
            >
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
              {...register('accidentDescription.accidentTime.day')}
            />
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
        <Button className='w-full'> Imagen de evidencia - sin cargar</Button>
        <ClockIcon />
      </div>
    </>
  )
}
