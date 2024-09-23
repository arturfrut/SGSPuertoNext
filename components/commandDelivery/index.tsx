'use client'
import useDeliveryByShip from '@/app/hooks/useDeliveryByShip'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
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
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { ModalObservation } from './modalObservation'

interface previousObservationsInterface {
  fieldName: string
  observation: string
}

export const CommandDelivery = () => {
  const shipStates = ['Navegando', 'En puerto', 'Retiro de servicio']
  const charges = ['Capitan', 'Jefe de maquinas', 'Persona designada']

  const { signatures, handleSaveSignature } = useSignModal()
  const allFieldsChecked = false // isChecked.every(Boolean)
  const { delivery, loadingDelivery, errorDelivery } = useDeliveryByShip(88888)
  const [formData, setFormData] = useState({
    shipState: 'En navegación',
    receiptPerson: '',
    receiptCharge: '',
    deliveryPerson: '',
    deliveryCharge: ''
  })

  const onSubmit = async () => {
    if (!allFieldsChecked) {
      alert('Todos los campos deben ser aceptados.')
      return
    }

    try {
      const payload = {
        shipId: 123,
        captainId: 123
      }
      await axios.post('/api/submit_delivery', payload)
      alert('Formulario enviado correctamente')
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    }
  }

  const commandDeliveryHeaders = [
    'Area del buque',
    'Novedades',
    'Observación',
    'Nueva obsevación',
    'Acepta'
  ]

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
            PC - 201: ENTREGA Y RECEPCION DE COMANDO CAPITAN
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form>
        <CardBody>
          <p className='mb-4'> Nombre del capitán entrante: Nombre de BDD</p>
          <p className='mb-4'> Buque: Buque de prueba</p>
          <p className='mb-4'> Buque OMI: 12313</p>
          <p className='mb-4'>
            {' '}
            Fecha de registro: Fecha de hoy, o preparar botón para modificar
          </p>
          {/* <p className="mb-4"> Fecha: {dateGeratorWithFormat()}</p> */}
          <Divider />
          <p className='my-4'>
            Las presentes instrucciones, son obligatorias para todos aquellos
            nuevos tripulantes de las embarcaciones de la compañía, y las mismas
            deben ser cumplimentadas obligatoriamente por cada uno de ellos.
          </p>
          <Divider />
          <p className='my-4'>Nuevo estado del barco</p>
          <Select className='mb-4' label='Seleccione uno'>
            {shipStates.map(shipState => (
              <SelectItem
                key={shipState}
                value={shipState}
                onClick={e =>
                  setFormData({ ...formData, shipState: e.target.value })
                }
              >
                {shipState}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
        <Divider />

        <CardBody>
          <Table aria-label='Example static collection table w-full' isStriped>
            <TableHeader>
              {commandDeliveryHeaders.map(header => (
                <TableColumn key={header}>{header}</TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent='Cargando data'>
              {delivery.map((field, i) => (
                <TableRow key={field.title}>
                  <TableCell>{field.title}</TableCell>
                  <TableCell className='text-gray-400'>
                    {'No hay observaciones previas'}
                  </TableCell>
                  <TableCell>{'No hay observaciones nuevas'}</TableCell>
                  <TableCell>
                    <ModalObservation
                      handleObservation={() =>
                        console.log(
                          'ACA VA FUNCIÓN PARA SETEAR NUEVA OBSERVACIÓN'
                        )
                      }
                      field={field.title}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
        {!loadingDelivery && (
          <>
            <Divider />
            <CardBody className='flex gap-4'>
              <p>Persona que recibe el barco</p>
              <Input
                className='w-full md:w-1/2'
                placeholder={'Ingrese su nombre'}
                value={formData.delivery}
                onChange={e =>
                  setFormData({ ...formData, shipState: e.target.value })
                }
              />
              <Select className='w-full md:w-1/2' label='Seleccione su cargo'>
                {charges.map(shipState => (
                  <SelectItem
                    key={shipState}
                    value={shipState}
                    onClick={e =>
                      setFormData({ ...formData, shipState: e.target.value })
                    }
                  >
                    {shipState}
                  </SelectItem>
                ))}
              </Select>
              <div className='w-full md:w-1/2 flex items-center gap-5'>
                <SignModal
                  onSave={(data: any) =>
                    handleSaveSignature(data, 'receiptSign')
                  }
                  title='Persona entrante'
                />
                <SignatureChecker status={signatures?.receiptSign} />
              </div>
              <Divider />
              <p>Persona que entrega el barco</p>

              <Input
                className='w-full md:w-1/2'
                placeholder={'Ingrese su nombre'}
                value={formData.receiptPerson}
                onChange={e =>
                  setFormData({ ...formData, shipState: e.target.value })
                }
              />
              <Select className=' w-full md:w-1/2' label='Seleccione su cargo'>
                {charges.map(shipState => (
                  <SelectItem
                    key={shipState}
                    value={shipState}
                    onClick={e =>
                      setFormData({ ...formData, shipState: e.target.value })
                    }
                  >
                    {shipState}
                  </SelectItem>
                ))}
              </Select>
              <div className='w-full md:w-1/2 flex items-center gap-5'>
                <SignModal
                  onSave={(data: any) =>
                    handleSaveSignature(data, 'deliverySign')
                  }
                  title='Persona que entrega'
                />
                <SignatureChecker status={signatures?.deliverySign} />
              </div>
            </CardBody>
          </>
        )}

        <CardFooter className=' flex gap-3 justify-end'>
          <Button color='warning'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
