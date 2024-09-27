import useSignModal from '@/components/signModal/useSignModal'
import useGlobalStore from '@/stores/useGlobalStore'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { parseAbsoluteToLocal } from '@internationalized/date'

type MotorData = {
  description: string
  lastCharge: number | null
  actualhours: number | null
  newCharge?: number | null
  related?: string
}

interface MaintenanceTask {
  block: string
  description: string
  frequency: number
  blockindex: number
  lastCharge: Date | null | DateObjectInterface
  actualHours: number | null
}

interface DateObjectInterface {
  day: { toString: () => string }
  month: { toString: () => string }
  year: any
  hour: { toString: () => string }
  minute: { toString: () => string }
}

interface RelatedComponent {
  description: string
  related: string
  lastCharge: Date | null
  actualHours: number | null
}

interface InterfaceMaintenanceData {
  renderData: MaintenanceTask[]
  motorData: RelatedComponent[]
}

interface MaintenanceTaskWithDate {
  block: string
  description: string
  frecuency: number | string // Assuming frecuency is a number based on previous type definition
  routeDate: Date | DateObjectInterface
  routeTime: null | string | number
  nextRouteTime: null | string | number
  previousCharge: Date | null
  recommendation: string
}

interface GroupedData {
  [block: string]: MaintenanceTaskWithDate[];
}

export const useMaintenanceRegister = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const { selectedShip, idCaptain } = useGlobalStore()
  const idEngineerChief = 1 // Este valor debería ser dinámico según la tripulación

  const today = parseAbsoluteToLocal(new Date().toISOString())

  const formattedDate = (date: {
    day: { toString: () => string }
    month: { toString: () => string }
    year: any
    hour: { toString: () => string }
    minute: { toString: () => string }
  }) => {
    const day = date.day.toString().padStart(2, '0')
    const month = date.month.toString().padStart(2, '0')
    const year = date.year
    const hour = date.hour.toString().padStart(2, '0')
    const minute = date.minute.toString().padStart(2, '0')

    return `${day} - ${month} - ${year} - ${hour}:${minute}`
  }

  const [maintenanceData, setMaintenanceData] = useState<
    MaintenanceTaskWithDate[]
  >([])
  const [motorData, setMotorData] = useState<MotorData[]>([])

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_maintenance/${selectedShip?.idOMI}`
        )

        console.log('maint', response)
        const data = response.data.renderData.map(
          (item: {
            lastCharge: string
            block: any
            description: any
            frecuency: any
          }) => {
            const previousCharge = item.lastCharge
              ? parseAbsoluteToLocal(item.lastCharge)
              : null

            return {
              block: item.block,
              description: item.description,
              frecuency: item.frecuency,
              routeDate: today,
              routeTime: null,
              nextRouteTime: null,
              previousCharge,
              recommendation: ''
            }
          }
        )
        setMaintenanceData(data)
        setMotorData(response.data.motorData)
      } catch (error) {
        console.error('Error fetching maintenance data:', error)
      }
    }

    if (selectedShip?.idOMI) {
      fetchMaintenanceData()
    }
  }, [selectedShip?.idOMI])

  const handleDateChange = (date: any, index: string | number) => {
    const updatedData = [...maintenanceData]
    updatedData[index as number].routeDate = date
    setMaintenanceData(updatedData)
  }

  const handleTimeChange = (time: string, index: number) => {
    const updatedData = [...maintenanceData]
    if (updatedData[index]) {
      updatedData[index].routeTime = time

      updatedData[index].nextRouteTime = time
        ? parseInt(updatedData[index].frecuency as string) + parseInt(time)
        : parseInt(updatedData[index].frecuency as string)
    }

    setMaintenanceData(updatedData)
  }

  const handleSubmit = async () => {
    const filteredData = maintenanceData
      .filter(item => item.routeTime)
      .map(item => ({
        ...item,
        routeDate: formattedDate(item.routeDate as DateObjectInterface)
      }))

    const additionalData = motorData
      .filter(item => item.newCharge) // Filtra aquellos que tengan un valor en newCharge
      .map(item => ({
        block: 'MOTORS',
        description: item.description,
        frecuency: '0',
        routeDate: today, // La fecha de hoy formateada
        routeTime: item.newCharge, // El valor de newCharge
        nextRouteTime: '',
        previousCharge: '',
        recommendation: ''
      }))

    const postData = {
      maintenanceData: [...filteredData, ...additionalData], // Une ambos arrays
      selectedShipIdOmi: selectedShip?.idOMI,
      idCaptain,
      idEngineerChief,
      chiefSign: signatures.registerSign
    }
    console.log(motorData)
    console.log('Data to be submitted:', postData)

    // try {
    //   const response = await axios.post('/api/register_maintenance', postData)
    //   console.log('maintenance report created successfully:', response.data)
    //   alert('Mantenimiento registrado')
    // } catch (error) {
    //   console.error('Error creating maintenance report:', error)
    //   alert('Error al registrar mantenimiento')
    // }
  }

  const groupedData = maintenanceData.reduce((groups, item) => {
    // @ts-ignore
    const group = groups[item.block] || []
    group.push(item)
    // @ts-ignore

    groups[item.block] = group
    return groups
  }, {})

  const handleMotorChange = (newCharge: any, description: string) => {
    setMotorData(prevMotorData =>
      prevMotorData.map(item => {
        // Convertir a minúsculas para comparación sin importar mayúsculas/minúsculas
        const lowerCaseDescription = description.toLowerCase()

        // Verificar si el item es "MOTOR PRINCIPAL" o su related "CAJA REDUCTORA"
        if (
          item.description.toLowerCase() === lowerCaseDescription ||
          item.related?.toLowerCase() === lowerCaseDescription
        ) {
          return {
            ...item,
            newCharge: newCharge
          }
        }

        return item
      })
    )
  }

  return {
    signatures, handleSaveSignature,handleMotorChange,groupedData,handleSubmit,handleTimeChange,handleDateChange, motorData
  }

}
