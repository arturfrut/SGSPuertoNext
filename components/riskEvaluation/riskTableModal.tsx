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

interface TableRow {
  category: string
  frecuency: string
  description: string
}
interface RiskGrade {
  color: 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'secondary'
  description: string
  action: string
}

interface TableData {
  tableHeaders: string[]
  rows: TableRow[]
}
interface RiskData {
  riskDetail: string
  probability: string | null
  consequence: string | null
  result: RiskGrade
}

type SetRiskData = React.Dispatch<React.SetStateAction<Partial<RiskData>>>
interface RiskTableModalProps {
  title: string
  tableData: TableData
  riskData: RiskData
  setRiskData: SetRiskData
  riskProp: string
}



export  const riskGradeGenerator = (risk: number | null) => {
  risk = risk || 0;
  switch (true) {
    case risk < 5:
      return {
        color: 'success',
        description: `Riesgo Bajo (${risk})`,
        action: 'Aplicar medidas normales de trabajo'
      }
    case risk >= 5 && risk <= 9:
      return {
        color: 'warning',
        description: `Riesgo Moderado (${risk})`,
        action: 'Aplicar medidas para reducir el riesgo'
      }
    case risk >= 10 && risk <= 16:
      return {
        color: 'warning',
        description: `Riesgo Alto (${risk})`,
        action: 'Aplicar medidas preventivas para reducir el riesgo'
      }
    case risk > 16:
      return {
        color: 'danger',
        description: `Riesgo Muy Alto (${risk})`,
        action: 'Se prohibe el trabajo para reducir el riesgo'
      }
    default:
      return {
        color: 'default',
        description: 'Sin información ( ? )',
        action: '-'
      }
  }
}

const RiskTableModal: React.FC<RiskTableModalProps> = ({
  title,
  tableData,
  riskData,
  setRiskData,
  riskProp
}) => {
 

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleRowAction = (key, onClose) => {
    const riskCalculate = riskData => {
      const riskMultiplier =
        riskData.probability && riskData.consequence
          ? riskData.probability * riskData.consequence
          : null
      return riskGradeGenerator(riskMultiplier).description
    }

    setRiskData({
      ...riskData,
      [riskProp]: tableData.rows[key - 1].frecuency,
      result: riskCalculate(riskData)
    })
    onClose()
  }

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
                  selectionMode='single'
                  selectionBehavior='toggle'
                  onRowAction={key => handleRowAction(key, onClose)}
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
