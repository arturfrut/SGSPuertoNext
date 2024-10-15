'use client'
import AccidentModal from '@/components/accidentreports/accidentModal'
import { AccidentReportCard } from '@/components/accidentreports/accidentReportCard'
import ModalFR802 from '@/components/accidentreports/formReports/modalFR802'
// import { CheckIcon } from "@/components/icons/checkIcon";
// import { CrossIcon } from "@/components/icons/crossIcon";
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import { fc501Themes } from '@/constants/formsLists'
import useGlobalStore from '@/stores/useGlobalStore'
import { generateExpirationDate } from '@/utils/generateExpirationDateUploadImage'
// import { dateGeratorWithFormat } from "@/utils/dateFormat";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
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
import { watch } from 'fs'
import { useState } from 'react'

export const Fp501 = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const { selectedTripulant, userId } = useGlobalStore()
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [needSupervisor, setNeedSupervisor] = useState(false)
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


    const formData = new FormData()
    formData.append('doc_type', 'familiarizationSigned')
    formData.append('charged_by', userId.toString())
    formData.append('expiration_date', generateExpirationDate())
    formData.append(
      'sailor_book_number',
      selectedTripulant.sailor_book_number.toString()
    )
    formData.append('sign', signatures.sailorSign)
    formData.append('special_sign',signatures.specialSign ?? null)
    formData.append('special_sign_name', specialSupervisorName )

    try {
      setWaitingResponse(true)
      const response = await axios.post('/api/upload_image', formData)
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
    <Card className='w-full md:mx-8 p-4 '>
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
        <p className='mb-4'> Nombre del tripulante: Nombre de BDD</p>
        <p className='mb-4'> Libreta de embarque: Nro deBDD</p>
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
        <Button
          className='w-full my-4'
          onClick={() => setNeedSupervisor(!needSupervisor)}
        >
          Presione en caso ser capitán o jefe de máquinas
        </Button>
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
        {needSupervisor && (
          <div>
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
                onSave={(data: any) => handleSaveSignature(data, 'supervisorSign')}
                title='FIRMA SUPERVISOR'
              />
              <SignatureChecker status={signatures?.specialSupervisorSign} />
            </div>
          </div>
        )}
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <SignModal
            onSave={(data: any) => handleSaveSignature(data, 'sailorSign')}
            title='FIRMA TRIPULANTE'
          />
          <SignatureChecker status={signatures?.sailorSign} />
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
    </Card>
  )
}
