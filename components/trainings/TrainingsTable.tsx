import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import TrainingDetailModal from './TrainingDetailModal'

interface TrainingsTableInterface {
  id_omi: number
}

const TrainingsTable: React.FC<TrainingsTableInterface> = ({ id_omi }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [trainingsList, setTrainingsList] = useState([])
  async function fetchData(id_omi) {
    const res = await fetch(`/api/get_trainings/${id_omi}`)
    const data = await res.json()
    setTrainingsList(data)
    setIsLoading(false)
  }
  useEffect(() => {
    id_omi && fetchData(id_omi)
  }, [id_omi])

  const trainingsTabHeader = [
    'Fecha',
    'Tipo',
    'Repite',
    'Encargado',
    'Ver'
  ]
  const calculateDaysUntilExpiration = trainingData => {
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
        const diffInMs = targetDate - today

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
  const setTableData = (trainingsData) => {
    // Filtra los zafarranchos y agrúpalos por nombre
    const zafarranchosGroupedByName = trainingsData
      .filter((training) => training.training_type === 'Zafarrancho')
      .reduce((acc, training) => {
        if (!acc[training.zafarrancho_name]) {
          acc[training.zafarrancho_name] = [];
        }
        acc[training.zafarrancho_name].push(training);
        return acc;
      }, {});
  
    // Marca todos los zafarranchos como repetidos, excepto el último
    Object.keys(zafarranchosGroupedByName).forEach((zafarranchoName) => {
      const trainings = zafarranchosGroupedByName[zafarranchoName];
      trainings.sort((a, b) => new Date(a.training_date) - new Date(b.training_date)); // Ordena por fecha ascendente
      trainings.forEach((training, index) => {
        training.repeated = index < trainings.length - 1; // Todos menos el último se marcan como repetidos
      });
    });
  
    return trainingsData
      .map((trainingData) => {
        const { frequencyText, diffInDays } =
          calculateDaysUntilExpiration(trainingData);
  
        const rowColor = (diffInDays) => {
          if (diffInDays === false || diffInDays <= 0) {
            return 'danger';
          } else if (diffInDays <= 7) {
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
        };
      })
      .sort((a, b) => {
        if (a.expirationDate === false) return 1;
        if (b.expirationDate === false) return -1;
        return b.diffInDays - a.diffInDays;
      });
  };
  const tableData = setTableData(trainingsList)
  console.log('trainingsList',trainingsList)
  console.log('tableData',tableData)
  const modalData = (trainingId: string) =>
    trainingsList.find(training => training.training_id === trainingId)

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
        {!isLoading &&
          tableData.map((training, index) => (
            <TableRow key={index}>
              <TableCell>{training.trainingDate}</TableCell>
              <TableCell>{training.trainingType}</TableCell>
              <TableCell>
                {/* <Chip color={training.rowColor}>{training.expirationDate}</Chip> */}
                <Chip color={training.rowColor}>{training.expirationDate}</Chip>
              </TableCell>
              <TableCell>{training.supervisor}</TableCell>
              <TableCell className='cursor-pointer'>
                <TrainingDetailModal
                  trainingData={modalData(training.training_id)}
                />
              </TableCell>
              {/* <TableCell className={`${training.rowColor }cursor-pointer`}>Crear Nueva</TableCell> */}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default TrainingsTable

// [
//   {
//       "training_id": 1,
//       "id_OMI": 1231,
//       "training_date": "2024-12-25",
//       "training_type": "Zafarrancho",
//       "zafarrancho_name": "Hombre al agua",
//       "zafarrancho_id": 1,
//       "zafarrancho_frequency": 60,
//       "result_description": "ACA PUEDE IR UN STRING LARGO",
//       "participants": [
//           {
//               "id": null,
//               "name": "Artur",
//               "lastName": "FruTester",
//               "signed": "ACA VA UN SVG HECHO STRING MUY LARGO"
//           }
//       ],
//       "supervisor": "Juan Carlos",
//       "supervisor_sign": "ACA VA UN SVG HECHO STRING MUY LARGO",
//       "exercise_description": "Hombre al agua",
//       "aditional_info": "Sin información adicional",
//       "creation_date": "2024-08-11T14:16:50.805136"
//   }
// ]

// Agregar ver detalle y modificar, además no funciona fecha, y falta agregar color.
// Crear post cuando se crea entrenamiento
// Modal para ver data y dar el okey para presentarla
