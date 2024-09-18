import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { accidentType, voyageId, accidentDescription, shipCondition, weatherStatus, HC, accidentVerifications, accidentCaptainOpinion, witness, shipStatus } = data;

    const { error } = await supabase
      .from('accidents')
      .insert({
        accident_type_danos_al_buque: accidentType['Daños al buque'],
        accident_type_danos_a_terceros: accidentType['Daños a terceros'],
        accident_type_danos_al_medio_ambiente: accidentType['Daños al medio ambiente'],
        accident_type_hecho_potencialmente_peligroso: accidentType['Hecho potencialmente peligroso'],
        voyage_id: voyageId,
        accident_description_time: accidentDescription.accidentTime.toISOString(),
        accident_description_place: accidentDescription.accidentPlace,
        accident_description_le: accidentDescription.LE,
        ship_condition_calado_proa: shipCondition['Calado proa'],
        ship_condition_calado_popa: shipCondition['Calado popa'],
        weather_status_wind_power: weatherStatus.windPower,
        weather_status_wind_direction: weatherStatus.windDirection,
        weather_status_sea_power: weatherStatus.seaPower,
        weather_status_sea_direction: weatherStatus.seaDirection,
        weather_status_sea_current_power: weatherStatus.seaCurrentPower,
        weather_status_sea_current_direction: weatherStatus.seaCurrentDirection,
        weather_status_tide_height: weatherStatus.tideHeight,
        hc_hc: HC.HC,
        hc_hc_type: HC.HCType,
        hc_hc_ammount: HC.HCAmmount,
        hc_hc_actions: HC.HCActions,
        accident_verifications: accidentVerifications,
        accident_captain_opinion: accidentCaptainOpinion,
        witness: witness,
        ship_status: shipStatus,
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Accident report created successfully' });
  } catch (error) {
    console.error('Error creating accident report:', error);
    return NextResponse.json(
      { message: 'Error creating accident report' },
      { status: 500 }
    );
  }
}
