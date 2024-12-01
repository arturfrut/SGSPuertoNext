import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    sailor_book_number: string
  }
}

export async function GET(req: Request, { params }: Params) {
  const { sailor_book_number } = params
console.log('sailor_book_number',sailor_book_number)
  try {
    const { data, error } = await supabase
      .from('epp')
      .select('*')
      .eq('sailor_book_number',sailor_book_number)
    if (error) {
      throw error
    }
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching epp:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

