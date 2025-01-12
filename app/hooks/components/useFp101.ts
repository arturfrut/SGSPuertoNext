import useSignModal from '@/components/signModal/useSignModal'
import useGlobalStore from '@/stores/useGlobalStore'
import { generateExpirationDate } from '@/utils/generateExpirationDateUploadImage'
import axios from 'axios'
import { useState } from 'react'
import { useCrewMembersAccordion } from './useCrewMembersAccordion'

export const useFp101 = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const { selectedTripulant, userId, tripulation } = useGlobalStore()
  const [waitingResponse, setWaitingResponse] = useState(false)
  const { fetchCrewData } = useCrewMembersAccordion() 
  const fullTripulant = tripulation.find(
    sailor => sailor.sailor_book_number === selectedTripulant.sailor_book_number
  )
  console.log({fullTripulant})
  const submitData = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signatures) {
      alert('Debes firmar el documento')
      return
    }

    const formData = new FormData()
    formData.append('doc_type', 'politicsSigned')
    formData.append('charged_by', userId.toString())
    formData.append('expiration_date', generateExpirationDate())
    formData.append(
      'sailor_book_number',
      selectedTripulant.sailor_book_number.toString()
    )
    formData.append('sign', signatures.sailorSign)
    try {
      setWaitingResponse(true)
      const response = await axios.post('/api/upload_image', formData)
      alert('Documento registrado')
      await fetchCrewData()
      setWaitingResponse(false)
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Error al registrar documento')
      setWaitingResponse(false)
    }
  }
  return {
    submitData,
    waitingResponse,
    selectedTripulant,
    handleSaveSignature,
    signatures,
    fullTripulant
  }
}
