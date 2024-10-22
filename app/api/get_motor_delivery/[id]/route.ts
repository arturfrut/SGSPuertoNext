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
    // Obtener datos básicos de la tabla `command_delivery_basic_data`
    const { data: basicData, error: basicError } = await supabase
      .from('motor_delivery_basic_data')
      .select('*')

    if (basicError) {
      throw basicError
    }

    // Obtener el último registro de la tabla `command_delivery_registers` para el barco con ShipIdOmi = id
    const { data: registersData, error: registersError } = await supabase
      .from('motor_delivery_registers')
      .select('*')
      .eq('ship_omi', id)
      .order('created_at', { ascending: false }) // Ordenar por fecha descendente
      .limit(1) // Obtener solo el último registro

    if (registersError) {
      throw registersError
    }

    const lastRegister = registersData?.[0] // El último registro

    // Procesar `oldComments` asignando valores desde `new_comments`
    const processedBasicData = basicData.map(el => {
      // Buscar el comentario correspondiente al `id` en `new_comments` del último registro
      const oldComments = lastRegister?.new_comments[el.id] || null

      return {
        ...el,
        oldComments // Asignar el comentario al objeto básico
      }
    })

    // Crear el objeto final `processedData`
    const processedData = {
      lastCharge: lastRegister, // Último registro completo
      basicData: processedBasicData // Datos básicos procesados con `oldComments`
    }

    // Retornar el objeto `processedData` en la respuesta
    return NextResponse.json(processedData)
  } catch (error: any) {
    console.error('Error fetching maintenance:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
