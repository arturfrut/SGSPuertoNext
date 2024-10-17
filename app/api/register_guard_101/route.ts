import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  try {
    const data101 = await request.json()

    const { error: insertError } = await supabase
      .from('guards_101_501')
      .insert([{
        charged_by: data101.chargedBy,
        guard_name: data101.guardName,
        guard_sign: data101.guardSign,
        expiration_date: data101.expirationDate,
        ship_id_omi: data101.shipIdOmi,
        docType: data101.docType,
      }])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'control registered successfully' })
  } catch (error: any) {
    console.error('Error registering 101:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
