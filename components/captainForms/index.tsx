'use client'
// TODO: Revisar este use client, se usa por el startTrip

import { useState } from 'react'
import { CardBalance3 } from '../home/card-balance3'
import { CardForm501 } from './CardForm501'
import { ComandReception } from './commandReception'
import { Form502 } from './form502'

export const CaptainForms = () => {
  const [startTrip, setStartTrip] = useState(false)
  return (
    <div className='h-full lg:px-6'>
      <div className='flex justify-center gap-4 xl:gap-6 pt-3  lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full'>
          {/* Card Section Top */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold'>Available Balance</h3>
            <div className='grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full'>
              <ComandReception/>
              <Form502 />
              <CardForm501 />
              <Form502 />
              <h1>
                Card de resumen e ir a tripulación, aca aparece carga de
                libretas, formularios a presentar por el capi y a presentar por
                cada marinero
              </h1>
              <h1>Card de equipos, formularios a llenar, anterior y nuevo</h1>
              <CardBalance3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
