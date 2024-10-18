'use client'
import { Accordion, AccordionItem, Card, CardBody } from '@nextui-org/react'
import { FamiliarizationForm } from './familiarizationForm'
import { FamiliarizationGuardPrevData } from './FamiliarizationGuardPrevData'
import useGuard101ByShip from '@/app/hooks/useGuard101ByShip'
import useGlobalStore from '@/stores/useGlobalStore'

export const Fp501PortControl = () => {
  const { selectedShip } = useGlobalStore()
  const { guardData, loadingGuard } = useGuard101ByShip(selectedShip.idOMI,'fp501')
  return (
    <div className='flex flex-col w-full'>
      <Card className='w-full my-4 md:mx-8 p-4 '>
        <CardBody>
          <FamiliarizationGuardPrevData
            loadingGuard={loadingGuard}
            guardData={guardData}
          />
        </CardBody>
      </Card>
      <Card className='w-full md:mx-8 p-4 '>
        <Accordion>
          <AccordionItem
            key='1'
            aria-label='Accordion 1'
            title='Generar nuevo formulario FP 501'
          >
            <FamiliarizationForm />
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
