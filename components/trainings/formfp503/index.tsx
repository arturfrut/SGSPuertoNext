'use client'
import { CrossIcon } from '@/components/icons/crossIcon'
import { crewListMock } from '@/mocks/crewListMock'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
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
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'

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
          <p className='text-xl'>FP - 503 CAPACITACIÓN</p>
        </div>
      </CardHeader>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <Divider />

        <CardBody>
          <p className='text-xl '>Datos de la empresa</p>
          <p className='mt-4'> Nombre: de Bdd</p>
          <p className='my-4'> Razón social: de Bdd</p>
          <Divider className=' mb-4' />
          <p className='text-xl mb-4'>Tipo de capacitación:</p>
          <RadioGroup >
            <Radio value='Capacitación'>Capacitación</Radio>
            <Radio value='Zafarrancho'>Zafarrancho</Radio>
            <Radio value='san-francisco'>Ejercicio</Radio>
          </RadioGroup>
          <p className='my-4'>Tema tratado:</p>
          <Textarea
            labelPlacement='outside'
            placeholder='Describa el tema aquí'
          />
          <Divider className='my-4' />
          <p className='text-xl mb-4'>Participantes:</p>
          <div className='flex w-full items-center gap-4'>
            <Select label='Seleccione Tripulante' className='w-full my-4'>
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
            <Button size='lg'>Agregar</Button>
          </div>
          <Table aria-label='Example static collection table' isStriped>
            <TableHeader>
              <TableColumn>Tripulante</TableColumn>
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
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className='flex justify-end px-10'>
                      <CrossIcon />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No hay gente en la lista</TableCell>
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
          <Divider className='my-4' />
          <p className='mb-4'> Información adicional</p>
          <Textarea
            labelPlacement='outside'
            placeholder='Escriba aqui su reseña'
          />
          <Divider className=' my-4' />
          <p className='mb-4'>Encargado de dar la capacitación:</p>
          <Select label='Seleccione Tripulante' className='w-full my-4'>
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
          <div className='w-full my-4 md:w-1/2 flex items-center justify-center gap-5'>
            <Button className='w-full'> Firma persona encargada </Button>
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
