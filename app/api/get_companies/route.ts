import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error: selectError } = await supabase
      .from('companies')
      .select('company_omi, company_name');

    if (selectError) {
      throw selectError;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching sailors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}