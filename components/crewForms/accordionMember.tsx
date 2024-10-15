import { Button, Chip, Divider } from '@nextui-org/react'
import Link from 'next/link'
import React, { FC } from 'react'

import { mockTripulation } from '@/mocks/crewListMock'
import useGlobalStore, {
  TripulationMemberInterface
} from '@/stores/useGlobalStore'

const crewFormsAccordion = [
  {
    name: 'Libreta de embarque / cédula',
    code: ' ',
    link: '/sailorBook'
  },
  {
    name: 'FC 101 - Control de vencimiento // REVISAR CON ANGEL',
    code: 'fc101',
    link: '/fc101'
  },
  {
    name: 'FP 101 - Políticas',
    code: 'fp101',
    link: '/fp101'
  },
  {
    name: 'FP 501 - Familiarización',
    code: 'fp501',
    link: '/fp501'
  },
  {
    name: 'F 502 - Entrega de Elementos de protección personal // Falta revisar conexión con BDD',
    code: 'fp502',
    link: '/fp502'
  }
  // {
  //   name: 'capacitaciones',
  //   code: 'trainings'
  // },
  // {
  //   name: 'accidentes',
  //   code: 'accidentes'
  // }
]

interface AccordionMemberInterface {
  crewMember: TripulationMemberInterface
}

export const AccordionMember: FC<AccordionMemberInterface> = ({
  crewMember
}) => {
  const { setSelectedTripulant } = useGlobalStore()
  const formComplete = () => {
    const { sailor_book_number, name, rol } = crewMember
    setSelectedTripulant({ sailor_book_number, name, rol })
  }
  return (
    <div>
      {crewFormsAccordion.map((form, index) => (
        <>
          <div className='flex justify-between items-center m-3'>
            <p>{form.name}</p>

            <Link href={`/crewForms/${form.link}`}>
              <Button onClick={() => formComplete()}>Completar</Button>
            </Link>
          </div>
          {index + 1 !== crewFormsAccordion.length && <Divider />}
        </>
      ))}
    </div>
  )
}
