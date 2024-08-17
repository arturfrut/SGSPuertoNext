import { trainingExercises } from '@/constants/strings'
import { crewListMock } from '@/mocks/crewListMock'
import { getLocalTimeZone, now } from '@internationalized/date'
import { ChangeEvent, useEffect, useState } from 'react'
import useSignModal from '../signModal/useSignModal'

const useFormfp503 = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const [typeSelect, setTypeSelect] = useState('Zafarrancho')
  const [selectedShip, setSelectedShip] = useState<any>({})
  const [exerciseDescription, setExerciseDescription] = useState('')
  const [aditionalInfo, setAditionalInfo] = useState('')
  const [supervisorSelect, setSupervisorSelect] = useState('En tripulación')
  const [exerciseSelected, setExerciseSelected] = useState<string | [] | null>(
    null
  )
  const [supervisorSelected, setSupervisorSelected] = useState<string>('')
  const [formDate, setFormDate] = useState(now(getLocalTimeZone()))
  const [inputValue, setInputValue] = useState('')
  const [supervisorSignSelect, setSupervisorSignSelect] = useState('')

  const crewList = crewListMock
  const [crewInExercise, setCrewInExercise] = useState(crewListMock)

  const removeWitness = (i: number) => {
    setCrewInExercise(prevState => prevState.filter((_, index) => index !== i))
  }
  const handleAdd = () => {
    const [name, lastName] = inputValue.split(' ')
    const newCrewMember = { name, lastName }
    setCrewInExercise(prevState => [...prevState, newCrewMember])
    setInputValue('')
  }

  const submitTrainingData = async (document: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/new_training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
      })

      if (!response.ok) {
        throw new Error('Failed to register training.')
      }

      const responseData = await response.json()
      alert(
        responseData.message ||
          'Capacitación/Zafarrancho registrado correctamente'
      )
    } catch (error: any) {
      console.error('Error registering training:', error)
      alert('Error registering training: ' + error.message)
    }
  }

  const createDocumentObject = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!signatures?.personInChargeSignature) {
      alert('Falta que firme la persona encargada.')
      return
    }
    if (crewInExercise.length === 0) {
      alert('No hay tripulación.')
      return
    }
    if (crewInExercise.some(member => !signatures[member.lastName])) {
      alert(
        'Hay un tripulante que no firmó, puede firmar o eliminar ese tripulante.'
      )
      return
    }
    if (
      !exerciseDescription ||
      (typeSelect === 'Zafarrancho' && !exerciseSelected)
    ) {
      alert('Debe completar todos los campos obligatorios.')
      return
    }
    const document = {
      ship: selectedShip.idOMI,
      shipName: selectedShip.name,
      idOMI: selectedShip.idOMI,
      trainingDate: formDate.toString(),
      trainingType: typeSelect,
      zafarrancho:
        typeSelect === 'Zafarrancho'
          ? trainingExercises[exerciseSelected as unknown as number]
          : null,
      resultDescription: inputValue || 'sin información adicional',
      participants: crewInExercise.map(member => ({
        id: member.id ? member.id : 'noId',
        name: member.name,
        lastName: member.lastName,
        signed: signatures?.[member.lastName] ?? null
      })),
      supervisor: supervisorSelected,
      supervisorSign: signatures?.personInChargeSignature,
      exerciseDescription: exerciseDescription,
      aditionalInfo:
        aditionalInfo === '' ? 'Sin información adicional' : aditionalInfo
    }
    submitTrainingData(document)
  }

  const handleSupervisorInSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSupervisorSignSelect(e.target.value)
    setSupervisorSelected(
      `${crewInExercise[e.target.value as unknown as number].name} ${
        crewInExercise[e.target.value as unknown as number].lastName
      } `
    )
  }

  useEffect(() => {
    const selectedShip = localStorage.getItem('selectedShipStored')
    selectedShip && setSelectedShip(JSON.parse(selectedShip))
  }, [])

  return {
    createDocumentObject,
    selectedShip,
    formDate,
    setFormDate,
    typeSelect,
    setTypeSelect,
    exerciseSelected,
    setExerciseSelected,
    exerciseDescription,
    setExerciseDescription,
    inputValue,
    setInputValue,
    handleAdd,
    crewInExercise,
    handleSaveSignature,
    signatures,
    removeWitness,
    aditionalInfo,
    setAditionalInfo,
    supervisorSelect,
    setSupervisorSelect,
    handleSupervisorInSelect,
    supervisorSelected,
    setSupervisorSelected,
    crewList,
    supervisorSignSelect
  }
}

export default useFormfp503
