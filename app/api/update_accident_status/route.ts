import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accident_id, open_case } = await request.json();

    // Validar que los campos requeridos estén presentes
    if (!accident_id || typeof open_case === 'undefined') {
      return NextResponse.json(
        { error: 'Missing accident_id or open_case value' },
        { status: 400 }
      );
    }

    // Actualizar el campo `open_case` de la fila con el `accident_id` proporcionado
    const { error: updateError } = await supabase
      .from('accidents')
      .update({ open_case })
      .eq('id', accident_id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ message: 'open_case updated successfully' });
  } catch (error: any) {
    console.error('Error updating open_case:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}