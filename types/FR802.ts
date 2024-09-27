export type FR802Values = {
  accidentDescription: {
    accidentTime:string,
    accidentPlace: string
    LE?: string
  }
  shipStatus: {
    shipStatus: string
  }
  shipCondition: {
    [key: string]: boolean
  }
  accidentType: {
    [key: string]: boolean
  }
  weatherStatus: {
    windDirection: string
    windPower: string
    seaDirection: string
    seaPower: string
    seaCurrentDirection: string
    seaCurrentPower: string
    tideHeight: string
  }
  witness: []
  HC: {
    HC: string
    HCType?: string
    HCAmmount?: number
    HCActions?: string
  }
  accidentVerifications: string
  accidentCaptainOpinion: string
}