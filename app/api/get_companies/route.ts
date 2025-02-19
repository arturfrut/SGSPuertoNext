import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic' // Esto es clave para forzar respuestas dinámicas
export const revalidate = 0 // Deshabilita el cache estático

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
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}