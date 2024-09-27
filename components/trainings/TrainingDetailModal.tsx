'use client'
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'

export default function TrainingDetailModal({
  trainingData
}: {
  trainingData: any
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
                                                              // @ts-ignore

  const handleImageClick = index => {
    setSelectedImageIndex(selectedImageIndex === index ? null : index)
  }
  // isOpen && console.log(trainingData)
  return (
    <>
      <Button onPress={onOpen}>Ver detalle</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>FP 503</ModalHeader>
              <ModalBody>
                <div className='overflow-x-auto'>
                  <p className=' my-4'>
                    {`Fecha: ${trainingData.training_date}`}
                  </p>
                  <p className='font-bold my-4'>Tema tratado:</p>
                  <p>{`${trainingData.exercise_description}`}</p>
                  <p className='font-bold my-4'>Lista de participantes:</p>
                  <ul className='list-disc pl-6 space-y-2'>
                    {trainingData.participants.map((                                                              // @ts-ignore
 participant, i) => (
                      <li key={i} className='flex justify-between items-center'>
                        <span>{`${participant.name} ${participant.lastname}`}</span>
                        <Image
                          className={`bg-white cursor-pointer transition-all duration-300 ${
                            selectedImageIndex === i ? 'w-72 h-52' : 'w-20 h-14'
                          }`}
                          alt='Participant Signature'
                          src={participant.signed}
                          onClick={() => handleImageClick(i)}
                        />
                      </li>
                    ))}
                  </ul>
                  <p className='mt-4 font-bold'>Instructor:</p>
                  <p>{`Supervisor: ${trainingData.supervisor}`}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type='submit' color='primary' onPress={onClose}>
                  Cerrar{' '}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
// {
//   "training_id": 2,
//   "id_OMI": 8883339,
//   "training_date": "2024-08-14",
//   "training_type": "Zafarrancho",
//   "zafarrancho_name": "Abandono",
//   "zafarrancho_id": 4,
//   "zafarrancho_frequency": 30,
//   "result_description": "sin información adicional",
//   "participants": [
//       {
//           "id": 1,
//           "name": "NombreTrip1",
//           "lastName": "ApellidoTrip1",
//       }
//   ],
//   "supervisor": "NombreTrip1 ApellidoTrip1 ",
//   "exercise_description": "Prueba de envio",
//   "aditional_info": "Sin información adicional",
//   "creation_date": "2024-08-14T14:32:02.642729"
// }
