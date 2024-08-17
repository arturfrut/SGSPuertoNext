import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    id_OMI: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const id_OMI = params.id_OMI;

    if (!id_OMI) {
      return NextResponse.json({ error: 'id_OMI is required' }, { status: 400 });
    }

    const { data, error: selectError } = await supabase
      .from('trainings')
      .select('*')
      .eq('id_OMI', id_OMI);

    if (selectError) {
      throw selectError;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//VOLVER ATRAS CUANDO SE CONFIRMA ENVIO DE FORMULARIO