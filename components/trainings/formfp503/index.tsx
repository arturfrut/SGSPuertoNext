'use client'
import ModalToAddElement from '@/components/crewForms/fp502/ModalToAddElement'
import { CrossIcon } from '@/components/icons/crossIcon'
import { crewListMock } from '@/mocks/crewListMock'
import { FR802Values } from '@/types/FR802'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const Formfp503 = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [products, setProduct] = useState([
    {
      product: 'Protector Facial',
      model: 'Modelo1',
      brand: 'Marca1',
      certified: true,
      amount: 50,
      date: '2024-04-17',
      crewSign: false,
      id: 1
    },
    {
      product: 'Protector auditivo',
      model: 'Modelo2',
      brand: 'Marca2',
      certified: false,
      amount: 30,
      date: '2024-04-17',
      crewSign: true,
      id: 2
    },
    {
      product: 'Zapato de seguridad',
      model: 'Modelo3',
      brand: 'Marca3',
      certified: true,
      amount: 100,
      date: '2024-04-17',
      crewSign: false,
      id: 3
    },
    {
      product: 'Casco',
      model: 'Modelo4',
      brand: 'Marca4',
      certified: true,
      amount: 80,
      date: '2024-04-17',
      crewSign: true,
      id: 4
    },
    {
      product: 'Chaleco salvavidas',
      model: 'Modelo5',
      brand: 'Marca5',
      certified: false,
      amount: 20,
      date: '2024-04-17',
      crewSign: false,
      id: 5
    },
    {
      product: 'Faja lumbar',
      model: 'Modelo6',
      brand: 'Marca6',
      certified: true,
      amount: 40,
      date: '2024-04-17',
      crewSign: true,
      id: 6
    },
    {
      product: 'Guantes',
      model: 'Modelo7',
      brand: 'Marca7',
      certified: true,
      amount: 60,
      date: '2024-04-17',
      crewSign: false,
      id: 7
    }
  ])

  const crewList = crewListMock

  const headers = ['Tripulante', 'Firma', 'Comprendió']

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
            FP - 503  CAPACITACIÓN
          </p>
        </div>
      </CardHeader>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <Divider />

        <CardBody>
          <p className='text-xl '>Datos de la empresa</p>
          <p className='my-4'> Razón social: de Bdd</p>
          <Divider className=' mb-4'/>
          <p className='my-4'> Razón social: de Bdd</p>

          <Textarea
            labelPlacement='outside'
            placeholder='Escriba aqui su reseña'
          />

          <Divider className='my-4' />

          <CardBody>
          <p className='text-xl pb-4'>Testigos:</p>
          <div className='flex w-full items-center gap-4'>
            <Select
              label='Seleccione Tripulante'
              className='w-full my-4'
            >
              {crewList.map(
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
            {/* <Button onClick={addWitness} size='lg'> */}
            <Button size='lg'>
              Agregar
            </Button>
          </div>
          <Table aria-label='Example static collection table' isStriped>
            <TableHeader>
              <TableColumn>Tripulante</TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Comprendió</TableColumn>
              <TableColumn className='flex justify-end items-center px-8'>
                Eliminar
              </TableColumn>
            </TableHeader>
            <TableBody>
              {crewList.length > 0 ? (
                crewList.map((witness, index) => (
              // {witnessList.witness.length > 0 ? (
              //   witnessList.witness.map((witness, index) => (
                  <TableRow
                    key={index}
                    className='cursor-pointer'
                    // onClick={() => removeWitness(index)}
                  >
                    <TableCell>{witness?.name}</TableCell>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell><Checkbox /></TableCell>
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
                  <TableCell>
                    <p></p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
          <Divider />
          <p className='my-4'> Información adicional</p>
          <Textarea
            labelPlacement='outside'
            placeholder='Escriba aqui su reseña'
          />
          <div className='w-full my-4 md:w-1/2 flex items-center justify-center gap-5'>
            <Button className='w-full'> Firma Tripulante </Button>
            <CrossIcon />
          </div>
        </CardBody>

        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
          <Button>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
