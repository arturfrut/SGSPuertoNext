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

export default function Modalfp503({ formData }: { formData: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  console.log('RENDER DE MODAL', formData)
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
              <ModalHeader className='flex flex-col gap-1'>
                Información / de condicional tipo / en la fecha / 24/25/24 /
              </ModalHeader>
              <ModalBody>
                <div className='overflow-x-auto'>
                  <p className='font-bold my-4'>Tema tratado:</p>
                  <p>Breve descripción de la capacitación</p>
                  <p className='font-bold my-4'>Lista de participantes:</p>
                  <ul className='list-disc pl-6'>
                    <li>Juan Perez</li>
                    <li>Juan Perez</li>
                    <li>Juan Perez</li>
                    <li>Juan Perez</li>
                    <li>Juan Perez</li>
                    <li>Juan Perez</li>
                  </ul>
                  <p className='mt-4 font-bold'>Persona encargada:</p>
                  <p>Juan Pablo Segundo</p>
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
