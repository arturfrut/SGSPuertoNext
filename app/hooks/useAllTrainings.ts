import { useState, useEffect, FC } from 'react'

export interface ParticipantInterface {
  id: number;
  name: string;
  lastName: string;
  signed: string; // Asumo que es una imagen en base64
}

// Interface principal para los entrenamientos (trainings)
export interface TrainingInterface {
  training_id: number;
  id_OMI: number;
  training_date: string; // Podrías usar `Date` si deseas manejar fechas como objetos Date
  training_type: string;
  zafarrancho_name: string;
  zafarrancho_id: number;
  zafarrancho_frequency: number;
  result_description: string;
  participants: ParticipantInterface[]; // Array de participantes
  supervisor: string;
  supervisor_sign: string; // Imagen en base64
  exercise_description: string;
  aditional_info: string;
  creation_date: string; // También puede ser `Date`
  repeated: boolean;
}


export const useAllTrainigs = (idOmi: string | number | undefined | null) => {
  const [isLoading, setIsLoading] = useState(true)
  const [trainingsList, setTrainingsList] = useState<TrainingInterface[]>([])

  async function fetchData(idOmi:string | number | undefined) {
    const res = await fetch(`/api/get_trainings/${idOmi}`)
    const data = await res.json()
    setTrainingsList(data)
    setIsLoading(false)
  }
  useEffect(() => {
    idOmi && fetchData(idOmi)
  }, [idOmi])

  return { isLoading, trainingsList, setTrainingsList }
}
