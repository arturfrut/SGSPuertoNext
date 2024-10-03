import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const accidentData = await request.json()

    const {
      accidentType,
      date,
      place,
      crewMemberLeId,
      LEId,
      whitnessIds,
      shipCondition,
      caladoProa,
      caladoPopa,
      otherCircunstances,
      fondeado,
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
      witnessSign,
      companyResponsableSign,
      sgsSign,
      shipNumber
    } = accidentData

    // const { error: insertError } = await supabase.from('accidents').insert([
    //   {
    //     accident_type: accidentType,
    //     date,
    //     place,
    //     crew_member_le_id: crewMemberLeId,
    //     le_id: LEId,
    //     whitness_ids: whitnessIds,
    //     ship_condition: shipCondition,
    //     calado_proa: caladoProa,
    //     calado_popa: caladoPopa,
    //     other_circumstances: otherCircunstances,
    //     fondeado,
    //     wind_power: parseInt(windPower),
    //     wind_direction: windDirection,
    //     sea_power: parseInt(seaPower),
    //     sea_direction: seaDirection,
    //     sea_current_power: parseInt(seaCurrentPower),
    //     sea_current_direction: seaCurrentDirection,
    //     sea_height: parseInt(seaHeight),
    //     hc: HC,
    //     hc_type: HCtype,
    //     hc_lts: HClts,
    //     hc_actions: HCActions,
    //     verifications,
    //     capitan_opinions: capitanOpinions,
    //     captain_sign: captainSign,
    //     witness_sign: witnessSign,
    //     company_responsable_sign: companyResponsableSign,
    //     sgs_sign: sgsSign,
    //     ship_number: shipNumber
    //   }
    // ])

    // if (insertError) {
    //   throw insertError
    // }



console.log(
    {
          accident_type: accidentType,
          date,
          place,
          crew_member_le_id: crewMemberLeId,
          le_id: LEId,
          whitness_ids: whitnessIds,
          ship_condition: shipCondition,
          calado_proa: caladoProa,
          calado_popa: caladoPopa,
          other_circumstances: otherCircunstances,
          fondeado,
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
          witness_sign: witnessSign,
          company_responsable_sign: companyResponsableSign,
          sgs_sign: sgsSign,
          ship_number: shipNumber
        }
      )
    return NextResponse.json({ message: 'accident registered successfully' })
  } catch (error: any) {
    console.error('Error registering accident:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
