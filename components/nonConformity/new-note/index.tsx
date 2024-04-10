'use client'
import ModalFR802 from '@/components/accidentreports/formReports/modalFR802'
import { useWitness } from '@/components/accidentreports/formReports/useWitness'
import { CheckIcon } from '@/components/icons/checkIcon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CrossIcon } from '@/components/icons/crossIcon'
import {
  monthsSelect,
  noteClasification,
  shipOrCompany,
  yesNoSelect
} from '@/constants/strings'
import { crewListMock } from '@/mocks/crewListMock'
import { shipMock } from '@/mocks/shipMock'
import { FR802Values } from '@/types/FR802'
import { getCurrentDateTime } from '@/utils/dateSelector'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'

// TODO Preguntar que es NCN y de donde viene, preguntar si firma puede ir de otra forma, el emisor puede venir por bdd?, preguntar que es PD
// Como se genera NCN?

export const NewNote = (accidentReportData: { ship: any; crewList: any }) => {
  accidentReportData = {
    ship: shipMock,
    crewList: crewListMock
  }

  const { register, handleSubmit, setValue, watch } = useForm<FR802Values>()
  const { handleSelectChange, addWitness, removeWitness, witnessList } =
    useWitness(accidentReportData.crewList, setValue)

  const onSubmit = (data: FR802Values) => {
    console.log(data)
  }

  const handleShipStatus = (e: { target: { value: string } }) => {
    setValue('shipStatus.shipStatus', e.target.value)
  }

  const shipStatusConditional =
    watch('shipStatus.shipStatus') === 'Otras circunstancias'

  const HCValue = watch('HC.HC')

  const handleAccidentTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`accidentType.${e.target.name}`, e.target.checked)
  }

  const handleShipCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`shipCondition.${e.target.name}`, e.target.checked)
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
          <p className='text-xl'>FN-802 NOTA DE NO CONFORMIDAD</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />

        <CardBody>
          <p className='text-xl '>Información básica:</p>
          <p className='mt-4'> NCN: 23</p>
          <div className='md:flex md:align-items md:gap-4 md:my-4'>
            <div className='md:w-1/2'>
              <Input
                className='w-full'
                type='string'
                label='Nombre de Empresa/Buque'
                {...register('accidentDescription.accidentPlace')}
              />
              {/* TODO: Arreglar margin en mobile */}
            </div>
            <RadioGroup
              name='shipStatus'
              onChange={handleShipStatus}
              className='md:w-1/2'
            >
              {shipOrCompany.map(option => (
                <Radio key={`shipOrCompany-${option}`} value={option}>
                  {option}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          <div className='w-full md:flex md:gap-4'>
            <div className='md:w-1/2'>
              <p className='my-2'>Emisor:</p>
              <Input
                className='w-full'
                type='string'
                label='Identidad del Emisor'
                {...register('accidentDescription.accidentPlace')}
              />
            </div>
            <div className='md:w-1/2'>
              <p className='my-2'>Fecha</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                  {...register('accidentDescription.accidentTime.year')}
                />

                <Select
                  label='Mes'
                  value={'Marzo'}
                  {...register('accidentDescription.accidentTime.month')}
                >
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                  {...register('accidentDescription.accidentTime.day')}
                />
              </div>
            </div>
          </div>
          <p className='my-4'>Evidencia:</p>
          <Textarea
            {...register('accidentVerifications')}
            labelPlacement='outside'
            placeholder='Describa el porque de su nota de no conformidad'
          />
          <p className='my-4'>Clasificación:</p>
          <RadioGroup
            name='shipStatus'
            onChange={handleShipStatus}
            className='md:w-1/2'
          >
            {noteClasification.map(option => (
              <Radio key={`shipOrCompany-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          <div className='w-full md:flex md:gap-4'>
            <div className='md:w-1/2'>
              <p className='my-4'>Fecha de entrega PD</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                  {...register('accidentDescription.accidentTime.year')}
                />

                <Select
                  label='Mes'
                  value={'Marzo'}
                  {...register('accidentDescription.accidentTime.month')}
                >
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                  {...register('accidentDescription.accidentTime.day')}
                />
              </div>
            </div>
            <div className='md:w-1/2'>
              <p className='my-4'>Fecha de salida PD</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                  {...register('accidentDescription.accidentTime.year')}
                />

                <Select
                  label='Mes'
                  value={'Marzo'}
                  {...register('accidentDescription.accidentTime.month')}
                >
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                  {...register('accidentDescription.accidentTime.day')}
                />
              </div>
            </div>
          </div>
          <div></div>
          <p className='my-4'>Responsable de la acción correctiva:</p>
          <Input
            className='w-full'
            type='string'
            label='Nombre y apellido del responsable'
            {...register('accidentDescription.accidentPlace')}
          />
          <p className='my-4'>Sector afectado</p>
          <Input
            className='w-full'
            type='string'
            label='Nombre del sector'
            {...register('accidentDescription.accidentPlace')}
          />

          <p className='my-4'>Acción correctiva:</p>
          <Textarea
            {...register('accidentVerifications')}
            labelPlacement='outside'
            placeholder='Describa la acción'
          />
          <div className='md:w-1/2'>
            <p className='my-4'>Fecha implementación prevista</p>
            <div className='flex w-full  flex-nowrap  gap-4'>
              <Input
                type='number'
                max={getCurrentDateTime().year + 2}
                // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                defaultValue={getCurrentDateTime().year}
                label='Año'
                {...register('accidentDescription.accidentTime.year')}
              />

              <Select
                label='Mes'
                value={'Marzo'}
                {...register('accidentDescription.accidentTime.month')}
              >
                {monthsSelect.map(month => (
                  <SelectItem key={`monthsSelectId-${month}`} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
              {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
              {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
              <Input
                type='number'
                max={31}
                label='Día'
                defaultValue={getCurrentDateTime().day}
                {...register('accidentDescription.accidentTime.day')}
              />
            </div>
          </div>
          <p className='my-4'>Cumplimiento</p>
          <div className='md:flex md:items-center md:flex-row-reverse md:gap-4'>
            <div className='md:w-1/2'>
              <RadioGroup
                name='shipStatus'
                onChange={handleShipStatus}
                className='md:w-1/2'
                value='No'
              >
                {/* TODO: ARREGLAR MARGIN */}
                {yesNoSelect.map(option => (
                  <Radio key={`shipOrCompany-${option}`} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            <div className='md:w-1/2'>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                  {...register('accidentDescription.accidentTime.year')}
                />

                <Select
                  label='Mes'
                  value={'Marzo'}
                  {...register('accidentDescription.accidentTime.month')}
                >
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                  {...register('accidentDescription.accidentTime.day')}
                />
              </div>
            </div>
          </div>
          <p className='my-4'>Acción correctiva eficaz?</p>
          <RadioGroup
            name='shipStatus'
            onChange={handleShipStatus}
            className='md:w-1/2'
          >
            {/* TODO: ARREGLAR MARGIN */}
            {yesNoSelect.map(option => (
              <Radio key={`shipOrCompany-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          <p className='my-4'>Observaciones:</p>
          <Textarea
            {...register('accidentVerifications')}
            labelPlacement='outside'
            placeholder='Describa la acción'
          />
        </CardBody>

        <Divider />
        <p>Revisar como poner procesos divisiones y firmas según rol</p>
        <CardBody className='flex gap-4'>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <Button className='w-full'> Firma Capitan </Button>
            <CheckIcon />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <Button className='w-full'> Firma Responsable SGS </Button>
            <ClockIcon />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <Button className='w-full'> Firma Tripulante </Button>
            <CrossIcon />
          </div>
        </CardBody>
        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          <ModalFR802 formData={watch()} />
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
        </CardFooter>
      </form>
    </Card>
  )
}
