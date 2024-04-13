'use client'
import ModalFR802 from '@/components/accidentreports/formReports/modalFR802'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CrossIcon } from '@/components/icons/crossIcon'
import {
  monthsSelect,
  noteClasification,
  shipOrCompany,
  yesNoSelect
} from '@/constants/strings'
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

export const Fc101 = (data: { status: string; ncn: number }) => {
  const dataMock = {
    dataAnterior: 'Viene de bdd de una nota creada anteriormente',
    status: 'Creación de la nota',
    ncn: 23
  }
  data = dataMock

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
    incidentClasification: 'Grave' | 'Moderado'
    PDDeliveryDate: {
      day: string
      month: string
      year: string
    }
    PDOutDate: {
      day: string
      month: string
      year: string
    }
    emisorSignReception: {
      hasSsigned: true
      date: string
    }
    responsibleName: string
    afectedZone: string
    correctiveAction: string
    ActionOutDate: {
      day: string
      month: string
      year: string
    }
    ActionCumpliment: {
      day: string
      month: string
      year: string
    }
    observations: string
    endNoteSign: {
      hasSsigned: true
      date: string
    }
  }

  const { register, handleSubmit, setValue, watch } = useForm<FN801Values>()

  const onSubmit = (data: FR802Values) => {
    console.log(data)
  }

  const handleShipStatus = (e: { target: { value: string } }) => {
    setValue('shipStatus.shipStatus', e.target.value)
  }

  const handleShipOrCompany = (e: {
    target: { value: 'buque' | 'empresa' }
  }) => {
    setValue('emisorType', e.target.value)
  }

  const shipStatusConditional =
    watch('shipStatus.shipStatus') === 'Otras circunstancias'

  const HCValue = watch('HC.HC')

  const handleAccidentTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`accidentType.${e.target.name}`, e.target.checked)
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
          <p className='text-xl '>Ingreso de tripulantte</p>
          <p className='my-4'> NCN: {data.ncn}</p>
          <p className='mb-4'> Buque: {data.ncn}</p>
          <p>Apellido y nombre</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Escriba aqui su nombre y  apellido'
            {...register('title')}
          />{' '}
          <p>Categoría:</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Ingrese su categoriia'
            {...register('title')}
          />{' '}
          <p>L.E.</p>
          <Input
            className=' my-4 w-full'
            type='number'
            label='Ingrese su numero de libreta sin puntos ni guiones'
            {...register('title')}
          />{' '}
          <div className='w-full md:flex md:gap-4 mb-4'>
            <div className='md:w-1/2'>
              <p className='my-4'>Fecha de nacimiento</p>
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
              <p className='my-4'>Vencimiento LE CE</p>
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
          <div className='w-full md:flex md:gap-4 mb-4'>
            <div className='md:w-1/2'>
              <p className='my-4'>Vencimiento Rec médico</p>
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
              <p className='my-4'>STCW 95</p>
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
          <p>Efectivo relevo:</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='No se que esto'
            {...register('title')}
          />{' '}
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
          <p className='my-4 text-xl'>C.D.C.:</p>
          <div className='w-full md:flex md:gap-4 mb-4'>
            <div className='md:w-1/2'>
              <p className='my-4'>Número</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Número'
                  {...register('accidentDescription.accidentTime.year')}
                />
              </div>
            </div>
            <div className='md:w-1/2'>
              <p className='my-4'>Vencimiento Anual</p>
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

          <div className='w-full md:flex md:gap-4 mb-4'>
            <div className='md:w-1/2'>
              <p className='my-4'>Vencimiento Indicado</p>
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
              <p className='my-4'>Vencimiento final</p>
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
          <div className='w-full md:w-1/2 flex items-center gap-5 mb-4'>
            <Button className='w-full'> Imagen de evidencia - sin cargar</Button>
            <ClockIcon />
          </div>

          <Divider />


          <p className='my-4'>Nombre:</p>
          <div className='md:flex md:align-items md:gap-4 '>
            <div className='md:w-1/2'>
              <Input
                className='w-full'
                type='string'
                label='Nombre de Empresa/Buque'
                {...register('shipCcompanyName')}
              />
              {/* TODO: Arreglar margin en mobile */}
            </div>
            <RadioGroup
              name='shipStatus'
              onChange={handleShipOrCompany}
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
          <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
            <Button className='w-full'> Firma del emisor </Button>
            <CrossIcon />
          </div>
          <Button className='md:w-1/2 mb-4'>Enviar </Button>
          <Divider />
          <p className='text-xl mt-4'>Recepción</p>
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
          <div className='w-full md:flex md:gap-4 mb-4'>
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
          <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
            <Button className='w-full'> Firma del emisor </Button>
            <CrossIcon />
          </div>
          <Button className='md:w-1/2 mb-4'>Enviar </Button>
          <Divider />
          <p className='text-xl mt-4'>Acción:</p>
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
          <div className='md:flex md:gap-5'>
            <div className='w-full md:w-1/2 flex items-center gap-5'>
              <Button className='w-full my-4'>
                {' '}
                Firma Responsable de la A.C.{' '}
              </Button>
              <ClockIcon />
            </div>
            <div className='w-full md:w-1/2 flex items-center gap-5'>
              <Button className='w-full'> Firma Responsable SGS </Button>
              <ClockIcon />
            </div>
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
