'use client'

import { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';

export const SailorBookModal = ({ initialOpen = false }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (initialOpen) {
      onOpen();
    }
  }, [initialOpen, onOpen]);

  return (
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
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Volver atrás
                </Button>
                <Button color='primary' onPress={onClose}>
                  Cargar imágenes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
