'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import useGlobalStore from '@/stores/useGlobalStore'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Textarea
} from '@nextui-org/react'

export const NewOrder = () => {
  const orderStatus = [
    'Paso 1: Creación de la petición',
    'Paso 2: Recepción',
    'Paso 3: Confirmación '
  ]
  const data = {
    status: 'Creación de la nota'
  }
  const { selectedShip } = useGlobalStore()

  const { signatures, handleSaveSignature } = useSignModal()

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
          <p className='text-xl'>FS-106 PEDIDO REPARACION MATERIALES</p>
        </div>
      </CardHeader>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <Divider />
        <CardBody>
          <div className='flex flex-col flex-wrap gap-4 w-full'>
            <Breadcrumbs radius={'sm'} variant='solid' size='lg'>
              {orderStatus.map((item, index) => (
                <BreadcrumbItem key={index} isCurrent={data.status === item}>
                  {item}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <Card className='p-2'>
            <p className=''> Buque: {selectedShip?.name}</p>
            <p> O.M.I.: {selectedShip?.idOMI}</p>
            <p className='mb-4'> Compañía: {selectedShip?.company}</p>
            <Divider />
            <p className='text-xl m-4 '>Paso 1 : Petición</p>
            <RadioGroup color='secondary' defaultValue='repairation'>
              <Radio value='reparation'>Solicitud de reparación</Radio>
              <Radio value='materials'>Solicitud de materiales</Radio>
            </RadioGroup>
            <Checkbox className='mt-2'>
              URGENTE, AFECTA LA SEGURIDAD DE NAVEGACIÓN
            </Checkbox>

            <div className='md:flex md:align-items md:gap-4 '>
              <div className='md:w-1/2 my-4'>
                <p className='my-2'>Fecha</p>
                <DatePicker
                  hideTimeZone={true}
                  hourCycle={24}
                  granularity='day'
                  className='max-w-md'
                  label='Date'
                />
              </div>
              <div className='md:w-1/2 my-4'>
                <p className='my-2'>Marea Nº</p>

                <Input
                  className='w-full'
                  type='string'
                  label='Ingrese Nº de marea'
                  // {...register("accidentDescription.accidentPlace")}
                />
              </div>
            </div>

            <CheckboxGroup label='Seleccione zona' className='my-4'>
              <Checkbox value='maquinas'>Máquinas</Checkbox>
              <Checkbox value='cubierta'>Cubierta</Checkbox>
              <Checkbox value='puente'>Puente</Checkbox>
            </CheckboxGroup>

            <div className='w-full md:flex md:gap-4 '>
              <p className='my-2'>Equipo / Sistema:</p>
              <Input
                className='w-full'
                type='string'
                label='Ingrese equipo o sistema'
                // {...register("accidentDescription.accidentPlace")}
              />
            </div>
            <p className='text-xl m-4 '>Material / Solicitud de reparación:</p>

            <p className='my-4'>Descripción:</p>
            <Textarea
              // {...register("accidentVerifications")}
              labelPlacement='outside'
              placeholder='Describa el porque de su nota de no conformidad'
            />

            <div className='md:flex md:align-items md:gap-4 '>
              <div className='md:w-1/2 my-4'>
                <p className='my-2'>Unidad</p>
                <Input
                  className='w-full'
                  type='string'
                  label='Ingrese Unidad'
                  // {...register("accidentDescription.accidentPlace")}
                />
              </div>
              <div className='md:w-1/2 my-4'>
                <p className='my-2'>Cantidad</p>

                <Input
                  className='w-full'
                  type='string'
                  label='Ingrese Cantidad'
                  // {...register("accidentDescription.accidentPlace")}
                />
              </div>
            </div>
            <div className='md:flex md:align-items md:gap-4 '>
              <div className='md:w-1/2 my-4'>
                <p className='my-2'>U / N</p>
                <Input
                  className='w-full'
                  type='string'
                  label='Ingrese Unidad'
                  // {...register("accidentDescription.accidentPlace")}
                />
              </div>
              <div className='md:w-1/2 my-4'>
                <p className='my-2'>Cumplido</p>

                <Input
                  className='w-full'
                  type='string'
                  label='Ingrese Cantidad'
                  // {...register("accidentDescription.accidentPlace")}
                />
              </div>
            </div>
            <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
              <SignModal
                onSave={(data: any) =>
                  handleSaveSignature(data, 'issuerSignature')
                }
                title='FIRMA DEL EMISOR'
              />
              <SignatureChecker status={signatures?.issuerSignature} />{' '}
            </div>
            <Button className='md:w-1/2 mb-4'>Enviar </Button>
          </Card>
          <Divider className='my-4' />
          <Card>
            <p className='text-xl mt-4'>Paso 2: Recepción</p>

            <p className='my-4'>Aceptar o rechazar pedido?</p>
            <RadioGroup color='secondary' defaultValue='refuse'>
              <Radio value='accept'>Aceptar</Radio>
              <Radio value='refuse'>Rechazar</Radio>
            </RadioGroup>

            <p className='my-4'>Argumente el porque del rechazo:</p>
            <Textarea
              // {...register("accidentVerifications")}
              labelPlacement='outside'
              placeholder='Describa el porque de rechazo'
            />
            <Button className='md:w-1/2 my-4'>Enviar </Button>
          </Card>
          <Card>
            <p className='text-xl mt-4'>Paso 2: Recepción</p>

            <p className='my-4'>Aceptar o rechazar pedido?</p>
            <RadioGroup color='secondary' defaultValue='refuse'>
              <Radio value='accept'>Aceptar</Radio>
              <Radio value='refuse'>Rechazar</Radio>
            </RadioGroup>

            <p className='my-4'>Argumente el porque del rechazo:</p>
            <Textarea
              // {...register("accidentVerifications")}
              labelPlacement='outside'
              placeholder='Describa el porque de rechazo'
            />
            <Button className='md:w-1/2 my-4'>Enviar </Button>
          </Card>
          <Divider />
          <Card>
            <p className='text-xl mt-4'>Paso 3: Confirmación</p>

            <Checkbox className='mt-2'>
              Agregar registro a historial de mantenimiento
            </Checkbox>

            <p className='my-4'>Se pudo terminar el proceso correctamente?</p>
            <RadioGroup color='secondary' defaultValue='no'>
              <Radio value='yes'>Si</Radio>
              <Radio value='no'>No</Radio>
            </RadioGroup>

            <p className='my-4'>Por que no se pudo terminar?:</p>
            <Textarea
              // {...register("accidentVerifications")}
              labelPlacement='outside'
              placeholder='Describa el porque de rechazo'
            />
            <p className='my-4'>Observaciones:</p>
            <Textarea
              // {...register("accidentVerifications")}
              labelPlacement='outside'
              placeholder='Describa el porque de rechazo'
            />
            <Button className='md:w-1/2 my-4'>Agregar imagen</Button>
            <Button className='md:w-1/2 my-4'>Enviar </Button>
          </Card>
        </CardBody>

        {/* <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          <Button>Coso</Button>

        </CardFooter> */}
      </form>
    </Card>
  )
}
