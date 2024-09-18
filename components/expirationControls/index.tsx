'use client'

// Vencimiento anual se saca sola
// sacar vencimiento anual y poner fecha de emisión
// Balsa no tiene vencimiento anual
// Sacar fecha de subida

import useGlobalStore from '@/stores/useGlobalStore'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalFR802 from '../accidentreports/formReports/modalFR802'
import { SignatureChecker } from '../signatureChecker'
import SignModal from '../signModal'
import useSignModal from '../signModal/useSignModal'
import { ExpirationTable } from './expirationTable'

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
  const { selectedShip, idCaptain } = useGlobalStore()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  console.log(selectedShip?.idOMI)



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
          <p className='mt-4'> Buque: {selectedShip?.name}</p>
          <p className='my-4'> Id OMI: {selectedShip?.idOMI}</p>

          <Button>Actualizar Data</Button>
          <ExpirationTable
            idOmi={selectedShip?.idOMI}
            idCaptain={idCaptain}
          />
        </CardBody>
        <CardFooter className=' flex gap-3 justify-end'></CardFooter>
      </form>
    </Card>
  )
}
