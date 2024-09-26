import { CompanyInterface } from '@/components/createCompany'
import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const companyData: CompanyInterface = await request.json()

    const {
      company_name,
      CUIT: cuit,
      direction,
      company_OMI: company_omi,
      company_representant,
      contact_number,
      company_email
    } = companyData

    const { error: insertError } = await supabase.from('companies').insert([
      {
        company_name,
        cuit,
        direction,
        company_omi,
        company_representant,
        contact_number,
        company_email
      }
    ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'Company registered successfully' })
  } catch (error: any) {
    console.error('Error registering company:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

