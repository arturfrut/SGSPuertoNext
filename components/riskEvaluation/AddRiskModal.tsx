import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import RiskChip from "./RiskChip";
import RiskTableModal from "./riskTableModal";
import { useState } from "react";
import { useAddRiskModal } from "./useRiskModal";
import { tableConsecuent, tableProbability } from "@/constants/strings";

export default function AddRiskModal({ setTablesData, prevRiskData }) {
  const { isOpen, onOpen, onOpenChange, createRow, riskData, setRiskData } =
    useAddRiskModal(setTablesData, prevRiskData);

  return (
    <>
      <Button className="my-2 md:w-1/2 w-full" onPress={onOpen}>
        Añadir riesgo
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
              <ModalHeader className="flex flex-col gap-1">{`Riesgo ${1}`}</ModalHeader>
              <ModalBody>
                <p className="my-4">Detalle:</p>
                <Textarea
                  labelPlacement="outside"
                  placeholder="Escriba el detalle de la situación aquí"
                  onChange={(e) =>
                    setRiskData({ ...riskData, riskDetail: e.target.value })
                  }
                />
                <p className="my-4">
                  Probabilidad:{" "}
                  {riskData.probability
                    ? tableProbability.rows[riskData.probability - 1].frecuency
                    : "No hay probabilidad seleccionada"}
                </p>

                <RiskTableModal
                  title={"PROBABILIDAD"}
                  tableData={tableProbability}
                  setRiskData={setRiskData}
                  riskData={riskData}
                  riskProp="probability"
                />
                <p className="my-4">
                  Consecuencia:{" "}
                  {riskData.consequence
                    ? tableConsecuent.rows[riskData.consequence - 1].frecuency
                    : "No hay probabilidad seleccionada"}
                </p>

                <RiskTableModal
                  title={"CONSECUENCIA"}
                  tableData={tableConsecuent}
                  setRiskData={setRiskData}
                  riskData={riskData}
                  riskProp="consequence"
                />

                <p className="text-xl my-4">RESULTADO:</p>

                <RiskChip risk={riskData.result} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Eliminar
                  {/* AGREGAR LÓGICA PARA SI NO EXISTE, QUE SOLO APREZCA AGREGAR, SINO ELIMINAR EDITAR */}
                </Button>
                <Button color="primary" onPress={() => createRow(onClose)}>
                  Crear / Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
