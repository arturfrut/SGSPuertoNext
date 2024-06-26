import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      throw new Error(error.message as string);
    }

    console.log('Conexión exitosa a la base de datos de Supabase');
    console.log('Productos:', products);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);

    return NextResponse.json(
      { message: 'Error fetching products' },
      { status: 500 }
    );
  }
}
