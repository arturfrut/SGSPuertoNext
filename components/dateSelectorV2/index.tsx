import { DatePicker } from '@nextui-org/react'
import { DateValue } from '@internationalized/date'

interface DateSelectorV2Props {
  title: string
  date: DateValue | null
  setDate: (value: DateValue | null) => void
}

export const DateSelectorV2 = ({ title, date, setDate }: DateSelectorV2Props) => {
  return (
    <div className='my-4'>
      <p className='mb-4'>{title}</p>
      <DatePicker label='Fecha' value={date} onChange={setDate} />
    </div>
  )
}