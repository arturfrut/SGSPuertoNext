'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import { useEffect } from 'react';

export const AccidentReportModal = ({ initialOpen = false }) => {
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
                Alerta!
              </ModalHeader>
              <ModalBody>
                <p>
                  Este formulario solo se realiza si el capitán decide capear el temporal
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Volver atrás
                </Button>
                <Button color='primary' onPress={onClose}>
                  Llenar formulario
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
