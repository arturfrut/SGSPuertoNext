'use client' 
import CrewMemberCards from './crewMemberCards'
import { NewCrewMemberCard } from './newCrewMemberCard'

export const CrewForms = () => {

  return (
    <div className='h-full lg:px-6 w-full flex justify-center'>
      <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem]  w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full'>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-center w-full gap-5'>
              <NewCrewMemberCard />
            </div>
              <CrewMemberCards />
          </div>
        </div>
      </div>
    </div>
  )
}