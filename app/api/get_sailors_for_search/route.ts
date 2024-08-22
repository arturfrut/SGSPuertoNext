import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Consultar solo los campos id, sailor_book_number y name de la tabla sailors
    const { data, error: selectError } = await supabase
      .from('sailors')
      .select('sailor_book_number, name');

    if (selectError) {
      throw selectError;
    }

    // Retornar los datos obtenidos
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching sailors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}