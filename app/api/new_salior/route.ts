import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { sailor_book_number, cel_number, name } = await request.json();

    // Verificar que todos los campos necesarios están presentes
    if (!sailor_book_number || !cel_number || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insertar el nuevo marinero en la tabla sailors
    const { data, error: insertError } = await supabase
      .from('sailors')
      .insert([{ sailor_book_number, cel_number, name }])
      .select('id')
      .single();

    if (insertError) {
      throw insertError;
    }

    // Retornar el id del nuevo marinero
    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating new sailor:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}