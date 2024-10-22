import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const signData = await request.json()

    const {
      userId,
      sign
    } = signData

    const { error: insertError } = await supabase.from('signs').insert([
      {
        user_id: userId,
        sign,
      }
    ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'Sign registered successfully' })
  } catch (error: any) {
    console.error('Error registering sign:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
