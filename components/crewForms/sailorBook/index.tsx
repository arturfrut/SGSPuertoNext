'use client'

// import { SignatureChecker } from '@/components/signatureChecker'
// import SignModal from '@/components/signModal'
// import useSignModal from '@/components/signModal/useSignModal'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import { SailorBookModal } from './sailorBookModal'
import useGlobalStore from '@/stores/useGlobalStore'
import { ChargeSailorBookModal } from './chargeSailorBookModal'
// import { useState } from 'react'
import { checkDateForChip } from '@/utils/daysUntilExpiration'

export const SailorBook = () => {
  // const { signatures, handleSaveSignature } = useSignModal()
  const { selectedTripulant, tripulation } = useGlobalStore()

  const fullTripulant = tripulation.find(
    sailor => sailor.sailor_book_number === selectedTripulant.sailor_book_number
  )

  const chargeImages = [
    {
      chargeDate:
        fullTripulant?.sailorBookData?.sailor_book_first[0].expiration_date ??
        'Sin fecha cargada',
      destination: 'Libreta: Hoja 1 y 2',
      docType: 'sailor_book_first',
      textDescription:
        'Por favor tome una foto en horizontal de las primeras dos páginas de su libreta',
      chipData: checkDateForChip(fullTripulant?.sailorBookData.sailor_book_first[0].expiration_date)
    },
    {
      chargeDate:
        fullTripulant.sailorBookData?.renovation[0]?.expiration_date ??
        'Sin fecha cargada',
      destination: 'Libreta: Renovaciones',
      docType: 'renovation',
      textDescription:
        'Por favor tome una foto en horizontal de las ultimas páginas de su libreta'
        ,chipData: checkDateForChip(fullTripulant?.sailorBookData?.renovation[0]?.expiration_date)

    },
    {
      chargeDate:
        fullTripulant?.sailorBookData?.medical_certification[0]?.expiration_date ??
        'Sin fecha cargada',
      destination: 'Certificado Médico',
      docType: 'medical_certification',
      textDescription: 'Por favor tome una foto de su certificado médico'
      ,chipData: checkDateForChip(fullTripulant?.sailorBookData?.medical_certification[0]?.expiration_date)

    },
    {
      chargeDate:
        fullTripulant.sailorBookData.cense[0]?.expiration_date ??
        'Sin fecha cargada',
      destination: 'Censo',
      docType: 'cense',
      textDescription:
        'Por favor tome una foto en horizontal de los censos en su libreta'
        ,chipData: checkDateForChip(fullTripulant?.sailorBookData?.cense[0]?.expiration_date)

    },
    {
      chargeDate:
        fullTripulant.sailorBookData.stcw[0]?.expiration_date ??
        'Sin fecha cargada',
      destination: 'STCW/95',
      docType: 'stcw',
      textDescription: 'Por favor tome una foto completa del certificado'
      ,chipData: checkDateForChip(fullTripulant?.sailorBookData?.stcw[0]?.expiration_date)

    }
    
  ]
  const sailorsTabHeader = ['Fecha de carga', 'Estado', 'Sección', '']
  return (
    <div className='h-full lg:px-6 w-full'>
      <SailorBookModal initialOpen={true} />

      <div className='flex justify-center gap-4 xl:gap-6 pt-3 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full'>
        <div className='mt-6 gap-6 flex flex-col w-full justify-center'>
          {/* <div className='flex flex-col'>
            <p className='text-xl'>Carga de imágenes de libreta</p>
          </div> */}
          <div className='flex flex-col gap-5'>
            <Table
              aria-label='Example static collection table w-full'
              isStriped
            >
              <TableHeader>
                {sailorsTabHeader.map(header => (
                  <TableColumn key={header}>{header}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {chargeImages.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.chargeDate}</TableCell>
                    <TableCell>
                      <Chip color={row.chipData.color}>{row.chipData.text} </Chip>
                    </TableCell>
                    <TableCell>{row.destination}</TableCell>
                    <TableCell className='cursor-pointer'>
                      <ChargeSailorBookModal
                        docType={row.docType}
                        destination={row.destination}
                        textDescription={row.textDescription}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className='w-full flex justify-end'>
            {/* <div className='flex items-center gap-5'>
              <SignModal
                onSave={(data: any) => handleSaveSignature(data, 'witnessSign')}
                title='Firma Tripulante'
              />
              <SignatureChecker status={signatures?.witnessSign} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
