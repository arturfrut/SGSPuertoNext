import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error: selectError } = await supabase
      .from('ships')
      .select('omi, ship_name');

    if (selectError) {
      throw selectError;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching ships:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}