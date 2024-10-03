'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import useGlobalStore from '@/stores/useGlobalStore'
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
import useMotorDeliveryByShip from '@/app/hooks/useMotorDeliveryByShip'

export const MotorDelivery = () => {
  const shipStates = ['Navegando', 'En puerto', 'Retiro de servicio']
  const charges = [
    'Capitan',
    'Jefe de maquinas',
    'Persona designada',
    'Capitan de armamento',
    'Gerente técnico'
  ]
  const commandDeliveryHeaders = [
    'Area del buque',
    'Novedades',
    'Observación',
    'Nueva obsevación',
    'Acepta'
  ]

  const { signatures, handleSaveSignature } = useSignModal()
  const { selectedShip, userData } = useGlobalStore()
  const [isSending, setIsSending] = useState(false)
  const shipOmi = selectedShip?.idOMI
  const { delivery, loadingDelivery, setDelivery, lastCharge } =
    useMotorDeliveryByShip(88888)
  const [formData, setFormData] = useState({
    shipState: '',
    receiptPersonName: '',
    deliveryPersonName: '',
    deliveryPersonCharge: '',
    receiptPersonCharge: ''
    // agregar expire date
  })

  const handleCheckboxChange = (id: number) => {
    setDelivery(prevDelivery =>
      prevDelivery.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    )
  }

  const onSubmit = async () => {
    const allFieldsChecked = delivery.every(
      delivery => delivery.isChecked === true
    )

    const {
      shipState,
      receiptPersonName,
      deliveryPersonName,
      deliveryPersonCharge,
      receiptPersonCharge
    } = formData

    if (!allFieldsChecked) {
      alert('Todos los campos deben ser aceptados.')
      return
    }
    setIsSending(true)
    try {
      const submitData = {
        shipOmi,
        chargedBy: userData.id,
        newComments: delivery.map(item => item.newComment),
        shipState,
        receiptPersonName,
        deliveryPersonName,
        deliveryPersonCharge,
        receiptPersonCharge,
        receiptSign: signatures.receiptSign,
        deliverySign: signatures.deliverySign
      }
      await axios.post('/api/register_motor_delivery', submitData)
      alert('Formulario enviado correctamente')
      setIsSending(false)
    } catch (error) {
      console.log(error)
      alert('Error al enviar el formulario:')
      setIsSending(false)
    }
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
            PC - 201: ENTREGA Y RECEPCION CARGO MÁQUINAS
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form>
        <CardBody>
          <p className='mb-4'> Buque: {selectedShip?.name}</p>
          <p className='mb-4'> Buque OMI: {shipOmi}</p>
          <p className='mb-4'>
            {' '}
            Estado actual del barco: {lastCharge?.ship_state ?? 'Cargando data'}
          </p>
          <Divider />
          <p className='my-4'>
            Durante paradas prolongadas el buque se entregara al Gerente Técnico
            y/o Persona Designada con las novedades correspondientes.
          </p>
          <Divider />
          <p className='my-4'>Nuevo estado del barco</p>
          <Select
            className='mb-4'
            label='Seleccione uno'
            onChange={e =>
              setFormData({ ...formData, shipState: e.target.value })
            }
          >
            {shipStates.map(shipState => (
              <SelectItem key={shipState} value={shipState}>
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
                    {field.oldComments ?? 'No hay observaciones previas'}
                  </TableCell>
                  <TableCell>
                    {field.newComment ?? 'No hay observaciones nuevas'}
                  </TableCell>
                  <TableCell>
                    <ModalObservation
                      handleObservation={setDelivery}
                      field={field.title}
                      fieldId={field.id}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      isSelected={field.isChecked} // Checkbox checked status linked to `isChecked`
                      onChange={() => handleCheckboxChange(field.id)} // Handle change event
                    />{' '}
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
                value={formData.receiptPersonName}
                onChange={e =>
                  setFormData({
                    ...formData,
                    receiptPersonName: e.target.value
                  })
                }
              />
              <Select
                className='w-full md:w-1/2'
                label='Seleccione su cargo'
                onChange={e =>
                  setFormData({
                    ...formData,
                    receiptPersonCharge: e.target.value
                  })
                }
              >
                {charges.map(shipState => (
                  <SelectItem key={shipState} value={shipState}>
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
                value={formData.deliveryPersonName}
                onChange={e =>
                  setFormData({
                    ...formData,
                    deliveryPersonName: e.target.value
                  })
                }
              />
              <Select
                className=' w-full md:w-1/2'
                label='Seleccione su cargo'
                onChange={e =>
                  setFormData({
                    ...formData,
                    deliveryPersonCharge: e.target.value
                  })
                }
              >
                {charges.map(shipState => (
                  <SelectItem key={shipState} value={shipState}>
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
          <Button color='warning' onClick={onSubmit} isLoading={isSending}>
            Enviar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
