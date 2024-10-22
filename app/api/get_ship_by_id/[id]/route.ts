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
      .from('ships')
      .select('omi, ship_name, company, ship_type, matricula')
      .eq('omi', id)

    if (error) {
      throw error
    }

    return NextResponse.json(data[0])
  } catch (error: any) {
    console.error('Error fetching history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

