'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import Modalfp503 from './TrainingDetailModal'
import { NewTrainingCard } from './newTrainingCard'
import useGlobalStore from '@/stores/useGlobalStore'

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
    <div className='h-full lg:px-6 w-full'>
      <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full'>
          {/* Card Section Top */}
          <div className='flex flex-col gap-5'>
            <div className='flex justify-center w-full gap-5'>
              <NewTrainingCard />
            </div>
            <p>La información de la tabla debe venir de bdd y debe traer toda la data que corresponda al usuario</p>
            <Table
              aria-label='Example static collection table w-full'
              isStriped
            >
              <TableHeader>
                {trainingsTabHeader.map(header => (
                  <TableColumn key={header}>{header}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {trainingsList.length > 0 ? (
                  trainingsList.map((witness, index) => (
                    <TableRow
                      key={index}
                    >
                      <TableCell>24/23/2024</TableCell>
                      <TableCell>Capacitación</TableCell>
                      <TableCell> 24</TableCell>
                      <TableCell>Juan Perez</TableCell>
                      <TableCell className='cursor-pointer'><Modalfp503 formData={undefined} /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No hay gente en la lista</TableCell>

                    <TableCell>
                      <p></p>
                    </TableCell>
                    <TableCell>
                      <p></p>
                    </TableCell>
                    <TableCell>
                      <p></p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
