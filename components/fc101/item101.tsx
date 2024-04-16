import { Button, Divider, Input } from '@nextui-org/react'
import { DateSelector } from '../dateSelector'
import { ClockIcon } from '../icons/clock-icon'

export const Item101 = ({
  title,
  withEvidence,
  withNumber,
  evidenceStatus,
  // estos valores son para el manejo de estados
  itemData,
  setItemDate
}: {
  title: string
  withNumber?: boolean
  withEvidence?: boolean
  evidenceStatus?: boolean
  itemData?: { nummber: string; vi: {}; va: {}; vf: {} }
  setItemDate?: Function
}) => {
  return (
    <>
      <p className='my-4 text-xl'>{title}:</p>
      <div className='w-full md:grid md:grid-cols-2 md:gap-4 mb-4'>
        {withNumber && (
          <div>
            <p className='my-4'>Número</p>
            <div className='flex w-full  flex-nowrap  gap-4'>
              <Input type='number' defaultValue={'12345'} label='Número' />
            </div>
          </div>
        )}
        <DateSelector title='Vencimiento Anual' />
        <DateSelector title='Vencimiento Indicado' />
        <DateSelector title='Vencimiento Final' />
      </div>
      {withEvidence && (
        <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
          <Button className='w-full'> Imagen de evidencia - sin cargar</Button>
          <ClockIcon />
        </div>
      )}
      <Divider />
    </>
  )
}
