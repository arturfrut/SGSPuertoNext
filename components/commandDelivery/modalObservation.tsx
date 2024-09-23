import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { FC } from 'react'

interface ModalObervationInterface {
  handleObservation: () => void
  field: string
}
export const ModalObservation: FC<ModalObervationInterface> = ({
  handleObservation,
  field
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleNewObservation = (onClose: () => void) => {
    handleObservation()
    onClose()
  }

  return (
    <div>
      <Button onPress={onOpen} >
        Agregar observación
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent className='px-4'>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Agregar observación para {field}
              </ModalHeader>
              <Textarea
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
