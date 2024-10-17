'use client'

import useGlobalStore from '@/stores/useGlobalStore'
import { Accordion, AccordionItem, Card, CardBody } from '@nextui-org/react'
import { PoliticsForm } from './politicsForm'
import useGuard101ByShip from '@/app/hooks/useGuard101ByShip'
import { PoliticsGuardPrevData } from './politicsGuardPrevData'

export const Fp101PortControl = () => {
  const { selectedShip } = useGlobalStore()
  const { guardData, loadingGuard } = useGuard101ByShip(selectedShip.idOMI)


  return (
    <div className='flex flex-col w-full'>
      <Card className='w-full my-4 md:mx-8 p-4 '>
        <CardBody>
          <PoliticsGuardPrevData
            loadingGuard={loadingGuard}
            guardData={guardData}
          />
        </CardBody>
      </Card>
      <Card className='w-full md:mx-8 p-4 '>
        <Accordion>
          <AccordionItem key='1' aria-label='Accordion 1' title='Generar nuevo formulario FP 101'>
            <PoliticsForm />
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
