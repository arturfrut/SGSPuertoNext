import { useCrewMembersAccordion } from '@/app/hooks/components/useCrewMembersAccordion'
import useGlobalStore, { DocumentData } from '@/stores/useGlobalStore'
import { compressImage } from '@/utils/compressImage'
import { checkDateForChip } from '@/utils/daysUntilExpiration'
import { parseAbsoluteToLocal, ZonedDateTime } from '@internationalized/date'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Accordion,
  AccordionItem,
  DatePicker
} from '@nextui-org/react'
import axios from 'axios'
import { FC, useState } from 'react'

interface ChargeSailorBookModalInterface {
  prevData?: DocumentData
  docType: string
  destination: string
  textDescription: string
}

export const ChargeSailorBookModal: FC<ChargeSailorBookModalInterface> = ({
  prevData,
  docType,
  destination,
  textDescription
}) => {
  const today = parseAbsoluteToLocal(new Date().toISOString())
  const formattedDate = (date: {
    day: { toString: () => string }
    month: { toString: () => string }
    year: any
  }) => {
    const day = date.day.toString().padStart(2, '0')
    const month = date.month.toString().padStart(2, '0')
    const year = date.year

    return `${year}-${month}-${day}`
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { userId, selectedTripulant } = useGlobalStore()
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [file, setFile] = useState(null)
  const [expiration, setExpiration] = useState<ZonedDateTime>(today)
  const onChargeImg = async imgFile => {
    const compressedImage = await compressImage(imgFile)
    setFile(compressedImage)
  }
  const { fetchCrewData } = useCrewMembersAccordion()
  const submitData = async (e: React.FormEvent, onClose) => {
    e.preventDefault()

    if (!file) {
      alert('Debes subir una foto del documento')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('doc_type', docType)
    formData.append('charged_by', userId.toString())
    formData.append('expiration_date', formattedDate(expiration))
    formData.append('doc_type', docType)
    formData.append(
      'sailor_book_number',
      selectedTripulant.sailor_book_number.toString()
    )

    try {
      setWaitingResponse(true)
      const response = await axios.post('/api/upload_image', formData)
      alert('Documento registrado')
      setWaitingResponse(false)
      setFile(null)
      setExpiration(today)
      await fetchCrewData()

      onClose()
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Error al registrar documento')
      setWaitingResponse(false)
    }
  }

  const handleClose = () => {
    onOpenChange()
    setFile(null)
    setExpiration(today)
  }

  console.log('prevData', prevData)

  return (
    <>
      <Button onPress={onOpen}>Cargar imagen</Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='2xl'
      >
        {' '}
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Subir imagenes de: {destination}
              </ModalHeader>
              <ModalBody>
                <Chip
                  color={
                    prevData
                      ? checkDateForChip(prevData.expiration_date).color
                      : 'default'
                  }
                >
                  {prevData
                    ? checkDateForChip(prevData.expiration_date).text
                    : 'Documento sin cargar'}
                </Chip>
                {prevData ? (
                  <div>
                    <p>Datos de la última carga:</p>
                    <p>
                      Fecha de carga:{' '}
                      {new Date(prevData.charged_date).toLocaleDateString()}
                    </p>
                    <p>
                      Próximo vencimiento:{' '}
                      {new Date(prevData.expiration_date).toLocaleDateString()}
                    </p>

                    <p>Páginas subidas al sistema: </p>
                    {prevData.img_url ? (
                      <Accordion>
                        <AccordionItem
                          aria-label={``}
                          title={`último documento subido`}
                        >
                          <img
                            src={prevData.img_url}
                            alt='Documento'
                            width='200'
                            height='200'
                          />
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      'No se Subieron documentos'
                    )}
                  </div>
                ) : (
                  <p>Es la primera vez que se carga este documento</p>
                )}
                <p>{textDescription}</p>
                <DatePicker
                  showMonthAndYearPickers
                  granularity='day'
                  size='lg'
                  label='Vencimiento final'
                  value={expiration}
                  onChange={date => setExpiration(date)}
                  isRequired
                  className='my-4'
                />

                <div className='flex my-4 items-center'>
                  <label className='custom-file-upload'>
                    <input
                      required
                      type='file'
                      accept='image/*'
                      onChange={e => onChargeImg(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                    <span className='bg-[#3f3f46] rounded-[12px] leading-5 p-4 text-white cursor-pointer'>
                      {file === null || file === undefined
                        ? 'Subir imagen página '
                        : 'Cambiar imagen '}
                    </span>
                  </label>
                  {file && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Miniatura documento`}
                      className='w-20 h-20 object-cover ml-4'
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Volver atrás
                </Button>
                <Button
                  isLoading={waitingResponse}
                  color='primary'
                  onClick={e => submitData(e, onClose)}
                >
                  Cargar imágenes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
