import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
interface Params {
  params: {
    id: string
  }
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params
  try {

    if (!id) {
      return NextResponse.json(
        { message: 'Accident ID is required' },
        { status: 400 }
      );
    }

    const { data: accident, error } = await supabase
      .from('accidents_reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(accident);
  } catch (error) {
    console.error('Error fetching accident report:', error);
    return NextResponse.json(
      { message: 'Error fetching accident report' },
      { status: 500 }
    );
  }
}