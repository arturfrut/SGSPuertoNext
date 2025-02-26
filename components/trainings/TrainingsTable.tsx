import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import TrainingDetailModal from './TrainingDetailModal'
import { TrainingInterface, useAllTrainigs } from '@/app/hooks/useAllTrainings'

interface TrainingsTableInterface {
  id_omi: number | undefined | null 
}

const TrainingsTable: React.FC<TrainingsTableInterface> = ({ id_omi }) => {
const {isLoading, trainingsList} = useAllTrainigs(id_omi)

  const trainingsTabHeader = [
    'Fecha',
    'Tipo',
    'Repite',
    'Encargado',
    'Ver'
  ]
  const calculateDaysUntilExpiration = (trainingData:TrainingInterface) => {
    const { training_date, zafarrancho_frequency, training_type } = trainingData

    if (training_type === 'Zafarrancho') {
      const today = new Date()
      const targetDate = new Date(training_date)

      // Convierte zafarrancho_frequency a un número
      const frequencyInDays = Number(zafarrancho_frequency)

      if (!isNaN(frequencyInDays)) {
        // Calcular la fecha de vencimiento
        targetDate.setDate(targetDate.getDate() + frequencyInDays)

        // Calcular la diferencia en milisegundos

        const diffInMs = targetDate.getTime() - today.getTime();

        // Convertir la diferencia a días
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

        return {
          frequencyText:
            diffInDays > 0
              ? `${diffInDays} días hasta vencimiento`
              : `${Math.abs(diffInDays)} días desde vencimiento`,
          diffInDays
        }
      } else {
        console.error('Invalid zafarrancho_frequency:', zafarrancho_frequency)
        return {
          frequencyText: 'Error en la frecuencia del zafarrancho',
          diffInDays: NaN
        }
      }
    } else {
      return {
        text: 'No repite',
        frequencyText: false
      }
    }
  }
  const setTableData = (trainingsData: TrainingInterface[]) => {
    // Filtra los zafarranchos y agrúpalos por nombre
    const zafarranchosGroupedByName = trainingsData
      .filter((training) => training.training_type === 'Zafarrancho')
      .reduce((acc, training) => {
        if (!acc[training.zafarrancho_name]) {
          acc[training.zafarrancho_name] = [];
        }
        acc[training.zafarrancho_name].push(training);
        return acc;
      }, {} as Record<string, TrainingInterface[]>);
  
    // Marca todos los zafarranchos como repetidos, excepto el último
    Object.keys(zafarranchosGroupedByName).forEach((zafarranchoName) => {
      const trainings = zafarranchosGroupedByName[zafarranchoName];
  
      trainings.sort(
        (a, b) =>
          new Date(a.training_date).getTime() -
          new Date(b.training_date).getTime()
      );
      trainings.forEach((training, index) => {
        training.repeated = index < trainings.length - 1; // Todos menos el último se marcan como repetidos
      });
    });
  
    return trainingsData
      .map((trainingData) => {
        const { frequencyText, diffInDays } =
          calculateDaysUntilExpiration(trainingData);
  
          const rowColor = (days: number | boolean) => {
            if (days === false) {
              return 'danger';
            } else if (typeof days === 'number' && days <= 0) {
              return 'danger';
            } else if (typeof days === 'number' && days <= 7) {
              return 'warning';
            } else {
              return 'default';
            }
          };
  
        return {
          trainingDate: trainingData.training_date,
          trainingType:
            trainingData.training_type === 'Zafarrancho'
              ? trainingData.zafarrancho_name
              : 'Capacitación',
          expirationDate: trainingData.repeated ? 'Cumplido' : frequencyText,
          rowColor: rowColor(diffInDays),
          supervisor: trainingData.supervisor,
          training_id: trainingData.training_id,
          repeated: trainingData.repeated,
          diffInDays: diffInDays ?? null, // Aseguramos que esté definido
        };
      })
      .sort((a, b) => {
        if (a.expirationDate === false) return 1;
        if (b.expirationDate === false) return -1;
  
        return (b.diffInDays ?? 0) - (a.diffInDays ?? 0);
      });
  };
  const tableData = setTableData(trainingsList)

  const modalData = (trainingId: string) =>
    trainingsList.find(training => training.training_id === parseInt(trainingId))

  return (
    <Table aria-label='Example static collection table w-full' isStriped>
      <TableHeader>
        {trainingsTabHeader.map(header => (
          <TableColumn key={header}>{header}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={
          isLoading ? 'Cargando data...' : 'No hay capacitaciones registradas'
        }
      >
        {
          tableData.map((training, index) => (
            <TableRow key={index}>
              <TableCell>{training.trainingDate}</TableCell>
              <TableCell>{training.trainingType}</TableCell>
              <TableCell>
                {/* <Chip color={training.rowColor}>{training.expirationDate}</Chip> */}

                <Chip 
                                                                              // @ts-ignore

                color={training.rowColor}>{training.expirationDate}</Chip>
              </TableCell>
              <TableCell>{training.supervisor}</TableCell>
              <TableCell className='cursor-pointer'>
                <TrainingDetailModal
                  trainingData={modalData(String(training.training_id))}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default TrainingsTable

