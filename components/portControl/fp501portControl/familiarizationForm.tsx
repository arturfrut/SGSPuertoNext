import { SignatureChecker } from '@/components/signatureChecker'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { fc501Themes } from '@/constants/formsLists'
import useGlobalStore from '@/stores/useGlobalStore'
import { generateExpirationDate } from '@/utils/generateExpirationDateUploadImage'
import {
  CardHeader,
  Divider,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Input,
  CardFooter,
  Image
} from '@nextui-org/react'
import axios from 'axios'
import React, { useState } from 'react'

export const FamiliarizationForm = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const {  userData,selectedShip } = useGlobalStore()
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [specialSupervisorName, setSpecialSupervisorName] = useState('')
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(fc501Themes.length).fill(false)
  )
  const handleCheckboxChange = (index: number) => {
    const updatedCheckedStates = [...checkedStates]
    updatedCheckedStates[index] = !updatedCheckedStates[index]
    setCheckedStates(updatedCheckedStates)
  }
  const areAllChecked = () => {
    return checkedStates.every(state => state === true)
  }

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!areAllChecked()) {
      alert('Debes cumplir todos los temas')
      return
    }
    if (!signatures) {
      alert('Debes firmar el documento')
      return
    }

    const apiData = {
      chargedBy: userData.id,
      guardName: userData.name,
      guardSign: signatures.guardSign,
      expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      shipIdOmi: selectedShip.idOMI,
      docType: 'fp501',
      supervisorSign: signatures.specialSign,
      supervisorName: specialSupervisorName
    }


    try {
      setWaitingResponse(true)
      const response = await axios.post('/api/register_guard_101', apiData)
      alert('Documento registrado')
      setWaitingResponse(false)
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Error al registrar documento')
      setWaitingResponse(false)
    }
  }
  const familiarizationTableHeaders = ['Tema', 'Cumplimiento']

  return (
    <>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>
            FP - 501: Instrucciones de familiarización para tripulantes
          </p>
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <p className='mb-4'> Nombre del tripulante: {userData.name}</p>
        {/* <p className="mb-4"> Fecha: {dateGeratorWithFormat()}</p> */}
        <Divider />
        <p className='my-4'>
          Las presentes instrucciones, son obligatorias para todos aquellos
          nuevos tripulantes de las embarcaciones de la compañía, y las mismas
          deben ser cumplimentadas obligatoriamente por cada uno de ellos.
        </p>
      </CardBody>

      <Divider />
      <CardBody>
        <Table
          aria-label='Example static collection table w-full'
          isStriped
          className='my-4'
        >
          <TableHeader>
            {familiarizationTableHeaders.map(header => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {fc501Themes?.map((element, index) => (
              <TableRow key={index}>
                <TableCell>{element}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={checkedStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />{' '}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <CardBody className='flex gap-4'>
        <p>Nombre de la persona que supervisa:</p>
        <Input
          className='my-4'
          label={'Nombre del supervisor'}
          type='text'
          value={specialSupervisorName}
          onChange={e => setSpecialSupervisorName(e.target.value)}
        />
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <SignModal
            onSave={(data: any) => handleSaveSignature(data, 'specialSign')}
            title='FIRMA SUPERVISOR'
          />
          <SignatureChecker status={signatures?.specialSign} />
        </div>

        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <SignModal
            onSave={(data: any) => handleSaveSignature(data, 'guardSign')}
            title='FIRMA GUARDIA'
          />
          <SignatureChecker status={signatures?.guardSign} />
        </div>
      </CardBody>

      <CardFooter className='flex justify-end'>
        <Button
          onClick={submitData}
          isLoading={waitingResponse}
          className=' bg-warning-400 text-black'
        >
          Enviar formulario
        </Button>
      </CardFooter>
    </>
  )
}
