'use client'

import { SignatureChecker } from '@/components/signatureChecker'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useState } from 'react'
import ChargeImageModal from './chargeImageModal'
import { SailorBookModal } from './sailorBookModal'

export const SailorBook = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const [sailorBookImg, setSailorBookImg] = useState(null)
  const [renovationImg, setRenovationImg] = useState(null)
  const [medicalCertificationImg, setMedicalCertificationImg] = useState(null)
  const [censeImg, setCenseImg] = useState(null)
  const [stcw, setStcw] = useState(null)

  const id_OMI = 8883339
  const id_captain = 442
  const sailorBookNumber = 123456

  const chargeImages = [
    {
      chargeDate: 'simula ultima carga',
      destination: 'Libreta: Hoja 1 y 2',
      docType: 'sailor_book_first',
      textDescription:
        'Por favor tome una foto en horizontal de las primeras dos páginas de su libreta',
      id_OMI: id_OMI,
      sailorBookNumber,
      captainId: id_captain,
      selectedFile: sailorBookImg,
      setSelectedFile: setSailorBookImg,
      expirationStatus: 'vence en 10 días'
    },
    {
      chargeDate: 'simula ultima carga',
      destination: 'Libreta: Renovaciones',
      docType: 'renovation',
      textDescription:
        'Por favor tome una foto en horizontal de las ultimas páginas de su libreta',
      id_OMI: id_OMI,
      sailorBookNumber,
      captainId: id_captain,
      selectedFile: renovationImg,
      setSelectedFile: setRenovationImg,
      expirationStatus: 'vence en 10 días'
    },
    {
      chargeDate: 'simula ultima carga',
      destination: 'Certificado Médico',
      docType: 'medical_certification',
      textDescription: 'Por favor tome una foto de su certificado médico',
      id_OMI: id_OMI,
      sailorBookNumber,
      captainId: id_captain,
      selectedFile: medicalCertificationImg,
      setSelectedFile: setMedicalCertificationImg,
      expirationStatus: 'vence en 10 días'
    },
    {
      chargeDate: 'simula ultima carga',
      destination: 'Censo',
      docType: 'cense',
      textDescription:
        'Por favor tome una foto en horizontal de los censos en su libreta',
      id_OMI: id_OMI,
      sailorBookNumber,
      captainId: id_captain,
      selectedFile: censeImg,
      setSelectedFile: setCenseImg,
      expirationStatus: 'vence en 10 días'
    },
    {
      chargeDate: 'simula ultima carga',
      destination: 'STCW/95',
      docType: 'stcw',
      textDescription: 'Por favor tome una foto completa del certificado',
      id_OMI: id_OMI,
      sailorBookNumber,
      captainId: id_captain,
      selectedFile: stcw,
      setSelectedFile: setStcw,
      expirationStatus: 'vence en 10 días'
    }
  ]
  const sailorsTabHeader = ['Fecha de carga', 'Estado', 'Sección', '', 'Status']
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
                      <Chip color='danger'>{row.expirationStatus} </Chip>
                    </TableCell>
                    <TableCell>{row.destination}</TableCell>
                    <TableCell className='cursor-pointer'>
                      {/* <ChargeImageModal {...row} /> */}
                      Corregir componente carga imagen
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
