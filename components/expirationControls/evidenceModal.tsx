'use client'

import { calculateExpirationInfo } from '@/utils/calculateExpirations'
import { getSupabaseSession } from '@/utils/getSupabaseSession'
import { parseAbsoluteToLocal, ZonedDateTime } from '@internationalized/date'
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Chip,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import axios from 'axios'
import { ChangeEvent, FC, useState } from 'react'

interface EvidenceModalInterface {
  id_OMI: string
  captainId: string
  expirationTitle: string
  lastChargeData: {
    // Information about the last time the document was charged
    id: number
    id_title: number
    id_omi: number
    captain_id: number
    next_expiration: string // Date in YYYY-MM-DD format
    final_expiration: string // Date in YYYY-MM-DD format
    lapse_expiration: string | null // Date in YYYY-MM-DD format or null if no lapse
    creation_date: string // Date and time in YYYY-MM-DDTHH:mm:ss.ssssss format
    images_urls: string[] // Array of image URLs as strings
  } | null
  expirationId: string
  haveLapse: boolean
  haveExpiration: boolean
}

const EvidenceModal:FC<EvidenceModalInterface> = ({
  id_OMI,
  captainId,
  expirationTitle,
  lastChargeData,
  expirationId,
  haveLapse,
  haveExpiration
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Agrupamos los estados relacionados con las fechas en un objeto
  const today = parseAbsoluteToLocal(new Date().toISOString())

  const [isLoading, setIsLoading] = useState(false)
  const [expirations, setExpirations] = useState({
    nextExpiration: today,
    finalExpiration: today,
    lapseExpiration: haveLapse ? today : null,
    haveNewFinalExpiration: false
  })

  const [pageAmmount, setPageAmmount] = useState(1)
  const [images, setImages] = useState(
    Array(pageAmmount).fill({ file: null, previewUrl: null })
  )

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

  const handleDateChange = (field: string, value: ZonedDateTime) => {
    setExpirations(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  // Maneja el cambio de checkbox para "nuevo vencimiento final"
  const handleCheckboxChange = () => {
    setExpirations(prevState => ({
      ...prevState,
      haveNewFinalExpiration: !prevState.haveNewFinalExpiration
    }))
  }

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImages = [...images];
      newImages[index] = {
        file, // Guarda el archivo de la imagen
        previewUrl: URL.createObjectURL(file), // Crea la URL temporal para la vista previa
      };
      setImages(newImages);
    }
  };

  const submitData = async (
    event: React.FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => {
    event.preventDefault() // Evita el comportamiento por defecto del formulario

    if (captainId && id_OMI) {
      setIsLoading(true)
      const formData = new FormData()

      images.forEach((image, index) => {
        if (image.file) {
          formData.append(`image_${index + 1}`, image.file) // Añade cada archivo con un nombre único
        }
      })

      formData.append(
        'nextExpiration',
        formattedDate(expirations.nextExpiration)
      )
      formData.append(
        'finalExpiration',
        formattedDate(expirations.finalExpiration)
      )
      formData.append(
        'lapseExpiration',
        expirations.lapseExpiration ? formattedDate(expirations.lapseExpiration) : ''
      )
      formData.append('id_OMI', id_OMI)
      formData.append('capatain_id', captainId)
      formData.append('expiration_id', expirationId)

      try {
        const config = await getSupabaseSession()

        // Hacer la solicitud POST con Axios
        const response = await axios.post(
          '/api/register_expiration',
          formData,
          config
        )
        // console.log(Array.from(formData.entries()))

        alert('Vencimiento cargado con exito')
        setIsLoading(false)
        onClose() // Cierra el modal solo si la imagen se sube con éxito
      } catch (error) {
        console.log(Array.from(formData.entries()))

        console.error('Error en la solicitud:', error)
        setIsLoading(false)

        alert('Hubo un error al enviar la solicitud.')
      }
    } else {
      setIsLoading(false)

      alert('Por favor, complete todos los campos requeridos.')
    }
  }

  const daysUntilExpirations = lastChargeData
    ? calculateExpirationInfo(lastChargeData)
    : null

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
                Subir imagenes de: {expirationTitle}
              </ModalHeader>
              <ModalBody>
                <Chip
                  color={
                    lastChargeData
                      ? daysUntilExpirations?.nearExpiration.color
                      : 'default'
                  }
                >
                  {' '}
                  {lastChargeData
                    ? daysUntilExpirations?.nearExpiration.message
                    : 'Documento sin cargar'}
                </Chip>

                {lastChargeData ? (
                  <div>
                    <p>Datos de la última carga:</p>
                    <p>
                      Próximo vencimiento: {lastChargeData.next_expiration}{' '}
                    </p>
                    <p>Vencimiento final: {lastChargeData.final_expiration}</p>

                    <p>Páginas subidas al sistema: </p>
                    {lastChargeData.images_urls.length ? (
                      <Accordion>
                        <AccordionItem
                          aria-label={``}
                          title={`últimos documentos subidos`}
                        >
                          <Accordion>
                            {lastChargeData.images_urls.map(img => (
                              <AccordionItem
                                aria-label={String(img)}
                                key={img}
                                title={'imagen ' + 1}
                              >
                                {/* <img src={img} className='h-20'/>
                                 */}
                                <a
                                  href={img}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <img
                                    src={img}
                                    className='h-20 cursor-pointer'
                                    alt='Preview'
                                  />
                                </a>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      'No se Subieron imagenes'
                    )}
                  </div>
                ) : (
                  <p>Es la primera vez que se carga este documento</p>
                )}

                {haveExpiration && (
                  <>
                    <DatePicker
                      showMonthAndYearPickers
                      granularity='day'
                      size='lg'
                      label='Próximo vencimiento'
                      value={expirations.nextExpiration}
                      onChange={date =>
                        handleDateChange('nextExpiration', date)
                      }
                      isRequired
                      className='mt-4'
                    />
                    <p className='text-gray-600 text-small'>
                      Suele ser vencimiento anual
                    </p>

                    {haveLapse && (
                      <>
                        <DatePicker
                          showMonthAndYearPickers
                          granularity='day'
                          size='lg'
                          label='Ventana de vencimiento'
                          value={expirations.lapseExpiration}
                          onChange={date =>
                            handleDateChange('lapseExpiration', date)
                          }
                          isRequired
                          className='mt-4'
                        />
                        <p className='text-gray-600 text-small'>
                          Fecha máxima para actualizar el documento
                        </p>
                      </>
                    )}

                    <Checkbox
                      className='mt-2'
                      checked={expirations.haveNewFinalExpiration}
                      onChange={handleCheckboxChange}
                    >
                      Tiene nuevo vencimiento final
                    </Checkbox>
                    <p className='text-gray-600 mb-2 text-small'>
                      Marcar en caso de que ya se hayan cumplido los
                      vencimientos intermedios o nunca se haya cargado el final
                    </p>

                    {expirations.haveNewFinalExpiration && (
                      <DatePicker
                        showMonthAndYearPickers
                        granularity='day'
                        size='lg'
                        label='Vencimiento final'
                        value={expirations.finalExpiration}
                        onChange={date =>
                          handleDateChange('finalExpiration', date)
                        }
                        isRequired
                        className='my-4'
                      />
                    )}
                  </>
                )}

                <p>Cantidad de páginas</p>

                <p className='mb-4'>Evidencia:</p>

                {[...Array(pageAmmount)].map((_, i) => (
                  <div key={i} className='flex my-4 items-center'>
                    <label className='custom-file-upload'>
                      <input
                        required
                        type='file'
                        accept='image/*'
                        onChange={e => handleImageChange(e, i)}
                        style={{ display: 'none' }}
                      />
                      <span className='bg-[#3f3f46] rounded-[12px] leading-5 p-4 text-white cursor-pointer'>
                        {images[i]?.previewUrl === null ||
                        images[i]?.previewUrl === undefined
                          ? 'Subir imagen página '
                          : 'Cambiar imagen '}
                        {i + 1}
                      </span>
                    </label>
                    {images[i]?.previewUrl && (
                      <img
                        src={images[i].previewUrl}
                        alt={`Miniatura página ${i + 1}`}
                        className='w-20 h-20 object-cover ml-4'
                      />
                    )}
                  </div>
                ))}

                <Button
                  isDisabled={
                    images[pageAmmount - 1]?.previewUrl === null ||
                    images[pageAmmount - 1]?.previewUrl === undefined
                  }
                  className='my-4'
                  onClick={() => {
                    console.log('images', images)
                    setPageAmmount(pageAmmount + 1)
                  }}
                >
                  Cargar otra imagen
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button type='button' color='danger' onPress={onClose}>
                  Cerrar
                </Button>
                <Button type='submit' color='primary' isLoading={isLoading}>
                  Cargar nuevo vencimiento
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
