'use client'
import ModalFR802 from '@/components/accidentreports/formReports/modalFR802'
import { ClockIcon } from '@/components/icons/clock-icon'
import { fc101CrewMemberDates } from '@/constants/formsLists'
import { FR802Values } from '@/types/FR802'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { DateSelector } from '../dateSelector'
import { Fc101CaptainForm } from './Fc101Captain'
import SignModal from '../signModal'
import { SignatureChecker } from '../signatureChecker'
import useSignModal from '../signModal/useSignModal'
import useGlobalStore from '@/stores/useGlobalStore'

// TODO Preguntar que es NCN y de donde viene, preguntar si firma puede ir de otra forma, el emisor puede venir por bdd?, preguntar que es PD
// Como se genera NCN?

export const Fc101 = () => {

  const {selectedShip} = useGlobalStore()

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
          <p className='my-4'> Omi: {selectedShip?.idOMI}</p>
          <p className='mb-4'> Buque: {selectedShip?.name}</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Escriba aqui su nombre y  apellido'
          />
          <p>Categoría:</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Ingrese su categoriia'
          />
          <p>L.E.</p>
          <Input
            className=' my-4 w-full'
            type='number'
            label='Ingrese su numero de libreta sin puntos ni guiones'
          />
          <div className='w-full md:grid md:grid-cols-2 md:gap-4 mb-4'>
            {fc101CrewMemberDates.map((element, index) => (
              <DateSelector title={element} key={index} />
            ))}
          </div>
          <p>Efectivo relevo:</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='No se que esto'
            {...register('title')}
          />
          <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
            <Button className='w-full'> Fotos libreta </Button>
            <ClockIcon />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
            <Button className='w-full'> Fotos documento?? </Button>
            <ClockIcon />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
            <Button className='w-full'> FP 501 - sin completar </Button>
            <ClockIcon />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
            <Button className='w-full'> FP 101 - sin completar </Button>
            <ClockIcon />
          </div>
          <Divider />
          {/* <Fc101CaptainForm /> */}
          <p className='text-lg my-4'>Persona designada </p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Escriba el nombre de la persona asignada'
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
        </CardFooter>
      </form>
    </Card>
  )
}
