'use client'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input
} from '@nextui-org/react'
import React, { useState } from 'react'
import { Fc101CaptainForm } from '../fc101/Fc101Captain'
import SignModal from '../signModal'
import { SignatureChecker } from '../signatureChecker'
import useSignModal from '../signModal/useSignModal'
import { useForm } from 'react-hook-form'
import { DateValue } from '@internationalized/date'
import ModalFR802 from '../accidentreports/formReports/modalFR802'
import { convertToDate } from '@/utils/dateFormat'

export const ExpirationControls = () => {
 
 

  type FN801Values = {
    title: string
    ncn?: number
    status: string
    emisorName: string
    emisorType: 'buque' | 'empresa'
    shipCcompanyName: string
    noteCreationDate: {
      day: string
      month: string
      year: string
    }
    evidence: string
    emisorSignCreation?: {
      hasSsigned: true
      date: string
    }
  }
  const { signatures, handleSaveSignature } = useSignModal()
  const { register, handleSubmit, watch } = useForm<FN801Values>()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const [dates, setDates] = useState<{
    [key: string]: {
      annualExpiration: DateValue | null
      indicatedExpiration: DateValue | null
      finalExpiration: DateValue | null
    }
  }>({})

  const handleDateChange =
    (id: string, key: keyof (typeof dates)[keyof typeof dates]) =>
    (date: DateValue | null) => {
      console.log('date',date)
      date && console.log('formatedDate', convertToDate(date))
      setDates(prevDates => ({
        ...prevDates,
        [id]: {
          ...prevDates[id],
          [key]: date
        }
      }))
    }


  return (
    <Card className='w-full md:w-2/3 md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>FC 101 - Control de vencimiento</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <p className='text-xl '>Ingreso de tripulante: Juan Perez </p>
          <p className='my-4'> NCN: 1</p>
          <p className='mb-4'> Buque:asdasd</p>

          <Fc101CaptainForm dates={dates} handleDateChange={handleDateChange} />
          <p className='text-lg my-4'>Persona designada </p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Escriba el nombre de la persona asignada'
            {...register('emisorName')}
          />
        </CardBody>
        <CardBody className='flex gap-4'>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'captainSign')}
              title='FIRMA CAPITÁN'
            />
            <SignatureChecker status={signatures?.captainSign} />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'sgsSign')}
              title='FIRMA RESPONSABLE SGS'
            />
            <SignatureChecker status={signatures?.sgsSign} />
          </div>
        </CardBody>
        <CardFooter className=' flex gap-3 justify-end'>
          <ModalFR802 formData={watch()} />
          <button onClick={()=> console.log({watch:watch(),dates})}>COSO</button>
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
        </CardFooter>
      </form>
    </Card>
  )
}
