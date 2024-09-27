import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const compnayId = 8883339

  try {
    const { data, error } = await supabase
    .from('ships')
    .select('omi, ship_name')
      .eq('company_omi', compnayId)

    if (error) {
      throw error
    }

return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
