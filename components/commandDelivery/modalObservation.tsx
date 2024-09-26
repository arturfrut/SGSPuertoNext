import { ProcessedDeliveryInterface } from '@/app/hooks/useDeliveryByShip';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { FC, useState } from 'react';

interface ModalObervationInterface {
  handleObservation: React.Dispatch<React.SetStateAction<ProcessedDeliveryInterface[]>>;
  field: string;
  fieldId: number;
}

export const ModalObservation: FC<ModalObervationInterface> = ({
  handleObservation,
  field,
  fieldId,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newComment, setNewComment] = useState<string | null>(''); // Local state to track textarea input

  const handleNewObservation = (onClose: () => void) => {
    // Update the corresponding item in the array
    handleObservation(prev =>
      prev.map(item =>
        item.id === fieldId
          ? { ...item, newComment } // Update only the newComment for the matching item
          : item
      )
    );
    onClose(); // Close the modal
  };

  return (
    <div>
      <Button onPress={onOpen}>Agregar observación</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="px-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar observación para {field}
              </ModalHeader>
              <Textarea
                labelPlacement="outside"
                placeholder="Escriba su observación"
                value={newComment || ''} // Controlled value
                onChange={(e) => setNewComment(e.target.value)} // Update local state
              />
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleNewObservation(onClose)}
                >
                  Agregar observación
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};