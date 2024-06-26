import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import RiskChip from './RiskChip'
import RiskTableModal from './riskTableModal'
import { useState } from 'react'

export const tableConsecuent = {
  tableHeaders: ['CATEGORÍA', 'NIVEL DE DAÑO', 'DESCRIPCIÓN'],
  rows: [
    {
      category: '1',
      frecuency: 'Nulo',
      description:
        'No hay posibilidad de daños o enfermedades a las personas que ejecutan el trabajo'
    },
    {
      category: '2',
      frecuency: 'Bajo',
      description:
        'Cuando las posibilidad de daños o enfermedades son remotas, se aplicaran medidas de control de riesgo como prevención de daños'
    },
    {
      category: '3',
      frecuency: 'Moderado',
      description:
        'Cuando existe la posibilidad de un daño personal o enfermedad para los ejecutores del trabajo pero las medidas de control de riesgo son suficientes para evitar un accidente'
    },
    {
      category: '4',
      frecuency: 'Alto',
      description:
        'Cuando exista la posibilidad de daños personales y enfermedades pero reduciendo el nivel de riesgo reducimos el nivel de daños'
    },
    {
      category: '5',
      frecuency: 'Muy alto',
      description:
        'Cuando existe la posibilidad de daños personales, enfermedades o perdidas de vida, se prohibirá la realización del trabajo'
    }
  ]
}

export const tableProbability = {
  tableHeaders: ['CATEGORÍA', 'FRECUENCIA', 'DESCRIPCIÓN'],
  rows: [
    {
      category: '1',
      frecuency: 'Improbable',
      description: 'Es virtualmente improbable o irreal'
    },
    {
      category: '2',
      frecuency: 'Remota',
      description: 'No se espera que ocurra'
    },
    {
      category: '3',
      frecuency: 'Poco frecuente',
      description: 'Ocurre rara vez'
    },
    {
      category: '4',
      frecuency: 'Probable',
      description: 'Ocurre al menos una vez cada diez años'
    },
    {
      category: '5',
      frecuency: 'Frecuente',
      description: 'Ocurre varias veces al año'
    }
  ]
}
export default function AddRiskModal({ setTablesData, prevRiskData }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const initialValue = {
    riskNumber: prevRiskData?.firstEvaluation.risks.length || 1,
    riskDetail: '',
    probability: 0,
    consequence: 0,
    result: {
      color: 'default',
      description: 'Sin información ( ? )',
      action: ''
    },
    actionRequired: false
  }

  const [riskData, setRiskData] = useState(initialValue)

  const createRow = (onClose: () => void) => {
    setTablesData({
      ...prevRiskData,
      firstEvaluation: {
        risks: [
          ...prevRiskData.firstEvaluation.risks,
          {
            ...riskData,
            consequence:
              tableConsecuent.rows[riskData.consequence - 1].frecuency,
            probability:
              tableConsecuent.rows[riskData.consequence - 1].frecuency
          }
        ]
      }
    })
    setRiskData(initialValue)
    onClose()
  }

  const validateRiskColor = (
    color: string
  ): 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'secondary' => {
    const validColors = [
      'success',
      'warning',
      'danger',
      'default',
      'primary',
      'secondary'
    ]
    return validColors.includes(color)
      ? (color as
          | 'success'
          | 'warning'
          | 'danger'
          | 'default'
          | 'primary'
          | 'secondary')
      : 'default'
  }

  return (
    <>
      <Button className='my-2 md:w-1/2 w-full' onPress={onOpen}>
        Añadir riesgo
      </Button>
      <Modal
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{`Riesgo ${1}`}</ModalHeader>
              <ModalBody>
                <p className='my-4'>Detalle:</p>
                <Textarea
                  labelPlacement='outside'
                  placeholder='Escriba el detalle de la situación aquí'
                  onChange={(e: { target: { value: any } }) =>
                    setRiskData({ ...riskData, riskDetail: e.target.value })
                  }
                />
                <p className='my-4'>
                  Probabilidad:{' '}
                  {riskData.probability
                    ? tableProbability.rows[riskData.probability - 1].frecuency
                    : 'No hay probabilidad seleccionada'}
                </p>

                <RiskTableModal
                  title={'PROBABILIDAD'}
                  tableData={tableProbability}
                  setRiskData={setRiskData}
                  // riskData={riskData}
                  riskProp='probability'
                />
                <p className='my-4'>
                  Consecuencia:{' '}
                  {riskData.consequence
                    ? tableConsecuent.rows[riskData.consequence - 1].frecuency
                    : 'No hay probabilidad seleccionada'}
                </p>

                <RiskTableModal
                  title={'CONSECUENCIA'}
                  tableData={tableConsecuent}
                  setRiskData={setRiskData}
                  // riskData={riskData}
                  riskProp='consequence'
                />

                <p className='text-xl my-4'>RESULTADO:</p>

                <RiskChip
                  risk={{
                    ...riskData.result,
                    color: validateRiskColor(riskData.result.color)
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Eliminar
                  {/* AGREGAR LÓGICA PARA SI NO EXISTE, QUE SOLO APREZCA AGREGAR, SINO ELIMINAR EDITAR */}
                </Button>
                <Button color='primary' onPress={() => createRow(onClose)}>
                  Crear / Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
