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
  const handleImageClick = index => {
    setSelectedImageIndex(selectedImageIndex === index ? null : index)
  }
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
                  <p className='font-bold my-4'>
                    Tema tratado:{' '}
                    <span className='font-normal'>
                      {trainingData.zafarrancho_name}
                    </span>
                  </p>
                  <p>{`${trainingData.exercise_description}`}</p>
                  <p className='font-bold my-4'>Lista de participantes:</p>
                  <ul className='list-disc pl-6 space-y-2'>
                    {trainingData.participants.map((participant, i) => (
                      <li key={i} className='flex justify-between items-center'>
                        <span>{participant.name}</span>
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
