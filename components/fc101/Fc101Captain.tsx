import { fc101Docs } from '@/constants/formsLists'
import { Item101 } from './item101'
import { DateValue } from '@internationalized/date'

interface DateState {
  annualExpiration: DateValue | null
  indicatedExpiration: DateValue | null
  finalExpiration: DateValue | null
}

interface Fc101CaptainFormProps {
  dates: { [key: string]: DateState }
  handleDateChange: (id: string, key: keyof DateState) => (date: DateValue | null) => void
}

export const Fc101CaptainForm = ({ dates, handleDateChange }: Fc101CaptainFormProps) => {
  return (
    <>
      {fc101Docs.map((doc, index) => (
        <Item101
          key={index}
          id={doc.title}
          title={doc.title}
          withEvidence={doc.withEvidence}
          withNumber={doc.withNumber}
          dates={dates}
          handleDateChange={handleDateChange}
        />
      ))}
    </>
  )
}