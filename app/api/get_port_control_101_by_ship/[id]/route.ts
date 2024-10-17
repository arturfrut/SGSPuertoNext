import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    const { data, error } = await supabase
      .from('guards_101_501')
      .select('*')
      .eq('ship_id_omi', id)
      .order('expiration_date', { ascending: false })  // Ordena por la fecha más reciente
      .limit(1)  // Limita la consulta a un solo registro

    if (error) {
      throw error
    }

    return NextResponse.json(data[0])  // Devuelve solo el primer (y único) registro
  } catch (error: any) {
    console.error('Error fetching 101:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}