import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error: selectError } = await supabase
      .from('companies')
      .select('company_omi, company_name');

    if (selectError) {
      throw selectError;
    }

    return new NextResponse(JSON.stringify(data), {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}