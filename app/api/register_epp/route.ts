import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const eppData = await request.json()

  console.log(eppData)

    const { error: insertError } = await supabase.from('epp').insert([
      {
        ...eppData
      }
    ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'epp registered successfully' })
  } catch (error: any) {
    console.error('Error registering epp:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
