
import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = 8883339

  try {
    // Obtener los datos básicos
    const { data: basicData, error: errorBasicData } = await supabase
      .from('expirations_basic_data')
      .select('id,title, have_lapse, have_expiration')

    if (errorBasicData) {
      throw errorBasicData
    }

    // Obtener todas las expiraciones para el id_omi dado
    const { data: dataExpirations, error: errorExpirations } = await supabase
      .from('expirations')
      .select('*')
      .eq('id_omi', id)

    if (errorExpirations) {
      throw errorExpirations
    }

    // Procesar los datos para agregar lastChargeData y final_expiration
    const processedData = basicData.map((item: any) => {
      // Filtrar las expirations que corresponden a este id_title
      const relatedExpirations = dataExpirations.filter(
        (exp: any) => exp.id_title === item.id
      )

      // Obtener la última expiración en base a final_expiration
      // @ts-ignore
      const lastExpiration = relatedExpirations.toSorted(
        (a: any, b: any) => new Date(b.final_expiration).getTime() - new Date(a.final_expiration).getTime()
      )[0]

      return {
        ...item,
        lastChargeData: lastExpiration || null, // Si no hay expiración, null
        final_expiration: lastExpiration?.final_expiration || null // Si no hay fecha, null
      }
    })

    return NextResponse.json( processedData )
  } catch (error: any) {
    console.error('Error fetching expirations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}