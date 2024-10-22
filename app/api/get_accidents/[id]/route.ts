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
    // Realizar la consulta principal de accidentes
    const { data: accidentsData, error: accidentsError } = await supabase
      .from('accidents')
      .select('*')
      .eq('ship_number', id)

    if (accidentsError) {
      throw accidentsError
    }

    // Si no hay accidentes con ese ship_number
    if (!accidentsData || accidentsData.length === 0) {
      return NextResponse.json({ error: 'No accidents found' }, { status: 404 })
    }

    // Procesar cada accidente y agregar los campos adicionales
    const processedAccidents = await Promise.all(
      accidentsData.map(async (accident: any) => {
        // Obtener el le_id_name (nombre del responsable) basado en le_id
        const { data: leData, error: leError } = await supabase
          .from('sailors')
          .select('name')
          .eq('sailor_book_number', accident.le_id)
          .single()

        if (leError) {
          throw leError
        }

        const le_id_name = leData ? leData.name : null

        // Obtener los nombres de los testigos (whitness_names) basado en whitness_ids
        const { data: whitnessesData, error: whitnessesError } = await supabase
          .from('sailors')
          .select('name')
          .in('sailor_book_number', accident.whitness_ids)

        if (whitnessesError) {
          throw whitnessesError
        }

        const whitness_names = whitnessesData
          ? whitnessesData.map(w => w.name)
          : []

        // Obtener datos del barco (shipData) basado en ship_number
        const { data: shipData, error: shipError } = await supabase
          .from('ships')
          .select('ship_name, company')
          .eq('omi', accident.ship_number)
          .single()

        if (shipError) {
          throw shipError
        }

        const { data: chargedByData, error: chargedByError } = await supabase
          .from('users')
          .select('name, roles')
          .eq('id', accident.charged_by)
          .single()

        if (chargedByError) {
          console.log('chargedByError error')

          throw chargedByError
        }

        const { data: additional_infoData, error: additionalInfoError } = await supabase
        .from('accident_registers')
        .select('modified_date, newsign,imageadded,newcomment,charged_by')
        .eq('id_accident', accident.id)

      if (additionalInfoError) {
        console.log('additionalInfoError error')

        throw additionalInfoError
      }


        // Retornar el accidente procesado con los nuevos campos agregados
        return {
          ...accident,
          additionalInfo: additional_infoData ,
          chargedByData,
          le_id_name,
          whitness_names,
          shipData
        }
      })
    )

    // Devolver todos los accidentes procesados
    return NextResponse.json(processedAccidents)
  } catch (error: any) {
    console.error('Error fetching accidents data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
