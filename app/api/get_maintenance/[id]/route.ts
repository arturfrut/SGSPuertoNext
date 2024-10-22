

import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'
interface Params {
  params: {
    id: string
  }
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params

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


    // Inicializamos los arrays
    const renderData: { block: any; description: any; frecuency: any; blockindex: any}[] = []
    const motorData: { description: any; related: any; lastCharge: any; actualHours: any }[] = []

    // Procesar `basicData`
    basicData.forEach(data => {
      const key = `${data.block}|${data.description}`
      const maintenanceInfo = maintenanceMap.get(key)

      let updatedItem = {
        ...data,
        lastCharge: maintenanceInfo?.lastCharge ?? null,
        actualHours: maintenanceInfo?.actualHours ?? null
      }

      // Añadir `lastCharge` si está disponible


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