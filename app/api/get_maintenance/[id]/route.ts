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


// import supabase from '@/lib/supabase'
// import { NextResponse } from 'next/server'

// export async function GET() {
//   const id = 8883339

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

//     // Crear un mapa para la búsqueda rápida en `maintenanceReports`
//     const maintenanceMap = new Map<string, any>()
//     maintenanceReports.forEach(report => {
//       const key = `${report.block}|${report.description}`
//       maintenanceMap.set(key, {
//         lastCharge: report.routeDate
//       })
//     })

//     console.log({basicData, maintenanceReports})

//     // Inicializamos los arrays
//     const renderData = []
//     const motorData = []

//     // Procesar `basicData`
//     basicData.forEach(data => {
//       const key = `${data.block}|${data.description}`
//       const maintenanceInfo = maintenanceMap.get(key)

//       let updatedItem = {
//         ...data
//       }

//       // Añadir `lastCharge` si está disponible
//       if (maintenanceInfo) {
//         updatedItem.lastCharge = maintenanceInfo.lastCharge
//       }

//       // Si el `block` es diferente a 'MOTORS', se añade a `renderData`
//       if (data.block !== 'MOTORS') {
//         renderData.push(updatedItem)
//       } else {
//         // Si el `block` es 'MOTORS', se añade a `motorData`
//         motorData.push({
//           description: data.description,
//           related: data.frecuency
//         })
//       }

//       return updatedItem
//     })

//     // Retornar los dos objetos en la respuesta
//     return NextResponse.json({ renderData, motorData })
//   } catch (error: any) {
//     console.error('Error fetching maintenance:', error)
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    // Obtener datos de la tabla `maintenance_reports`
    const { data: maintenanceReports, error: selectError } = await supabase
      .from('maintenance_reports')
      .select('block,description,routeDate,frecuency')
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
        lastCharge: report.routeDate,
        actualHours: report.frecuency // Aquí guardamos la frecuencia como actualHours
      })
    })

    console.log({basicData, maintenanceReports})

    // Inicializamos los arrays
    const renderData = []
    const motorData = []

    // Procesar `basicData`
    basicData.forEach(data => {
      const key = `${data.block}|${data.description}`
      const maintenanceInfo = maintenanceMap.get(key)

      let updatedItem = {
        ...data
      }

      // Añadir `lastCharge` si está disponible
      if (maintenanceInfo) {
        updatedItem.lastCharge = maintenanceInfo.lastCharge
        updatedItem.actualHours = maintenanceInfo.actualHours
      }

      // Si el `block` es diferente a 'MOTORS', se añade a `renderData`
      if (data.block !== 'MOTORS') {
        renderData.push(updatedItem)
      } else {
        // Si el `block` es 'MOTORS', se añade a `motorData`
        const relatedKey = `${data.description}|${data.frecuency}`
        const relatedReport = maintenanceMap.get(relatedKey) || maintenanceInfo

        motorData.push({
          description: data.description,
          related: data.frecuency,
          lastCharge: relatedReport?.lastCharge || null,
          actualHours: relatedReport?.actualHours || null
        })
      }

      return updatedItem
    })

    // Retornar los dos objetos en la respuesta
    return NextResponse.json({ renderData, motorData })
  } catch (error: any) {
    console.error('Error fetching maintenance:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}