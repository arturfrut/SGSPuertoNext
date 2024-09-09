'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import { parseAbsoluteToLocal } from '@internationalized/date'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  DatePicker,
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
  Textarea
} from '@nextui-org/react'
import axios from 'axios'

import { useEffect, useState } from 'react'

export const PortControl = () => {
  const [loadingCompany, setLoadingCompany] = useState(true)
  const [shipOptions, setCompanyOptions] = useState([])

  const { signatures, handleSaveSignature } = useSignModal()

  const portGuardPoints = [
    'Sentina Control de Nivel',
    'Tanque Diario de Combustible (Nivel)',
    'Bomba de Sanidad Control de Funcionamiento',
    'Bomba Agua potable Control de Funcionamiento',
    'Control de Cabos de Amarre',
    'Control de planchada',
    'Recorrida general por el Buque',
    'Sistema de control de estanqueidad'
  ]

  async function fetchData() {
    try {
      const res = await axios.get(`/api/get_ships/123`)
      const data = await res.data
      setCompanyOptions(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoadingCompany(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const today = parseAbsoluteToLocal(new Date().toISOString())

  const handleSelectChange = () => {
    console.log('asd')
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
            INSTRUCCIONES DE CONTROL DE GUARDIA EN PUERTO
          </p>
        </div>
      </CardHeader>
      <Divider />
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <CardBody>
        <p className=''>Seleccione barco:</p>
        <Select
          name='ship'
          placeholder='Seleccione buque'
          value={'asd'}
          onChange={handleSelectChange}
          className='my-4 max-w-md'
          isDisabled={loadingCompany}
          aria-label='Empresa'
        >
          {shipOptions.map(ship => (
            <SelectItem key={ship.omi} value={ship.omi}>
              {ship?.ship_name}
            </SelectItem>
          ))}
        </Select>
        <p className=''>Fecha de revisión</p>

        <DatePicker
          hideTimeZone={true}
          hourCycle={24}
          granularity='day'
          className='max-w-md my-2'
          label='Fecha'
          value={today}
          onChange={() => {
            console.log('cascas')
          }}
        />

        <p className='mb-4'> Nombre del tripulante: Nombre de BDD</p>
        <p className='mb-4'> Libreta de embarque: Nro deBDD,puede ser dni</p>
        {/* <p className="mb-4"> Fecha: {dateGeratorWithFormat()}</p> */}
        <Divider />
        <p className='my-4 text-small'>
          * las presentes instrucciones, son obligatorias y de consignas para
          todos aquellos tripulantes que cumplan funciones de guardia en puerto
          a bordo del buque
        </p>
      </CardBody>
      <Divider />
      <Table
        aria-label='Table for port guard points'
        className='w-full'
        isStriped
      >
        <TableHeader>
          <TableColumn>Tema</TableColumn>
          <TableColumn>Cumplimiento</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Cargando data'>
          {portGuardPoints.map((theme, index) => (
            <TableRow key={index}>
              <TableCell>{theme}</TableCell>
              <TableCell>
                <Checkbox />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className='mt-4 mb-2'>Observaciones:</p>
      <Textarea labelPlacement='outside' placeholder='Escriba aqui su reseña' />
      <p className='my-4 text-tiny'>
        * En caso de emergencia ver listas de verificación LE-01, LE-07 y LE-10
      </p>

      <CardBody className='flex gap-4'>
        <div className='w-full md:w-1/2 flex items-center gap-5'>
          <SignModal
            onSave={(data: any) =>
              handleSaveSignature(data, 'guardianSignature')
            }
            title='FIRMA GUARDIA PUERTO'
          />
          <SignatureChecker status={signatures?.guardianSignature} />
        </div>
      </CardBody>
      <CardFooter className=' flex gap-3 justify-end'>
        <Button>Enviar</Button>
      </CardFooter>
      {/* </form> */}
    </Card>
  )
}
