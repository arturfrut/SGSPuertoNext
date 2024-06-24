import { RiskTableModalProps } from "@/types/riskEvaluation";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useRiskTableModal } from "./useRiskModal";

export const RiskTableModal: React.FC<RiskTableModalProps> = ({
  title,
  tableData,
  riskData,
  setRiskData,
  riskProp,
}) => {
  const { isOpen, onOpen, onOpenChange, handleRowAction } = useRiskTableModal(
    tableData,
    riskProp,
    setRiskData
  );
  return (
    <>
      <Button className="my-2 md:w-1/2 w-full" onPress={onOpen}>
        {title}
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
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Table
                  selectionMode="single"
                  selectionBehavior="toggle"
                  onRowAction={(key) => handleRowAction(Number(key), onClose)}
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    {tableData.tableHeaders.map((header, index) => (
                      <TableColumn key={index}>{header}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {tableData.rows.map((row) => (
                      <TableRow key={row.category}>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{row.frecuency}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RiskTableModal;
