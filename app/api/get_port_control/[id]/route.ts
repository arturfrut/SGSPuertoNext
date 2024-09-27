import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    const { data, error } = await supabase
      .from('port_controls')
      .select('date,observation')
      .eq('ship_omi', id)

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
