'use client'

import supabase from '@/lib/supabase'
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Chip,
  DatePicker,
  Input,
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

const EvidenceModal = ({
  id_OMI,
  captainId,
  expirationTitle,
  lastChargeData,
  expirationId,
  haveLapse,
  haveExpiration
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [pageAmmount, setPageAmmount] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextExpiration, setNextExpiration] = useState(new Date())
  const [finalExpiration, setFinalExpiration] = useState(new Date())
  const [lapseExpiration, setLapseExpiration] = useState(new Date())
  const [haveNewFinalExpiration, setHaveNewFinalExpiration] = useState(false)

  const handlePageChange = e => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setPageAmmount(value)
    } else {
      setPageAmmount(0) // Si no es un número válido, se resetea a 0
    }
  }

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

  const uploadImage = async (pageNumber: number) => {
    if (selectedFile && captainId && id_OMI) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('captain_id', String(captainId))
      formData.append('id_OMI', String(id_OMI))
      formData.append('expirationId', String(expirationId))
      formData.append('pageNumber', String(pageNumber))
      console.log({
        selectedFile
      })
      try {
        const {
          data: { session },
          error: sessionError
        } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        if (!session || !session.access_token) {
          throw new Error(
            'El usuario no está autenticado o el token no está disponible'
          )
        }

        console.log('Token de autenticación:', session.access_token)

        // Configurar los headers de la solicitud
        const config = {
          headers: {
            Authorization: `Bearer ${session.access_token}`, // Incluir el token de autenticación
            'Content-Type': 'multipart/form-data' // Asegúrate de que estás enviando formData correctamente
          }
        }

        // Hacer la solicitud POST con Axios
        const response = await axios.post(
          '/api/register_expiration',
          formData,
          config
        )

        alert('Imagen subida con éxito y datos guardados en la base de datos')
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
      <Button onPress={onOpen}>Ver / Cargar </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='2xl'
      >
        <ModalContent>
          {onClose => (
            <form onSubmit={console.log('')}>
              <ModalHeader className='flex flex-col gap-1'>
                Subir imagenes de: {expirationTitle}
              </ModalHeader>
              <ModalBody>
                <p>{'Indicaciones'}</p>
                <Chip> {'El documento esta al día'}</Chip>
                {!lastChargeData ? (
                  <div>
                    <p>Datos de la última carga:</p>
                    <p>Proximo vencimiento: </p>
                    <p>Vencimiento final: </p>
                    <p>Páginas subidas al sistema: </p>

                    <Accordion>
                      <AccordionItem
                        aria-label={``}
                        title={`últimos documentos subidos`}
                      >
                        <Accordion>
                          {[1, 2].map(img => (
                            <AccordionItem
                              aria-label={``}
                              title={'fecha de subida: '}
                            >
                              {'div con imagen'}
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ) : (
                  <p>Es la primera vez que se carga este documento</p>
                )}
                {haveExpiration && (
                  <>
                    <DatePicker
                      showMonthAndYearPickers
                      size='lg'
                      label='Próximo vencimiento'
                      isRequired
                      className='mt-4'
                    />
                    <p className='text-gray-600 text-small'>
                      Suele ser vencimiento anual
                    </p>
                    <Checkbox checked={haveNewFinalExpiration} onChange={(e)=>setHaveNewFinalExpiration(!haveNewFinalExpiration)}>Tiene nuevo vencimiento final</Checkbox>
                    {haveNewFinalExpiration && (
                      <DatePicker
                        showMonthAndYearPickers
                        size='lg'
                        label='Vencimiento final'
                        isRequired
                        className='my-4'
                      />
                    )}
                  </>
                )}
                <p>Cantidad de páginas</p>
                <Input
                  className=' my-4 w-full'
                  type='number'
                  label='cantidad de páginas'
                  onChange={handlePageChange}
                />

                <p className='mb-4'>Evidencia:</p>

                {[...Array(pageAmmount)].map((_, i) => (
                  <div key={i} className='flex my-4'>
                    <label className='custom-file-upload'>
                      <input
                        required
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <span className='bg-[#3f3f46] rounded-[12px] leading-5 p-4 text-white cursor-pointer'>
                        Subir imagen página {i + 1}
                      </span>
                    </label>
                    <p>miniatura imagen</p>
                  </div>
                ))}
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
export default EvidenceModal
