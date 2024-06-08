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
import Link from 'next/link'

export const NewCrewMemberModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()


  return (
    <>
      <Button onPress={onOpen}>Agregar Tripulante</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Recomendamos llenar la carga de imágenes estando en puerto o
                  con un buen internet
                </p>
                <p>Cantidad</p>
                <Input type='number' label='Cantidad' />
              </ModalBody>
              <ModalFooter>
              <Link href='/crewForms' passHref>
                  <Button as='a' color='danger' variant='light' onPress={onClose}>
                    Volver atrás
                  </Button>
                </Link>

                <Button color='primary' onPress={onClose}>
                  Cargar imágenes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
