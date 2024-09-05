'use client'
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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ModalObservation } from './modalObservation'

interface previousObservationsInterface {
  fieldName: string
  observation: string
}

export const CommandDelivery = ({incoming = true }) => {
  const { signatures, handleSaveSignature } = useSignModal()
  const [observations, setObservations] = useState([])
  const [isChecked, setIsChecked] = useState<boolean[]>(Array(8).fill(false));
  const [previousObservations, setPreviousObservations] = useState<
    previousObservationsInterface[]
  >([]) // este valor viene de una api, una posible respuesta es [{}]
  const allFieldsChecked = isChecked.every(Boolean);

  async function fetchData() {
    try {
      const res = await axios.get(`/api/get_old_observations`)
      const data = await res.data
      setPreviousObservations(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async () => {
    if (!allFieldsChecked) {
      alert("Todos los campos deben ser aceptados.");
      return;
    }

    try {
      const payload = {
        shipId : 123,
        captainId:  123,
        incoming : true,
        observations,
      };
      await axios.post('/api/submit_delivery', payload);
      alert('Formulario enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  function getObservationByFieldName(fieldName: string): string | boolean {
    const observation = previousObservations.find(
      obs => obs.fieldName === fieldName
    )

    // Si se encuentra, retorna la observación, si no, retorna undefined
    return observation ?? false
  }

  const commandDeliveryFields = [
    'Cubierta',
    'Puente / Comunicaciones',
    'Máquinas',
    'Planta de procesamiento',
    'Sistema de gestión de seguridad SGS',
    'Documentación',
    'Personal',
    'Otras'
  ]

  const commandDeliveryHeaders = [
    'Area del buque',
    'Novedades',
    'Observación',
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
          <p className='mb-4'> Fecha de registro: Fecha de hoy, o preparar botón para modificar</p>
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
          <Table aria-label='Example static collection table w-full' isStriped>
            <TableHeader>
              {commandDeliveryHeaders.map(header => (
                <TableColumn key={header}>{header}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {commandDeliveryFields.map((field, index) => (
                <TableRow key={field}>
                  <TableCell>{field}</TableCell>
                  <TableCell>{'No hay observaciones previas'}</TableCell>
                  <TableCell>
                    <ModalObservation
                      handleObservation={setObservations}
                      observations={observations}
                      field={field}
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
        <CardBody className='flex gap-4'>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'captainIn')}
              title='Capitan entrante'
            />
            <SignatureChecker status={signatures?.captainIn} />
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'captainOut')}
              title='Capitan saliente'
            />
            <SignatureChecker status={signatures?.captainOut} />
          </div>
        </CardBody>
        <CardFooter className=' flex gap-3 justify-end'>
          <Button color='warning'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
