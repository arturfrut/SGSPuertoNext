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
  useDisclosure,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { ProductInterface } from ".";
import axios from "axios";

export default function ModalToAddElement({tripulantBookNumber}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [waitingResponse, setWaitingResponse] = useState(false)
  const { signatures, handleSaveSignature } = useSignModal();

  const initialValue = {
    product: '',
    model: '',
    brand: '',
    certified: false,
    amount: '',
    date: new Date(), 
    crewSigned: !!(signatures?.witnessSignature),
  }

  const [newProductData, setNewProductData] = useState<ProductInterface>(initialValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const submitElement = async (onClose) => {
    setWaitingResponse(true)
    const submitData = {
      ...newProductData,
      sailor_book_number: tripulantBookNumber,
      crewSign: signatures.witnessSignature
    }
    setNewProductData(initialValue)
    console.log('SUBMIT',submitData);
    try {
      await axios.post('/api/register_epp', submitData)
      alert('EPP registrado')
      onClose()
    } catch (e) {
      console.log(e)
      alert('Error al crear la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setWaitingResponse(false)
    }
  }


  const clearData =(onClose) =>{
    setNewProductData(initialValue)
    onClose()
  } 


  return (
    <>
      <Button className="my-4" onPress={onOpen}>
        Añadir Elemento
      </Button>
      <Modal
        size="4xl"
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
              <p>Nombre del elemento a recibir</p>
      <Input
        label="Ingrese nombre de producto"
        name="product"
        value={newProductData.product}
        onChange={handleChange}
      />

      <p>Marca del elemento a recibir</p>
      <Input
        label="Marca"
        name="brand"
        value={newProductData.brand}
        onChange={handleChange}
      />

      <p>Modelo de elemento a recibir</p>
      <Input
        label="Modelo"
        name="model"
        value={newProductData.model}
        onChange={handleChange}
      />

      <p>Cantidad</p>
      <Input
        label="Cantidad"
        name="amount"
        type="string"
        value={newProductData.amount}
        onChange={handleChange}
      />

      <p>Producto certificado</p>
      <Checkbox
        name="certified"
        checked={newProductData.certified}
        onChange={handleChange}
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
                <Button color="danger" variant="light" onPress={()=>clearData(onClose)}>
                  Close
                </Button>
                <Button color="primary" isLoading={waitingResponse} onPress={()=>submitElement(onClose)}>
                  Elemento entregado
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
