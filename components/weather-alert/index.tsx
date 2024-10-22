'use client'

import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import Modalfp503 from './TrainingDetailModal'
import { NewWeaterAlertCard } from './newWeaterAlertCard'
import useGlobalStore from '@/stores/useGlobalStore'
import { NonConformityCard } from '../nonConformity/nonConformityCard'
import { NonConformityTable } from '../nonConformity/nonConformityTable'
import { WeatherReportTable } from './watherAlertTable'

export const WeatherAlert = () => {
  const { tripulation } = useGlobalStore()

  const trainingsList = tripulation

  const trainingsTabHeader = [
    'Fecha',
    'Tipo',
    'Participantes',
    'Encargado',
    'Ver'
  ]
  return (
    <Card className='w-full  md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>Alertas climáticas</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <NewWeaterAlertCard />
        <WeatherReportTable idOmi={123} />
      </CardBody>
    </Card>
  )
}
