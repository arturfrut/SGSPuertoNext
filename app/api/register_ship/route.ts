import { ShipInterface } from '@/components/createShip'
import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const shipData: ShipInterface = await request.json()

    const {
      ship_name,
      omi,
      matricula,
      ship_type,
      eslora,
      manga,
      puntal,
      TAT,
      potencia,
      company,
      company_omi,
      charged_by
    } = shipData

    const { error: insertError } = await supabase.from('ships').insert([
      {
        ship_name,
        omi: parseInt(omi),
        matricula: parseInt(matricula),
        ship_type,
        eslora: parseInt(eslora),
        manga: parseInt(manga),
        puntal: parseInt(puntal),
        TAT: parseInt(TAT),
        potencia:parseInt(potencia),
        company,
        company_omi,
        charged_by
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
