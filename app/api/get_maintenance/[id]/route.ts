// import supabase from '@/lib/supabase'
// import { NextResponse } from 'next/server'

// export async function GET() {
//   // const { searchParams } = new URL(request.url);
//   // const id = searchParams.get('id');

//   // if (!id) {
//   //   return NextResponse.json(
//   //     { message: 'Accident ID is required' },
//   //     { status: 400 }
//   //   );
//   // }
//   const id = 939395

//   try {
//     // Obtener datos de la tabla `maintenance_reports`
//     const { data: maintenanceReports, error: selectError } = await supabase
//       .from('maintenance_reports')
//       .select('block,description,routeDate')
//       .eq('ShipIdOmi', id)

//     if (selectError) {
//       throw selectError
//     }

//     // Obtener datos de la tabla `maintenance_basic_data`
//     const { data: basicData, error: basicDataError } = await supabase
//       .from('maintenance_basic_data')
//       .select('block,description,frecuency,blockindex')
//       .eq('ShipIdOmi', id)

//     if (basicDataError) {
//       throw basicDataError
//     }

//     // Combinar los datos de ambas consultas
//     const combinedData = {
//       maintenanceReports,
//       basicData
//     }

//     return NextResponse.json(combinedData)
//   } catch (error: any) {
//     console.error('Error fetching maintenance:', error)
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }


import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 939395

  try {
    // Obtener datos de la tabla `maintenance_reports`
    const { data: maintenanceReports, error: selectError } = await supabase
      .from('maintenance_reports')
      .select('block,description,routeDate')
      .eq('ShipIdOmi', id)

    if (selectError) {
      throw selectError
    }

    // Obtener datos de la tabla `maintenance_basic_data`
    const { data: basicData, error: basicDataError } = await supabase
      .from('maintenance_basic_data')
      .select('block,description,frecuency,blockindex')
      .eq('ShipIdOmi', id)

    if (basicDataError) {
      throw basicDataError
    }

    // Crear un mapa para la búsqueda rápida en `maintenanceReports`
    const maintenanceMap = new Map<string, any>()
    maintenanceReports.forEach(report => {
      const key = `${report.block}|${report.description}`
      maintenanceMap.set(key, {
        lastCharge: report.routeDate
      })
    })

    // Actualizar `basicData` con la información de `maintenanceReports`
    const updatedData = basicData.map(data => {
      const key = `${data.block}|${data.description}`
      const maintenanceInfo = maintenanceMap.get(key)

      if (maintenanceInfo) {
        return {
          ...data,
          lastCharge: maintenanceInfo.lastCharge
        }
      }

      return data
    })

    return NextResponse.json(updatedData)
  } catch (error: any) {
    console.error('Error fetching maintenance:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}