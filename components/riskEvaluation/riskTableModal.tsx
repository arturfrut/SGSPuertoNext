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
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'

interface TableRow {
  category: string
  frecuency: string
  description: string
}

interface TableData {
  tableHeaders: string[]
  rows: TableRow[]
}

interface RiskTableModalProps {
  title: string
  tableData: TableData
}

const RiskTableModal: React.FC<RiskTableModalProps> = ({
  title,
  tableData
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button className='my-2 md:w-1/2 w-full' onPress={onOpen}>
        {title}
      </Button>
      <Modal
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>
                <Table
        selectionMode="single"
        selectionBehavior="toggle"

                  onRowAction={key => alert(`Opening item ${key}...`)}
                  aria-label='Example static collection table'
                >
                  <TableHeader>
                    {tableData.tableHeaders.map((header, index) => (
                      <TableColumn key={index}>{header}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {tableData.rows.map(row => (
                      <TableRow key={row.category}>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{row.frecuency}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RiskTableModal
