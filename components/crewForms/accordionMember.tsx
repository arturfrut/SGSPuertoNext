import { Button, Divider } from '@nextui-org/react'
import React from 'react'
import { CheckIcon } from '../icons/checkIcon'
import { CrossIcon } from '../icons/crossIcon'
import Link from 'next/link'

interface AccordionMemberInterface {
  fp101: boolean
  fp501: boolean
  fp502: boolean
  sailorBook: boolean
}

interface AccordionMemberProps {
  formStatus?: AccordionMemberInterface
}

const mockAccordionMember: AccordionMemberInterface = {
  fp101: true,
  fp501: true,
  fp502: false,
  sailorBook: false
}

const crewFormsAccordion = [
  {
    name: 'Libreta de embarque',
    code: 'sailorBook',
    link: '/sailorBook'
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
    name: 'formulario 502 - Entrega Materiales',
    code: 'fp502',
    link: '/fp502'
  },
  {
    name: 'capacitaciones',
    code: 'trainings'
  },
  {
    name: 'accidentes',
    code: 'accidentes'
  }
]

export const AccordionMember: React.FC<AccordionMemberProps> = ({
  formStatus = mockAccordionMember
}) => {
  return (
    <>
      <Divider className='mb-6' />
      <div>
        {crewFormsAccordion.map(form => {
          const isFormCompleted =
            formStatus[form.code as keyof AccordionMemberInterface]
          return (
            <div key={form.code} className='mb-4'>
              <div className='flex justify-between '>
                <div className='flex gap-3'>
                  {isFormCompleted ? <CheckIcon /> : <CrossIcon />}
                  <h1>{form.name}</h1>
                </div>
                {isFormCompleted ? (
                  <Button isDisabled>Completo</Button>
                ) : (
                  <Link href={`/crewForms/${form.link}`}>
                    <Button>Completar</Button>
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
