'use client'
import { CheckIcon } from '@/components/icons/checkIcon'
import { CrossIcon } from '@/components/icons/crossIcon'
import {
  accidentTypes,
  cardinalDirections,
  hydrocarbonsTypes,
  monthsSelect,
  seaCurrentPower,
  seaPower,
  shipCondition,
  shipStatusRadios,
  windPower,
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
  Checkbox,
  CheckboxGroup,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import ModalFR802 from './modalFR802'
import { useWitness } from './useWitness'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'

// TODO: validaciones, modal en caso de testigo repetido, faltan firmas digitales, modal para confirmar con data prolija, botón de reset, revisar alerts y componentes unhandled, agregar required y manejar error en caso de ser necesario con react hook forms, separar componente de tabla de testigos

// En modal tener en cuenta que la fecha va unificada, puede no haber testigos, En calado de proa, popa y fondeado va un si o no, en las condiciones meteor va de a pares Ej: Viento: sur magnitud 5, Derrame de hidrocarburos mostrara las otras opciones dependiendo de si es un si o un no

export const FormReports = (accidentReportData: {
  ship: any
  crewList: any
}) => {
  accidentReportData = {
    ship: shipMock,
    crewList: crewListMock
  }

  const { register, handleSubmit, setValue, watch } = useForm<FR802Values>()
  const { handleSelectChange, addWitness, removeWitness, witnessList } =
    useWitness(accidentReportData.crewList, setValue)
    const { signatures, handleSaveSignature } = useSignModal();


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
          <p className='text-xl'>
            FR-802 RREPORTE DE ACCIDENTE y CUASIACCIDENTE
          </p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />
        <CardBody>
          <div className='flex flex-col md:flex-row md:justify-between md:w-2/4 '>
            <p className='text-xl'>
              Buque: {accidentReportData.ship.shipName}{' '}
            </p>
            <p className='text-xl'>
              Nro: {accidentReportData.ship.shipNumber}{' '}
            </p>
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
                {...register(`accidentType.${value}`)}
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
            <div className='md:w-1/2'>
              <p className='my-2'>Fecha</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                  {...register('accidentDescription.accidentTime.year', {
                    required: 'Este campo es requerido'
                  })}
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
              <div>
                <p className='w-1/2 my-2'>Hora</p>
                <div className='flex w-full  flex-nowrap gap-4'>
                  <Input
                    type='number'
                    max={24}
                    label='Hora'
                    {...register('accidentDescription.accidentTime.hour')}
                  />
                  <Input
                    type='number'
                    max={60}
                    label='Minutos'
                    {...register('accidentDescription.accidentTime.hour')}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className='my-2'>Lugar:</p>
          <Input
            className='w-full'
            type='string'
            label='Indique lugar'
            {...register('accidentDescription.accidentPlace', {
              required: 'Este campo es requerido'
            })}
          />

          <p className='my-2'>Tripulante L.E</p>
          <Select
            label='Seleccione un tripulante de la lista'
            className='w-full'
            {...register('accidentDescription.LE')}
          >
            {accidentReportData.crewList.map(
              (member: { id: number; name: string; lastName: string }) => (
                <SelectItem key={member.id} value={member.id}>
                  {`${member.name} ${member.lastName}`}
                </SelectItem>
              )
            )}
          </Select>
        </CardBody>
        <Divider />
        <CardBody>
          <p className='text-xl pb-4'>Testigos:</p>
          <div className='flex w-full items-center gap-4'>
            <Select
              label='Seleccione Tripulante'
              className='w-full my-4'
              onChange={handleSelectChange}
            >
              {accidentReportData.crewList.map(
                (
                  member: { id: number; name: string; lastName: string },
                  index: number
                ) => (
                  <SelectItem key={member.id} value={index}>
                    {`${member.name} ${member.lastName}`}
                  </SelectItem>
                )
              )}
            </Select>
            <Button onClick={addWitness} size='lg'>
              Agregar
            </Button>
          </div>
          <Table aria-label='Example static collection table' isStriped>
            <TableHeader>
              <TableColumn>Nombre</TableColumn>
              <TableColumn className='flex justify-end items-center px-8'>
                Eliminar
              </TableColumn>
            </TableHeader>
            <TableBody>
              {witnessList.witness.length > 0 ? (
                witnessList.witness.map((witness, index) => (
                  <TableRow
                    key={index}
                    className='cursor-pointer'
                    onClick={() => removeWitness(index)}
                  >
                    <TableCell>{witness?.name}</TableCell>
                    <TableCell className='flex justify-end px-10'>
                      <CrossIcon />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No hay testigos</TableCell>
                  <TableCell>
                    <p></p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
        <Divider />
        <CardBody>
          <p className={`text-xl mb-4 `}>Condición del buque</p>
          <RadioGroup name='shipStatus' onChange={handleShipStatus}>
            {shipStatusRadios.map(option => (
              <Radio key={`shipStatusId-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          {shipStatusConditional && (
            <Input
              className='my-4'
              type='text'
              label='Describa la circunstancia'
              {...register('shipStatus.shipStatus')}
            />
          )}
          <CheckboxGroup className={`${!shipStatusConditional && 'mt-2'}`}>
            {shipCondition.map(option => (
              <Checkbox
                key={`shipConditionId-${option}`}
                {...register(`shipCondition.${option}`)}
                onChange={handleShipCondition}
                value={option}
                name={option}
              >
                {option}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </CardBody>
        <Divider />
        <CardBody>
          <p className='text-xl my-4'>Condiciones hidrometeorológicas</p>
          <p className='my-2'>Viento</p>
          <div className='flex gap-4 '>
            <Select label='Fuerza' {...register('weatherStatus.windPower')}>
              {windPower.map(power => (
                <SelectItem key={`windPower-${power}`} value={power}>
                  {power}
                </SelectItem>
              ))}
            </Select>
            <Select
              label='Dirección'
              {...register('weatherStatus.windDirection')}
            >
              {cardinalDirections.map(direction => (
                <SelectItem
                  key={`windDirection-${direction}`}
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
              <Select label='Fuerza' {...register('weatherStatus.seaPower')}>
                {seaPower.map(power => (
                  <SelectItem key={`seaPower-${power}`} value={power}>
                    {power}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label='Dirección'
                {...register('weatherStatus.seaDirection')}
              >
                {cardinalDirections.map(direction => (
                  <SelectItem
                    key={`seaDirection-${direction}`}
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
              {...register('weatherStatus.seaCurrentPower')}
            >
              {seaCurrentPower.map(power => (
                <SelectItem key={`seaCurrentPower-${power}`} value={power}>
                  {power}
                </SelectItem>
              ))}
            </Select>
            <Select
              label='Dirección'
              {...register('weatherStatus.seaCurrentDirection')}
            >
              {cardinalDirections.map(direction => (
                <SelectItem
                  key={`seaCurrentDirection-${direction}`}
                  value={direction}
                >
                  {direction}
                </SelectItem>
              ))}
            </Select>
          </div>
          <p className='my-4'>Altura de la marea</p>
          <Input
            {...register('weatherStatus.tideHeight')}
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
          <p className='text-xl my-4'>
            Derrame de hidrocarburos Radiobutton condicional
          </p>
          <Select
            label='Seleccione una opción'
            className='w-full'
            {...register('HC.HC')} // Registra el Select con react-hook-form
          >
            {yesNoSelect.map(selection => (
              <SelectItem
                key={`hydrocarbonsSelect-${selection}`}
                value={selection}
              >
                {selection}
              </SelectItem>
            ))}
          </Select>
          {HCValue === 'hydrocarbonsSelect-Si' && (
            <>
              <div className='flex gap-4 my-4'>
                <Select label='Tipo de derrame' {...register('HC.HCType')}>
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
                  {...register('HC.HCAmmount')}
                  type='number'
                  label='Cantidad de litros'
                />
              </div>
              <p className='mb-4'>Medidas adoptadas</p>
              <Input
                type='email'
                {...register('HC.HCActions')}
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
            {...register('accidentVerifications')}
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
            {...register('accidentCaptainOpinion')}
            labelPlacement='outside'
            placeholder='Describa su opinión aquí'
          />
        </CardBody>
        <Divider />
        <CardBody className='flex gap-4'>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal onSave={(data: any) => handleSaveSignature(data, 'signature1')} title='Firma Capitán'/>
            <SignatureChecker status={signatures?.signature1} />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <Button className='w-full'> Firma Responsable SGS </Button>
            <CrossIcon />
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
