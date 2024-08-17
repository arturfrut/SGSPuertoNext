interface AccidentReport {
  accidentType: {
    'Daños al buque': boolean
    'Daños a terceros': boolean
    'Daños al medio ambiente': boolean
    'Hecho potencialmente peligroso': boolean
  }
  voyageId: number
  accidentDescription: {
    accidentTime: Date
    accidentPlace: string
    LE: string
  }
  shipCondition: {
    'Calado proa': boolean
    'Calado popa': boolean
  }
  weatherStatus: {
    windPower: string
    windDirection: string
    seaPower: string
    seaDirection: string
    seaCurrentPower: string
    seaCurrentDirection: string
    tideHeight: string
  }
  HC: {
    HC: string
    HCType: string
    HCAmmount: string
    HCActions: string
  }
  accidentVerifications: string
  accidentCaptainOpinion: string
  witness: number[] // Assuming it's an array of sailor IDs
  shipStatus: string
}

interface AccidentReportDB {
  id?: number
  accident_type_danos_al_buque: boolean
  accident_type_danos_a_terceros: boolean
  accident_type_danos_al_medio_ambiente: boolean
  accident_type_hecho_potencialmente_peligroso: boolean
  voyage_id: number
  accident_description_time: string
  accident_description_place: string
  accident_description_le: string
  ship_condition_calado_proa: boolean
  ship_condition_calado_popa: boolean
  weather_status_wind_power: string
  weather_status_wind_direction: string
  weather_status_sea_power: string
  weather_status_sea_direction: string
  weather_status_sea_current_power: string
  weather_status_sea_current_direction: string
  weather_status_tide_height: string
  hc_hc: string
  hc_hc_type: string
  hc_hc_ammount: string
  hc_hc_actions: string
  accident_verifications: string
  accident_captain_opinion: string
  witness: number[]
  ship_status: string
}

function transformAccidentReport(data: AccidentReportDB): AccidentReport {
  return {
    accidentType: {
      'Daños al buque': data.accident_type_danos_al_buque,
      'Daños a terceros': data.accident_type_danos_a_terceros,
      'Daños al medio ambiente': data.accident_type_danos_al_medio_ambiente,
      'Hecho potencialmente peligroso':
        data.accident_type_hecho_potencialmente_peligroso
    },
    voyageId: data.voyage_id,
    accidentDescription: {
      accidentTime: new Date(data.accident_description_time),
      accidentPlace: data.accident_description_place,
      LE: data.accident_description_le
    },
    shipCondition: {
      'Calado proa': data.ship_condition_calado_proa,
      'Calado popa': data.ship_condition_calado_popa
    },
    weatherStatus: {
      windPower: data.weather_status_wind_power,
      windDirection: data.weather_status_wind_direction,
      seaPower: data.weather_status_sea_power,
      seaDirection: data.weather_status_sea_direction,
      seaCurrentPower: data.weather_status_sea_current_power,
      seaCurrentDirection: data.weather_status_sea_current_direction,
      tideHeight: data.weather_status_tide_height
    },
    HC: {
      HC: data.hc_hc,
      HCType: data.hc_hc_type,
      HCAmmount: data.hc_hc_ammount,
      HCActions: data.hc_hc_actions
    },
    accidentVerifications: data.accident_verifications,
    accidentCaptainOpinion: data.accident_captain_opinion,
    witness: data.witness,
    shipStatus: data.ship_status
  }
}
