import { CrossIcon } from "@/components/icons/crossIcon";
import SignModal from "@/components/signModal";
import useSignModal from "@/components/signModal/useSignModal";
import { SignatureChecker } from "@/components/signatureChecker";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalToAddElement() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { signatures, handleSaveSignature } = useSignModal();
  return (
    <>
      <Button className="my-4" onPress={onOpen}>
        Añadir Elemento
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Entrega de nuevo material
              </ModalHeader>
              <ModalBody className="grid">
                <p>Id del producto a recibir</p>
                {/* Debe venir por bdd, en caso de seleccionar debe rellenar el
                resto de los input, en caso de seleccionar otro se agregara a la
                bdd al final del envio. */}
                <Select label="Id" value="0">
                  {[1, 2, 3, 4, 5, "Agregar"].map((element) => (
                    <SelectItem
                      key={`monthsSelectId-${element}`}
                      value={element}
                    >
                      {element}
                    </SelectItem>
                  ))}
                </Select>
                <p>Nombre del elemento a recibir </p>
                <Input type={"string"} label="Ingrese nombre de producto" />
                <p>Marca del elemento a recibir </p>
                <Input type={"string"} label="Marca" />
                <p>Modelo de elemento a recibir </p>
                <Input type={"string"} label="Modelo" />
                <p>Cantidad</p>
                <Input type="number" label="Cantidad" />
                <p>Producto certificado</p>
                <Checkbox
                  // onChange={handleShipCondition}
                  name="isCertified"
                >
                  Marque solo en caso de ser certificado
                </Checkbox>
                <div className="w-full md:w-1/2 flex items-center justify-center gap-5">
                  <SignModal
                    onSave={(data: any) =>
                      handleSaveSignature(data, "witnessSignature")
                    }
                    title="FIRMA TRIPULANTE"
                  />
                  <SignatureChecker status={signatures?.witnessSignature} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
