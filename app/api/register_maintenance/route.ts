import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const maintenanceData = await request.json()

    const { maintenanceData: maintenances, selectedShipIdOmi, idEngineerChief, chiefSign} = maintenanceData

    // Iterar sobre los datos de mantenimiento y realizar inserciones
    
    for (const maintenance of maintenances) {
      const {
        block,
        description,
        frecuency,
        routeDate,
        routeTime,
        nextRouteTime,
        
      } = maintenance

      // Convertir routeDate a un formato compatible con la base de datos (ISO 8601)

      const [day, month, year, time] = routeDate.split(' - ')
      const [hour, minute] = time.split(':')

      const formattedRouteDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`)

      const { error: insertError } = await supabase.from('maintenance_reports').insert([
        {
          ShipIdOmi: selectedShipIdOmi,
          chiefEngineerId: idEngineerChief,
          block,
          description,
          frecuency,
          routeDate: formattedRouteDate,
          routeTime: parseInt(routeTime),
          nextRouteTime,
          chiefSign
        }
      ])

      if (insertError) {
        throw insertError
      }
    }

    return NextResponse.json({ message: 'Maintenance reports registered successfully' })
  } catch (error: any) {
    console.error('Error registering maintenance reports:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
