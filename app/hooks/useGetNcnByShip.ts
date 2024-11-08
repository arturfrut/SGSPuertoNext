import axios from 'axios'
import { useState, useEffect } from 'react'

export interface NcnInterface {
    ncnid: number;
    chargedBy: number;
    title: string | null;
    shipOrCompanyName: string | null;
    shipOmi: number;
    shipOrCompany: string | null;
    emisor: string | null;
    evidence: string | null;
    creationDate: string | null;
    clasification: string | null;
    inPdDate: string | null;
    outPdDate: string | null;
    responsableName: string | null;
    sectorAfected: string | null;
    implementationDate: string | null;
    correctiveAction: string | null;
    cumpliment: string | null;
    cumplimentDate: string | null;
    actionworks: string | null;
    observation: string | null;
    creatorSign: string | null;
    receptorSign: string | null;
    AcSign: string | null;
    SgsSign: string | null;
    status: string;
}

const useGetNcnByShip = (shipId: string | number | undefined) => {
  const [ncnsData, setNcnsData] = useState<NcnInterface[]>(null)
  const [loadingNcn, setLoadingNcn] = useState(false)
  const [errorNcn, setErrorNcn] = useState<unknown>(null)
console.log(ncnsData)
  useEffect(() => {
    if (!shipId) return
    const fetchAccidentsData = async () => {
      setLoadingNcn(true)
      setErrorNcn(null)

      try {
        const res = await axios.get(
          `/api/get_ncns/${shipId}`
        )
        const data = await res.data
        setNcnsData(data)
      } catch (error) {
        console.error('Error fetching ships:', error)
        setErrorNcn(error)
      } finally {
        setLoadingNcn(false)
      }
    }

    fetchAccidentsData()
  }, [shipId])

  return { ncnsData, loadingNcn, errorNcn }
}

export default useGetNcnByShip
