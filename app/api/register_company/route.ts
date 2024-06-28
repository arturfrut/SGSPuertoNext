import { ShipInterface } from '@/components/createShip'
import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const shipData: ShipInterface = await request.json()

    const { ship_name, company } = shipData

    const { error: insertError } = await supabase.from('companys').insert([
      {
        ship_name,
        company
      }
    ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'Ship registered successfully' })
  } catch (error: any) {
    console.error('Error registering ship:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


// API SIN TERMINAR, NO ESTA HECHA LA TABLA NI LA SOLICITUD