import { Button, Divider, Input } from '@nextui-org/react'
import { ClockIcon } from '../icons/clock-icon'
import { DateSelectorV2 } from '../dateSelectorV2'
import { DateValue } from '@internationalized/date'

interface DateState {
  annualExpiration: DateValue | null
  indicatedExpiration: DateValue | null
  finalExpiration: DateValue | null
}

interface Item101Props {
  id: string
  title: string
  withNumber?: boolean
  withEvidence?: boolean
  dates: { [key: string]: DateState }
  handleDateChange: (id: string, key: keyof DateState) => (date: DateValue | null) => void
}

export const Item101 = ({
  id,
  title,
  withNumber,
  withEvidence,
  dates,
  handleDateChange
}: Item101Props) => {
  return (
    <>
      <div className='my-4'>
        <p className='text-xl'>{title}:</p>
        <div className='w-full md:grid md:grid-cols-2 md:gap-4 mb-4'>
          {withNumber && (
            <div>
              <p className='my-4'>Número</p>
              <div className='flex w-full flex-nowrap gap-4'>
                <Input type='number' defaultValue={'-'} label='Número' />
              </div>
            </div>
          )}

          <DateSelectorV2 title='Vencimiento Anual' date={dates[id]?.annualExpiration || null} setDate={handleDateChange(id, 'annualExpiration')} />
          <DateSelectorV2 title='Vencimiento Indicado' date={dates[id]?.indicatedExpiration || null} setDate={handleDateChange(id, 'indicatedExpiration')} />
          <DateSelectorV2 title='Vencimiento Final' date={dates[id]?.finalExpiration || null} setDate={handleDateChange(id, 'finalExpiration')} />
        </div>
        {withEvidence && (
          <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
            <Button className='w-full'>Imagen de evidencia - sin cargar</Button>
            <ClockIcon />
          </div>
        )}
      </div>
      <Divider />
    </>
  )
}