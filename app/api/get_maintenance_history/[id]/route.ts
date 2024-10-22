import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params

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
