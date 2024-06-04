'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image
} from '@nextui-org/react'
import { SailorBookModal } from './sailorBookModal'
import ChargeImageModal from './chargeImageModal'
import { SignatureChecker } from '@/components/signatureChecker'
import SignaturePad from 'react-signature-pad-wrapper'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'

export const SailorBook = () => {
  const { signatures, handleSaveSignature } = useSignModal()

  const chargeImages = [
    {
      chargeDate: '22/03/2024',
      destination: 'portada',
      section: 'frontPage',
      text: 'Por favor tome una foto en horizontal de la portada de su libreta'
    },
    {
      chargeDate: '22/03/2024',
      destination: 'pagina 1',
      section: 'pag1',
      text: 'Por favor tome una foto en horizontal de la primer página de su libreta'
    },
    {
      chargeDate: '22/03/2024',
      destination: 'pagina 2',
      section: 'pag2',
      text: 'Por favor tome una foto en horizontal de la segunda página de su libreta'
    }
  ]
  const trainingsTabHeader = ['Fecha de carga', 'Sección', '', 'Status']
  return (
    <div className='h-full lg:px-6 w-full'>
      <SailorBookModal initialOpen={true} />

      <div className='flex justify-center gap-4 xl:gap-6 pt-3 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full justify-center'>

          <div className='flex flex-col'>
            <p className='text-xl'>
              Carga de imágenes de libreta
            </p>
          </div>
          <div className='flex flex-col gap-5'>
            <Table
              aria-label='Example static collection table w-full'
              isStriped
            >
              <TableHeader>
                {trainingsTabHeader.map(header => (
                  <TableColumn key={header}>{header}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {chargeImages.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.chargeDate}</TableCell>
                    <TableCell>{row.destination}</TableCell>
                    <TableCell className='cursor-pointer'>
                      <ChargeImageModal
                        section={row.section}
                        destination={row.destination}
                        text={row.text}
                      />
                    </TableCell>
                    <TableCell>
                      <SignatureChecker status={''} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className='w-full flex justify-end'>
            <div className='flex items-center gap-5'>
              <SignModal
                onSave={(data: any) => handleSaveSignature(data, 'witnessSign')}
                title='Firma Tripulante'
              />
              <SignatureChecker status={signatures?.witnessSign} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
