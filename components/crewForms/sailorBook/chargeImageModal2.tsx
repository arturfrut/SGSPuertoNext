'use client'
import supabase from '@/lib/supabase'
import { getSupabaseSession } from '@/utils/getSupabaseSession'
import {
  Button,
  Chip,
  DatePicker,
  DateValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import axios from 'axios'
import imageCompression from 'browser-image-compression'
import { useState } from 'react'

interface ChargeImageModalInterface {
  id_OMI: number
  captainId: number
  docType:
    | 'sailor_book_first'
    | 'medical_certification'
    | 'renovation'
    | 'cense'
  sailorBookNumber: string
  selectedFile: File | null
  setSelectedFile: (file: File | null) => void
  expirationStatus: string
  textDescription: string
  destination: string
}

const ChargeImageModal2: React.FC<ChargeImageModalInterface> = ({
  id_OMI,
  captainId,
  docType,
  sailorBookNumber,
  selectedFile,
  setSelectedFile,
  expirationStatus,
  textDescription,
  destination
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [expirationDate, setExpirationDate] = useState<DateValue | null>(null)

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(file, options)
      setSelectedFile(compressedFile)
    } catch (error) {
      console.error('Error al comprimir la imagen:', error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        compressImage(file)
      } else {
        setSelectedFile(file)
      }
    }
  }

  const uploadImage = async (
    event: React.FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => {
    event.preventDefault() // Evita el comportamiento por defecto del formulario

    if (selectedFile && docType && captainId && id_OMI) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('captain_id', String(captainId))
      formData.append('expiration_date', String(expirationDate))
      formData.append('id_OMI', String(id_OMI))
      formData.append('doc_type', docType)
      formData.append('sailor_book_number', sailorBookNumber)
      console.log({
        selectedFile,
        docType,
        id_OMI,
        captainId,
        expirationDate,
        sailorBookNumber
      })
      console.log('formData', formData)
      try {
        const config = await getSupabaseSession()


        // Hacer la solicitud POST con Axios
        const response = await axios.post('/api/upload_image', formData, config)

        alert('Imagen subida con éxito y datos guardados en la base de datos')
        onClose() // Cierra el modal solo si la imagen se sube con éxito
      } catch (error) {
        console.error('Error en la solicitud:', error)
        alert('Hubo un error al enviar la solicitud.')
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.')
    }
  }

  return (
    <>
      <Button onPress={onOpen}>Cargar imagen</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='2xl'
      >
        <ModalContent>
          {onClose => (
            <form onSubmit={event => uploadImage(event, onClose)}>
              <ModalHeader className='flex flex-col gap-1'>
                {destination}
              </ModalHeader>
              <ModalBody>
                <p>{textDescription}</p>
                <Chip> {expirationStatus}</Chip>
                <DatePicker
                  showMonthAndYearPickers
                  size='lg'
                  label='Fecha de vencimiento del documento'
                  value={expirationDate}
                  onChange={setExpirationDate}
                  isRequired
                  className='my-4'
                />
                <input
                  required
                  className='bg-[#3f3f46] rounded-[12px] leading-5 p-4 text-white'
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button type='button' color='danger' onPress={onClose}>
                  Cerrar
                </Button>
                <Button type='submit' color='primary'>
                  Subir imagen / Tomar foto
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ChargeImageModal2
