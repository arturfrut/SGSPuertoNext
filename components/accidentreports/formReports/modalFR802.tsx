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

export default function ModalFR802({ formData }: { formData: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  console.log('RENDER DE MODAL',formData)
  return (
    <>
      <Button color='warning' onPress={onOpen}>
        Enviar formulario
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
                Usted esta por enviar el formulario FR-802
              </ModalHeader>
              <ModalBody>
                <div className='overflow-x-auto'>
                  <p>Tenga en cuenta que:</p>
                  <ul className='list-disc pl-6'>
                    <li>...</li>
                    <li>...</li>
                  </ul>
                  <p className='mt-4 font-bold'>Datos del formulario:</p>
                  {/* <ul>
                    {Object.entries(formData).map(([key, value]) => (
                      <li key={key}>
                        <span className='font-bold'>{key}:</span> {value}
                      </li>
                    ))}
                  </ul> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button type='submit' color='primary' onPress={onClose}>
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
