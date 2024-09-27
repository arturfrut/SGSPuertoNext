import { TripulationMemberInterface } from '@/stores/useGlobalStore'
import {
  getExpirationStatus
} from '@/utils/daysUntilExpiration'
import { Button, Chip, Divider } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { AlertIcon } from '../icons/alertIcon'
import { CheckIcon } from '../icons/checkIcon'
import { CrossIcon } from '../icons/crossIcon'
import {  ZonedDateTime } from '@internationalized/date'

const crewFormsAccordion = [
  {
    name: 'Libreta de embarque / cédula',
    code: ' ',
    link: '/sailorBook'
  },
  {
    name: 'FC 101 - Control de vencimiento',
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
    name: 'F 502 - Entrega de Elementos de protección personal',
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
export const AccordionMember: React.FC<{
  crewMember: TripulationMemberInterface
}> = ({ crewMember }) => {
  const missingDocs: string[] = []
  const expiringDocs: string[] = []

  const checkExpirationStatus = (date: string | null | undefined ) => {
    if (!date) return 'expired'
    const { days } = getExpirationStatus(date)
    if (days < 0) return 'expired'
    if (days <= 15) return 'alert'
    return 'valid'
  }

  const getSailorBookStatus = () => {
    let alerts = 0
    let errors = 0

    const sailorBookData =
      crewMember.sailorBookData || crewMember.provisory_card

    if (sailorBookData) {
      Object.values(sailorBookData).forEach(date => {
        const status = checkExpirationStatus(date as string)
        if (status === 'expired') errors++
        if (status === 'alert') alerts++
      })
    } else {
      errors++
    }

    if (errors > 0 && alerts > 0) {
      missingDocs.push('Libreta de embarque / cédula')
      expiringDocs.push('Libreta de embarque / cédula')
      return (
        <>
          <CrossIcon /> {errors} <AlertIcon /> {alerts}
        </>
      )
    } else if (errors > 0) {
      missingDocs.push('Libreta de embarque / cédula')
      return (
        <>
          <CrossIcon /> {errors}
        </>
      )
    } else if (alerts > 0) {
      expiringDocs.push('Libreta de embarque / cédula')
      return (
        <>
          <AlertIcon /> {alerts}
        </>
      )
    } else {
      return <CheckIcon />
    }
  }

  const getFC101Status = () => {
    let alerts = 0
    let errors = 0

    if (crewMember.expiration_controls) {
      Object.values(crewMember.expiration_controls).forEach(date => {
        const status = checkExpirationStatus(date)
        if (status === 'expired') errors++
        if (status === 'alert') alerts++
      })
    } else {
      errors++
    }

    if (errors > 0 && alerts > 0) {
      missingDocs.push('FC 101 - Control de vencimiento')
      expiringDocs.push('FC 101 - Control de vencimiento')
      return (
        <div className='align-items'>
          <CrossIcon /> {errors} <AlertIcon /> {alerts}
        </div>
      )
    } else if (errors > 0) {
      missingDocs.push('FC 101 - Control de vencimiento')
      return (
        <>
          <CrossIcon /> <Chip color='danger'>{errors}</Chip>
        </>
      )
    } else if (alerts > 0) {
      expiringDocs.push('FC 101 - Control de vencimiento')
      return (
        <>
          <AlertIcon /> <Chip color='warning'>{alerts}</Chip>
        </>
      )
    } else {
      return <CheckIcon />
    }
  }

  return (
    <>
      <Divider className='mb-6' />
      <div>
        {crewFormsAccordion.map(form => {
          let icon

          switch (form.name) {
            case 'Libreta de embarque / cédula':
              icon = getSailorBookStatus()
              break
            case 'FC 101 - Control de vencimiento':
              icon = getFC101Status()
              break
            case 'FP 101 - Políticas':
              icon = crewMember.politicsSigned ? (
                <CheckIcon />
              ) : (
                missingDocs.push(form.name) || <CrossIcon />
              )
              break
            case 'FP 501 - Familiarización':
              icon = crewMember.familiarizationSigned ? (
                <CheckIcon />
              ) : (
                missingDocs.push(form.name) || <CrossIcon />
              )
              break
            case 'FP 502 - Elementos de protección':
              icon =
                checkExpirationStatus(crewMember.protectionExpiration) ===
                'valid' ? (
                  <CheckIcon />
                ) : checkExpirationStatus(crewMember.protectionExpiration) ===
                  'alert' ? (
                  expiringDocs.push(form.name) || <AlertIcon />
                ) : (
                  missingDocs.push(form.name) || <CrossIcon />
                )
              break
            case 'capacitaciones':
              icon = <span>Sin capacitaciones</span>
              break
            case 'accidentes':
              icon = <span>Sin accidentes</span>
              break
            default:
              icon = <CrossIcon />
          }

          return (
            <div key={form.code} className='mb-4'>
              <div className='flex justify-between'>
                <div className='flex gap-3'>
                  {icon}
                  <h1>{form.name}</h1>
                </div>
                {icon === <CheckIcon /> ? (
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
