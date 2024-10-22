import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const dataForm = await request.json()

    const { error: insertError } = await supabase
      .from('guards_101_501')
      .insert([
        {
          charged_by: dataForm.chargedBy,
          guard_name: dataForm.guardName,
          guard_sign: dataForm.guardSign,
          expiration_date: dataForm.expirationDate,
          ship_id_omi: dataForm.shipIdOmi,
          doc_type: dataForm.docType,
          supervisorName: dataForm.supervisorName ?? null,
          supervisorSign: dataForm.supervisorSign ?? null
        }
      ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'control registered successfully' })
  } catch (error: any) {
    console.error('Error registering 101:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
