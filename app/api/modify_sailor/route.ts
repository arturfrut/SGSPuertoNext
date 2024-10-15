        
import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const sailorData = await request.json();
    const { sailor_book_number, charge, actual_ship } = sailorData;

    // Buscar si existe un registro con el `sailor_book_number` proporcionado
    const { data: sailor, error: selectError } = await supabase
      .from('sailors')
      .select('boarding_history')
      .eq('sailor_book_number', sailor_book_number)
      .single();

    if (selectError || !sailor) {
      throw new Error('Sailor not found');
    }

    // Obtener la fecha actual
    const currentDate = new Date().toISOString();

    // Crear el nuevo objeto para agregar a `boarding_history`
    const newBoardingEntry = {
      board_date: currentDate,
      ship_id_omi: actual_ship
    };

    // Agregar el nuevo objeto al array de `boarding_history` existente
    const updatedBoardingHistory = Array.isArray(sailor.boarding_history)
      ? [...sailor.boarding_history, newBoardingEntry]
      : [newBoardingEntry];

    // Actualizar el registro del marinero con el nuevo cargo, barco actual y el historial de embarques actualizado
    const { error: updateError } = await supabase
      .from('sailors')
      .update({
        charge: charge,
        actual_ship: actual_ship,
        boarding_history: updatedBoardingHistory
      })
      .eq('sailor_book_number', sailor_book_number);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ message: 'Sailor updated successfully' });
  } catch (error: any) {
    console.error('Error updating sailor:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}