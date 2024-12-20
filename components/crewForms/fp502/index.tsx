'use client'

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
  TableRow,
  Textarea
} from '@nextui-org/react'
import { useState } from 'react'
import ModalToAddElement from './ModalToAddElement'
import SignModal from '@/components/signModal'
import { SignatureChecker } from '@/components/signatureChecker'
import useSignModal from '@/components/signModal/useSignModal'
import useGlobalStore from '@/stores/useGlobalStore'
import { parseAbsoluteToLocal } from '@internationalized/date'
import useEppByWhitness from '@/app/hooks/useEppByWittness'

export interface ProductInterface {
  product: string
  model: string
  brand: string
  certified: boolean
  amount: string
  date: Date
  crewSigned: boolean
}

export const Fp502 = () => {
  const { selectedTripulant, selectedShip } = useGlobalStore()

  const { signatures, handleSaveSignature } = useSignModal()
  const { eppData, loadingEpp } = useEppByWhitness(
    selectedTripulant.sailor_book_number
  )

  console.log(selectedShip)
  const headers = [
    'Se entrega',
    'Producto',
    'Tipo/Modelo',
    'Marca',
    'Posee certificación',
    'Cantidad',
    'Fecha',
    'Firma del trabajador'
  ]
  function formatDate(date) {
    if (!(date instanceof Date)) return '-';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = String(date.getFullYear()).slice(-2); // Toma los últimos dos dígitos del año
  
    return `${day}/${month}/${year}`;
  }

  return (
    <Card className='w-full px-10 md:py-5'>
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
            FP - 502: CONSTANCIA DE ENTREGA DE ROPA DE TRABAJO Y ELEMENTOS DE
            PROTECCIÓN PERSONAL
          </p>
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <p className='text-xl '>Datos de la empresa</p>
        <p className='my-4'>
          {' '}
          Razón social: de Bdd, no funciona seteo de id de empresa
        </p>
        <p className='my-4'> Cuit: de Bdd</p>
        <p className='my-4'> Dirección: de Bdd</p>
        <p className='my-4'> Localidad:de bdd</p>
        <Divider />
        <p className='text-xl my-4'>Datos del tripulante</p>
        <p className='my-4'> Nombre: {selectedTripulant.name}</p>
        <p className='my-4'>
          {' '}
          Nro de libreta: {selectedTripulant.sailor_book_number}
        </p>
        <p className='my-4'>Rol actual: {selectedTripulant.rol}</p>

        <Divider className='my-4' />
        <CardBody>
          <p className='text-xl my-4'> Lista de elementos recibidos</p>

          <Table isStriped aria-label='Example static collection table'>
            <TableHeader>
              {headers.map((header, index) => (
                <TableColumn key={index}>{header}</TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={'Sin productos agregados'}>
              {eppData?.map((product, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Checkbox isSelected={true}/>
                  </TableCell>
                  <TableCell>{product.product}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                  <Checkbox isSelected={product.certified} />
                  </TableCell>
                  <TableCell>{product.amount}</TableCell>
                  <TableCell>{formatDate(product.date)}</TableCell>
                  <TableCell>
                    <Checkbox isSelected={product.crewSigned} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ModalToAddElement

            tripulantBookNumber={selectedTripulant.sailor_book_number}
          />
        </CardBody>
        <Divider />
        <p className='my-4'> Información adicional</p>
        <Textarea
          labelPlacement='outside'
          placeholder='Escriba aqui su reseña'
        />
        <div className='w-full my-4 md:w-1/2 flex items-center justify-center gap-5'>
          <SignModal
            onSave={(data: any) =>
              handleSaveSignature(data, 'witnessSignature')
            }
            title='FIRMA TRIPULANTE'
          />
          <SignatureChecker status={signatures?.witnessSignature} />
        </div>
      </CardBody>

      <Divider />
      <CardFooter className=' flex gap-3 justify-end'>
        <Button>Enviar</Button>
      </CardFooter>
    </Card>
  )
}
