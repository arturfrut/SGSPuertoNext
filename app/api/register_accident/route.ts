import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const accidentData = await request.json()

    const {
      accidentType,
      date,
      place,
      LEId,
      whitnessIds,
      shipCondition,
      windPower,
      windDirection,
      seaPower,
      seaDirection,
      seaCurrentPower,
      seaCurrentDirection,
      seaHeight,
      HC,
      HCtype,
      HClts,
      HCActions,
      verifications,
      capitanOpinions,
      captainSign,
      companyResponsableSign,
      sgsSign,
      shipNumber,
      needComite,
      chargedBy
    } = accidentData

    const { error: insertError } = await supabase.from('accidents').insert([
      {
      accident_type: accidentType,
      date,
      place,
      le_id: LEId,
      whitness_ids: whitnessIds,
      ship_condition: shipCondition,
      wind_power: parseInt(windPower),
      wind_direction: windDirection,
      sea_power: parseInt(seaPower),
      sea_direction: seaDirection,
      sea_current_power: parseInt(seaCurrentPower),
      sea_current_direction: seaCurrentDirection,
      sea_height: parseInt(seaHeight),
      hc: HC,
      hc_type: HCtype,
      hc_lts: HClts,
      hc_actions: HCActions,
      verifications,
      capitan_opinions: capitanOpinions,
      captain_sign: captainSign,
      company_responsable_sign: companyResponsableSign,
      sgs_sign: sgsSign,
      ship_number: shipNumber,
      need_comite:needComite,
      open_Case: true,
      charged_by: chargedBy
      }
    ])

    if (insertError) {
      throw insertError
    }


    return NextResponse.json({ message: 'accident registered successfully' })
  } catch (error: any) {
    console.error('Error registering accident:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
