import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import React from 'react'

export const ModalObservation = ({
  handleObservation,
  observations,
  field
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleNewObservation = onClose => {
    handleObservation()
    onClose()
  }

  return (
    <div>
      <Button onPress={onOpen} color='primary'>
        Agregar observación
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Agregar observación
              </ModalHeader>
              <Textarea
                variant='underlined'
                label='Description'
                labelPlacement='outside'
                placeholder='Escriba su observación'
                defaultValue=''
              />
              <ModalFooter>
                <Button color='danger' variant='flat' onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  color='primary'
                  onPress={() => handleNewObservation(onclose)}
                >
                  Agregar observación
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
