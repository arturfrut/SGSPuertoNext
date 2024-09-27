import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    const { data, error } = await supabase
      .from('maintenance_reports')
      .select('description,routeDate')
      .eq('ShipIdOmi', id)

    if (error) {
      throw error
    }
    const updateData = data.map(element => ({
      description: element.description,
      date: element.routeDate,
      type: 'mantenimiento'
    }))


return NextResponse.json(updateData)
  } catch (error: any) {
    console.error('Error fetching history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
