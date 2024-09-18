import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    const { data, error } = await supabase
      .from('expirations_basic_data')
      .select('id,title, have_lapse, have_expiration')

    if (error) {
      throw error
    }


return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching expirations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
