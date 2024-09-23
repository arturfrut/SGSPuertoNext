import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    // Obtener datos de la tabla `maintenance_reports`
    const { data: basicData, error: basicError } = await supabase
      .from('command_delivery_basic_data')
      .select('*')
    // .eq('ShipIdOmi', id)

    if (basicError) {
      throw basicError
    }

const processedDate = basicData.map(el=>(
  {
    ...el,
    oldComments: null
  }
))

    return NextResponse.json(basicData)
  } catch (error: any) {
    console.error('Error fetching maintenance:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
