import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    companyId: string
  }
}

export async function GET(req: Request, { params }: Params) {
  const { companyId } = params
  try {
    const { data, error } = await supabase
      .from('ships')
      .select('omi, ship_name')
      .eq('company_omi', companyId)

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
