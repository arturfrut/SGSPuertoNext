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

export default function ModalFormSend() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button color='warning' onPress={onOpen}>Enviar formulario</Button>
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
                Cerrar comando
              </ModalHeader>
              <ModalBody>
                <p>
                  Pantalla de resumen en caso de cerraar el comando
                </p>
                <p>
                  Lista de adveertencias y estado del viaje para poder cerraar el comando
                </p>
                <p>
                  Acepta ccerrar el comando? Eso implica  que :
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose} >
                  Cancelar
                </Button>
                <Button color='primary' onPress={onClose}>
                  Enviar formulario
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
