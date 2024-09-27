import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface PortGuardControl {
  date: string // Formato de fecha: "09 - 09 - 2024"
  shipOmi: number // ID del barco
  guardOmi: number // ID de la guardia
  sign: string // Firma en formato Base64 (imagen)
  observation: string // Observaciones del control
}

export async function POST(request: Request) {
  try {
    const controlData: PortGuardControl = await request.json()

    const { error: insertError } = await supabase
      .from('port_controls')
      .insert([{
        date: controlData.date,
        ship_omi: controlData.shipOmi,
        guard_omi: controlData.guardOmi,
        sign: controlData.sign,
        observation: controlData.observation,

      }])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'control registered successfully' })
  } catch (error: any) {
    console.error('Error registering ship:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
