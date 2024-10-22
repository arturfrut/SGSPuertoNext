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
      .from('signs')
      .select('*')
      .eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching sign:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

