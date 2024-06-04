'use client'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

export default function ChargeImageModal({
  section,
  destination,
  text
}: {
  section: string
  destination: string
  text: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  console.log({ section, destination, text })
  return (
    <>
      <Button onPress={onOpen}>Cargar imagen</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {text}
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button type='submit' color='danger' onPress={onClose}>
                  Cerrar
                </Button>
                <Button type='submit' color='primary' onPress={onClose}>
                  Subir imagen / Tomar foto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
