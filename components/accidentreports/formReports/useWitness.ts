import { useState } from 'react'

export const useWitness = (crewList: any[], setValue: Function) => {
  const [witnessList, setWitnessList] = useState<{
    selectedMemberIndex: number
    witness: { id: any; name: any; lastName: any }[]
  }>({
    selectedMemberIndex: -1,
    witness: []
  })

  const handleSelectChange = (e: { target: { value: string } }) => {
    setWitnessList(prevState => ({
      ...prevState,
      selectedMemberIndex: parseInt(e.target.value, 10)
    }))
  }

  const addWitness = () => {
    if (witnessList.selectedMemberIndex !== -1) {
      const selectedMember = crewList[witnessList.selectedMemberIndex - 1]

      const isWitnessAlreadyAdded = witnessList.witness.some(
        witness => witness.id === selectedMember.id
      )

      if (!isWitnessAlreadyAdded) {
        const newWitness = {
          id: selectedMember.id,
          name: selectedMember.name,
          lastName: selectedMember.lastName
        }
        setWitnessList(prevState => ({
          ...prevState,
          witness: [...prevState.witness, newWitness]
        }))
        const updatedWitnessList = [...witnessList.witness, newWitness]

        setValue('witness', updatedWitnessList)
      } else {
        // TODO: hacer que aparezca modal que diga q no se puede agregar dos veces al mismo
        console.log('Este testigo ya ha sido añadido.')
      }
    }
  }

  const removeWitness = (indexToRemove: number) => {
    setWitnessList(prevState => ({
      ...prevState,
      witness: prevState.witness.filter((_, index) => index !== indexToRemove)
    }))
    const updatedWitnessList = witnessList.witness.filter(
      (_, index) => index !== indexToRemove
    )
    setValue('witness', updatedWitnessList)
  }

  return {
    handleSelectChange,
    addWitness,
    removeWitness,
    witnessList
  }
}
