import { fc101Docs } from '@/constants/formsLists'
import { Item101 } from './item101'

export const Fc101CaptainForm = () => {
  return (
    <>
      {fc101Docs.map((doc, index) => (
        <Item101
          key={index}
          title={doc.title}
          withEvidence={doc.withEvidence}
          withNumber={doc.withNumber}
        />
      ))}
    </>
  )
}
