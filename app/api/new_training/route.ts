import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Participant {
  id: number | null
  name: string
  lastName: string
  signed: string
}

interface Zafarrancho {
  name: string,
  id: number,
  frequency: number,
}

interface TrainingData {
  ship: number
  shipName: string
  idOMI: number
  trainingDate: string
  trainingType: string
  zafarrancho: Zafarrancho | null
  resultDescription: string
  participants: Participant[]
  supervisor: string
  supervisorSign: string
  exerciseDescription: string | null
  aditionalInfo: string
}

export async function POST(request: Request) {
  try {
    const trainingData = await request.json()
    console.log(trainingData.trainingDate)


    const formattedDate = trainingData.trainingDate.split('T')[0];
    console.log( 'FORMATED DATE',formattedDate )

    const { error: insertError } = await supabase.from('trainings').insert([
      {
        id_OMI: trainingData.idOMI,
        training_date: formattedDate,
        training_type: trainingData.trainingType,
        zafarrancho_name: trainingData.zafarrancho?.name,
        zafarrancho_id: trainingData.zafarrancho?.id,
        zafarrancho_frequency: trainingData.zafarrancho?.frequency,
        result_description: trainingData.resultDescription,
        participants: trainingData.participants,
        supervisor: trainingData.supervisor,
        supervisor_sign: trainingData.supervisorSign,
        exercise_description: trainingData.exerciseDescription,
        aditional_info: trainingData.aditionalInfo,
      }
    ])

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ message: 'Training registered successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error registering training:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}