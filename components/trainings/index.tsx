'use client'

import { NewTrainingCard } from './newTrainingCard'
import TrainingsTable from './TrainingsTable'
import useGlobalStore from '@/stores/useGlobalStore'

export const Trainings = () => {

  const {selectedShip} = useGlobalStore()


  return (
    <div className='h-full lg:px-6 w-full'>
      <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full'>
          {/* Card Section Top */}
          <div className='flex flex-col gap-5'>
            <div className='flex justify-center w-full gap-5'>
              <NewTrainingCard />
            </div>
            <p>
              La información de la tabla debe venir de bdd y debe traer toda la
              data que corresponda al usuario
            </p>
            {selectedShip && <TrainingsTable id_omi={selectedShip.idOMI} />}
          </div>
        </div>
      </div>
    </div>
  )
}
