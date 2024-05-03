'use client'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

export default function Modalfr83({
  modalTitle,
  inputPlaceHolder,
  tableDescription
}: {
  modalTitle: string
  inputPlaceHolder: string
  tableDescription: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button variant='light' onPress={onOpen}>
        { tableDescription}
      </Button>
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
                {modalTitle}
              </ModalHeader>
              <ModalBody>
               <Input placeholder={inputPlaceHolder} label={modalTitle}/>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button type='submit' color='primary' onPress={onClose}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
