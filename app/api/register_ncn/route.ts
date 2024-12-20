import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const ncnData = await request.json()

    const {
      title,
      shipOrCompanyName,
      shipOrCompany,
      emisor,
      evidence,
      creationDate,
      creatorSign,
      status,
      chargedBy,
      shipOmi,
    } = ncnData

    const { error: insertError } = await supabase.from('ncn').insert([
      {
        title,
        shipOrCompanyName,
        shipOrCompany,
        emisor,
        evidence,
        creationDate,
        creatorSign,
        status,
        chargedBy,
        shipOmi,
      }
    ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'ncn registered successfully' })
  } catch (error: any) {
    console.error('Error registering ncn:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
