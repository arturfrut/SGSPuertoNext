'use client'

import { Accident } from '@/app/hooks/useAccidentsByShip'
import useGlobalStore from '@/stores/useGlobalStore'
import { getSupabaseSession } from '@/utils/getSupabaseSession'
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import axios from 'axios'
import { ChangeEvent, FC, useState } from 'react'
import SignModal from '../signModal'
import useSignModal from '../signModal/useSignModal'
import { SignatureChecker } from '../signatureChecker'
import PrevAccidentData from './prevAccidentData'

interface AccidentModal {
  accidentData: Accident
}

const AccidentModal: FC<AccidentModal> = ({ accidentData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [newComment, setNewComment] = useState('')
  const { userData } = useGlobalStore()
  const { signatures, handleSaveSignature } = useSignModal()

  const [image, setImage] = useState({ file: null, previewUrl: null })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage({ file, previewUrl: URL.createObjectURL(file) })
    }
  }

  const submitData = async (
    event: React.FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => {
    event.preventDefault()

    if (userData.id) {
      setIsLoading(true)
      const formData = new FormData()
      if (image.file) {
        formData.append('imageFile', image.file)
      }
      formData.append('charged_by', String(userData.id))
      formData.append('newcomment', newComment)
      if (image.file) {
        formData.append('newsign', signatures.newSignature)
      }

      formData.append('id_accident', String(accidentData.id))

      try {
        const config = await getSupabaseSession()

        // Hacer la solicitud POST con Axios
        const response = await axios.post(
          '/api/register_accident_modification',
          formData,
          config
        )

        alert('Modificación cargada con exito')
        setIsLoading(false)
        onClose()
      } catch (error) {
        console.error('Error en la solicitud:', error)
        setIsLoading(false)

        alert('Hubo un error al enviar la solicitud.')
      }
    } else {
      setIsLoading(false)

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
        scrollBehavior={'outside'}
      >
        <ModalContent>
          {onClose => (
            <form onSubmit={e => submitData(e, onClose)}>
              <ModalHeader className='flex flex-col gap-1'>
                Subir imagenes para caso de Barco nombre
              </ModalHeader>
              <ModalBody>
                <Chip color={'warning'}>Caso abierto</Chip>

                <div>
                  {/* {lastChargeData.images_urls.length ? ( */}
                  <Accordion
                    defaultExpandedKeys={['accidentInfo']}
                    disabledKeys={
                      accidentData?.additionalInfo?.length
                        ? []
                        : ['modifications']
                    }
                  >
                    <AccordionItem
                      aria-label={``}
                      key={'accidentInfo'}
                      title={`Información del accidente`}
                    >
                      <PrevAccidentData accidentData={accidentData} />
                    </AccordionItem>
                    <AccordionItem
                      key={'modifications'}
                      aria-label={``}
                      title={
                        accidentData?.additionalInfo?.length
                          ? ` Modificaciones agregadas`
                          : 'Aún no se ha modificado el documento'
                      }
                    >
                      <Accordion>
                        {/* {lastChargeData.images_urls.map(img => ( */}
                        {accidentData?.additionalInfo.map((info, index) => (
                          <AccordionItem
                            aria-label={String(index)}
                            key={String(index)}
                            title={`Modificación ${index + 1}`}
                          >
                            <div className='flex gap-1 my-4'>
                              <p className='font-semibold'>Cargado por:</p>
                              <p className='font-normal'>{info.charged_by}</p>
                            </div>
                            <div className='flex gap-1 my-4'>
                              <p className='font-semibold'>Fecha:</p>
                              <p className='font-normal'>{info.modified_date}</p>
                            </div>
                            <div className='flex gap-1 my-4'>
                              <p className='font-semibold'>Comentario agregado</p>
                              <p className='font-normal'>{info.newcomment}</p>
                            </div>
                            <p className='flex font-semibold my-4'>Documento cargado:</p>
                            {info.imageadded && (
                              <a
                                onClick={() => console.log(info)}
                                href={info.imageadded}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <img
                                  src={info.imageadded}
                                  className='h-20 cursor-pointer'
                                  alt='Preview'
                                />
                              </a>
                            )}
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionItem>
                  </Accordion>
                </div>

                <p className='my-4'>Nuevo comentario</p>
                <Textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />

                <p className='my-4'>Cargar nuevo documento:</p>

                <div className='flex my-4 items-center'>
                  <label className='custom-file-upload'>
                    <input
                      required
                      type='file'
                      accept='image/*'
                      onChange={e => handleImageChange(e)}
                      style={{ display: 'none' }}
                    />
                    <span className='bg-[#3f3f46] rounded-[12px] leading-5 p-4 text-white cursor-pointer'>
                      {image.file === null || image.file === undefined
                        ? 'Subir imagen'
                        : 'Cambiar imagen '}
                    </span>
                  </label>
                  {image?.previewUrl && (
                    <img
                      src={image.previewUrl}
                      alt={`Miniatura página`}
                      className='w-20 h-20 object-cover ml-4'
                    />
                  )}
                </div>
                <div className='w-full md:w-1/2 flex items-center gap-5'>
                  <SignModal
                    onSave={(data: any) =>
                      handleSaveSignature(data, 'newSignature')
                    }
                    title='Firma de la persona que agrega registro'
                  />
                  <SignatureChecker status={signatures?.newSignature} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type='button' color='warning' onPress={onClose}>
                  Cerrar caso (solo admin)
                </Button>
                <Button type='button' color='danger' onPress={onClose}>
                  Cerrar sin enviar
                </Button>
                <Button type='submit' color='primary' isLoading={isLoading}>
                  Enviar nueva información
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AccidentModal
