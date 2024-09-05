import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export interface MaintenanceDataInterface {
  block: string;
  description: string;
  frecuency: string;
  routeDate: string;  // Formato DD - MM - YYYY
  routeTime: string | null;
  nextRouteTime: number;
}

// falta agregar barco
// capitan
// jefe de maquinas

export async function POST(request: Request) {
  try {
    const maintenanceData: MaintenanceDataInterface[] = await request.json()

    const filteredData = maintenanceData.filter(item => item.routeTime);

    // Inserta los datos filtrados en la base de datos
    const { error: insertError } = await supabase.from('maintenance').insert(
      filteredData.map(item => ({
        block: item.block,
        description: item.description,
        frecuency: parseInt(item.frecuency),
        routeDate: item.routeDate,
        routeTime: parseInt(item.routeTime ?? '0'),
        nextRouteTime: item.nextRouteTime,
      }))
    )

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'Maintenance data registered successfully' })
  } catch (error: any) {
    console.error('Error registering maintenance data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
