'use client'

//  TODO : Calado proa y popa llevan inputs de metros
// Si hay comite firma personal de empresa

import { SignatureChecker } from '@/components/signatureChecker'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import {
  accidentTypes,
  cardinalDirections,
  hydrocarbonsTypes,
  seaCurrentPower,
  seaPower,
  windPower
} from '@/constants/strings'
import useGlobalStore from '@/stores/useGlobalStore'
import { parseAbsoluteToLocal } from '@internationalized/date'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'
import { useFormReport } from './useFormReport'
import WitnessesComponent from './WitnessComponent'

export interface AccidentData {
  accidentType: string[]
  date: string
  place: string
  crewMemberLe: string
  crewMemberLeId: string
  LEId: string
  LEname: string
  whitness: string[]
  whitnessIds: string[]
  shipCondition: string
  caladoProa: string
  caladoPopa: string
  otherCircunstances: string | null
  fondeado: boolean
  windPower: number | null
  windDirection: string | null
  seaPower: number | null
  seaDirection: string | null
  seaCurrentPower: number | null
  seaCurrentDirection: string | null
  seaHeight: number | null
  HC: boolean
  HCtype: string
  HClts: string
  HCActions: string
  verifications: string
  capitanOpinions: string
}

export const FormReports = () => {
  const { handleSubmit, onSubmit } = useFormReport()

  const { tripulation, selectedShip } = useGlobalStore()
  const shipName = selectedShip?.name
  const shipNumber = selectedShip?.idOMI
  const today = parseAbsoluteToLocal(new Date().toISOString())
  const { signatures, handleSaveSignature } = useSignModal()

  const [accidentData, setAccidentData] = useState({
    accidentType: [''],
    date: '',
    place: '',
    crewMemberLe: '',
    crewMemberLeId: '',
    LEId: '',
    LEname: '',
    whitness: [],
    whitnessIds: [],
    shipCondition: '',
    caladoProa: '',
    caladoPopa: '',
    otherCircunstances: '',
    fondeado: false,
    windPower: null,
    windDirection: null,
    seaPower: null,
    seaDirection: null,
    seaCurrentPower: null,
    seaCurrentDirection: null,
    seaHeight: null,
    HC: false,
    HCtype: '',
    HClts: '',
    HCActions: '',
    verifications: '',
    capitanOpinions: '',
    needComite: false
  })

  interface DateValue {
    day: number
    month: number
    year: number
    hour: number
    minute: number
  }
  const formattedDate = (date: DateValue) => {
    const day = date.day.toString().padStart(2, '0')
    const month = date.month.toString().padStart(2, '0')
    const year = date.year
    const hour = date.hour.toString().padStart(2, '0')
    const minute = date.minute.toString().padStart(2, '0')
    return `${year}-${month}-${day}T${hour}:${minute}`
  }

  const handleAccidentTypes = (e: { target: { value: any; checked: any } }) => {
    const { value, checked } = e.target
    setAccidentData(prevData => {
      if (checked) {
        return { ...prevData, accidentType: [...prevData.accidentType, value] }
      } else {
        return {
          ...prevData,
          accidentType: prevData.accidentType.filter(type => type !== value)
        }
      }
    })
  }

  //MARCA ERROR POR LOS NULL
  const handleDateChange = (date: DateValue) => {
    // @ts-ignore

    setAccidentData((prevData: AccidentData) => ({
      ...prevData,
      date: formattedDate(date)
    }))
  }

  const selectLE = (value: number | ChangeEvent<HTMLSelectElement>) => {
    const selectedMember = tripulation.find(
      member => member.sailor_book_number === value
    )
    setAccidentData({
      ...accidentData,
      LEId: String(selectedMember?.sailor_book_number) || '',
      LEname: selectedMember?.name || ''
    })
  }

  const handleSelectChange = (field: string, value: string) => {
    setAccidentData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleHChange = (e: { target: { checked: any } }) => {
    setAccidentData(prevData => ({
      ...prevData,
      HC: e.target.checked
    }))
  }

  const handleComiteChange = (e: { target: { checked: any } }) => {
    setAccidentData(prevData => ({
      ...prevData,
      needComite: e.target.checked
    }))
  }

  const submitData = async () => {
    console.log(accidentData)
    // try {
    //   const submitData = { ...signatures, shipNumber, ...accidentData }
    //   const response = await axios.post('/api/register_accident/', submitData)
    //   console.log('Data submitted:', response.data)
    //   alert('Accidente registrado con éxito')
    // } catch (error) {
    //   alert('Error registrando accidente')
    //   console.error('Error submitting data:', error)
    // }
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
          <p className='text-xl'>
            FR-802 REPORTE DE ACCIDENTE y CUASIACCIDENTE
          </p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />
        <CardBody>
          <div className='flex flex-col md:flex-row md:justify-between md:w-2/4 '>
            <p className='text-xl'>Buque: {shipName}</p>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <p className='text-xl pb-4'>Tipo de Accidente</p>
          <CheckboxGroup className='pb-4'>
            {accidentTypes.map(value => (
              <Checkbox
                key={`accidentTypeId-${value}`}
                value={value}
                onChange={handleAccidentTypes}
                name={value}
              >
                {value}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </CardBody>
        <Divider />
        <CardBody>
          <p className='text-xl pb-4'>Descripción del acontecimiento</p>
          <div className='w-full md:flex md:gap-4'>
            <div className='flex flex-col w-full'>
              <p className='my-2'>Fecha:</p>
              <DatePicker
                hideTimeZone={true}
                hourCycle={24}
                granularity='minute'
                className='max-w-md my-2'
                label='Fecha'
                defaultValue={today}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <p className='my-2 w-full'>Lugar/Posición (QTH):</p>
          <Input
            className='w-full'
            type='string'
            label='Indique lugar'
            value={accidentData.place}
            onChange={e =>
              setAccidentData({ ...accidentData, place: e.target.value })
            }
          />

          <p className='my-2'>Tripulante L.E</p>
          <Select
            label='Seleccione un tripulante de la lista'
            className='w-full'
            onChange={value => selectLE(value)}
          >
            {tripulation.map(member => (
              <SelectItem
                key={member.sailor_book_number}
                value={member.sailor_book_number}
              >
                {member.name}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
        <Divider />
        <WitnessesComponent
          tripulation={tripulation}
          accidentData={accidentData}
          setAccidentData={setAccidentData}
        />
        <Divider />
        <CardBody>
          <p className='text-xl my-4'>Condiciones hidrometeorológicas</p>
          <p className='my-2'>Viento</p>
          <div className='flex gap-4 '>
            <Select
              label='Fuerza'
              onChange={e => handleSelectChange('windPower', e.target.value)}
            >
              {windPower.map(power => (
                <SelectItem key={power} value={power}>
                  {power}
                </SelectItem>
              ))}
            </Select>
            <Select
              label='Dirección'
              onChange={e =>
                handleSelectChange('windDirection', e.target.value)
              }
            >
              {cardinalDirections.map(direction => (
                <SelectItem
                  key={direction}
                  value={direction}
                >
                  {direction}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <p className='my-2'>Mar</p>
            <div className='flex gap-4'>
              <Select
                label='Fuerza'
                onChange={e => handleSelectChange('seaPower', e.target.value)}
              >
                {seaPower.map(power => (
                  <SelectItem key={power} value={power}>
                    {power}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label='Dirección'
                onChange={e =>
                  handleSelectChange('seaDirection', e.target.value)
                }
              >
                {cardinalDirections.map(direction => (
                  <SelectItem
                    key={direction}
                    value={direction}
                  >
                    {direction}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <p className='my-2'>Corriente </p>
          <div className='flex gap-4'>
            <Select
              label='Fuerza'
              onChange={e =>
                handleSelectChange('seaCurrentPower', e.target.value)
              }
            >
              {seaCurrentPower.map(power => (
                <SelectItem key={power} value={power}>
                  {power}
                </SelectItem>
              ))}
            </Select>
            <Select
              label='Dirección'
              onChange={e =>
                handleSelectChange('seaCurrentDirection', e.target.value)
              }
            >
              {cardinalDirections.map(direction => (
                <SelectItem
                  key={direction}
                  value={direction}
                >
                  {direction}
                </SelectItem>
              ))}
            </Select>
          </div>
          <p className='my-4'>Altura de la marea / ola</p>
          <Input
            onChange={e => handleSelectChange('seaHeight', e.target.value)}
            endContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-400 text-small'>Mts</span>
              </div>
            }
            className='w-1/2'
            type='number'
            label='Ingrese altura'
          />
        </CardBody>
        <Divider />
        <CardBody>
          <Checkbox
            className='text-xxl my-4'
            isSelected={accidentData.HC}
            onChange={handleHChange}
          >
            Derrame de hidrocarburos
          </Checkbox>

          {accidentData.HC && (
            <>
              <div className='flex gap-4 my-4'>
                <Select
                  label='Tipo de derrame'
                  onChange={e => handleSelectChange('HCtype', e.target.value)}
                >
                  {hydrocarbonsTypes.map(selection => (
                    <SelectItem
                      key={`hydrocarbonsTypesSelect-${selection}`}
                      value={selection}
                    >
                      {selection}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>Lts</span>
                    </div>
                  }
                  onChange={e => handleSelectChange('HClts', e.target.value)}
                  type='number'
                  label='Cantidad de litros'
                />
              </div>
              <p className='mb-4'>Medidas adoptadas</p>
              <Input
                type='email'
                onChange={e => handleSelectChange('HCActions', e.target.value)}
                label='Describa las medidas que adopto'
              />
            </>
          )}
        </CardBody>
        <Divider />
        <Divider />
        <CardBody>
          <p className='text-xl my-4'>
            Verificaciones realizadas en el acontecimiento
          </p>
          <Textarea
            onChange={e => handleSelectChange('verifications', e.target.value)}
            labelPlacement='outside'
            placeholder='Recuerde detallar el antes durante y después'
          />
        </CardBody>
        <Divider />
        <CardBody>
          <p className='text-xl my-4'>
            Opinión del capitán/compañía sobre las medidas correctivas a aplicar
          </p>
          <Textarea
            onChange={e =>
              handleSelectChange('capitanOpinions', e.target.value)
            }
            labelPlacement='outside'
            placeholder='Describa su opinión aquí'
          />
        </CardBody>
        <Divider />
        <Divider />
        <CardBody>
          <Checkbox
            className='my-4'
            key={'needComite'}
            checked={accidentData.needComite}
            onChange={handleComiteChange}
          >
            Corresponde reunión con el comite
          </Checkbox>
        </CardBody>
        <Divider />
        <CardBody className='flex gap-4'>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'captainSign')}
              title='Firma Capitán'
            />
            <SignatureChecker status={signatures?.captainSign} />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'sgsSign')}
              title='Firma Responsable SGS'
            />
            <SignatureChecker status={signatures?.sgsSign} />
          </div>
          {accidentData.needComite && (
            <div className='w-full md:w-1/2 flex items-center gap-5'>
              <SignModal
                onSave={(data: any) =>
                  handleSaveSignature(data, 'companyResponsableSign')
                }
                title='Firma Responsable Empresa'
              />
              <SignatureChecker status={signatures?.sgsSign} />
            </div>
          )}

          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'witnessSign')}
              title='Firma Tripulante'
            />
            <SignatureChecker status={signatures?.witnessSign} />
          </div>
        </CardBody>
        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          <Button onClick={submitData}>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
