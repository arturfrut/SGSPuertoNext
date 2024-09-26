import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRef } from "react";
import SignaturePad from "react-signature-pad-wrapper";

export default function SignModal({
  title,
  isCaptain = false,
  onSave,
}: {
  title: string;
  isCaptain?: boolean;
  onSave: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signaturePadRef = useRef<SignaturePad | null>(null);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSaveSignature = () => {
    if (signaturePadRef.current) {
      const data = signaturePadRef.current.toDataURL();
      onSave(data);
      onClose();
    }
  };
  return (
    <>
      <Button className="my-2 w-full" onPress={onOpen}>
        {title}
      </Button>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Entrega de nuevo material
              </ModalHeader> */}
              <ModalBody className="grid">
                <div>
                  <SignaturePad
                    ref={signaturePadRef}
                    canvasProps={{
                      width: "500",
                      height: "500",
                      className: "signature-pad bg-white",
                    }}
                  />
                  <div className="flex column">
                    <Button onClick={clearSignature}>Limpiar Firma</Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleSaveSignature}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
