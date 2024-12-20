import useSignModal from '@/components/signModal/useSignModal'
import useGlobalStore from '@/stores/useGlobalStore'
import { convertToDate } from '@/utils/dateFormat'
import axios from 'axios'
import { useState } from 'react'
import { parseAbsoluteToLocal } from '@internationalized/date'

export const useNcn = () => {
  const today = parseAbsoluteToLocal(new Date().toISOString())
  const { userData, selectedShip, ncnActive } = useGlobalStore()
  const creationInitialValue = {
    title: ncnActive?.title ?? '',
    shipOrCompanyName: ncnActive?.shipOrCompanyName ?? '',
    shipOrCompany: ncnActive?.shipOrCompany ?? 'Buque',
    emisor: ncnActive?.emisor ?? '',
    evidence: ncnActive?.evidence ?? '',
    creationDate: parseAbsoluteToLocal(new Date( ncnActive?.creationDate).toISOString()) ?? today 
  }

  const receptionInitialValue = {
    clasification: ncnActive?.clasification ?? 'Moderado',
    inPdDate:  parseAbsoluteToLocal(new Date( ncnActive?.inPdDate).toISOString()) ?? today, 
    outPdDate: parseAbsoluteToLocal(new Date( ncnActive?.outPdDate).toISOString()) ??today 
  }

  const actionInitialValue = {
    responsableName: ncnActive?.responsableName ?? '',
    sectorAfected: ncnActive?.sectorAfected ?? '',
    implementationDate: parseAbsoluteToLocal(new Date( ncnActive?.implementationDate).toISOString()) ?? today, 
    correctiveAction: ncnActive?.correctiveAction ?? ''
  }

  const notificationInitialValue = {
    cumpliment: ncnActive?.cumpliment ?? '',
    cumplimentDate: today,
    actionworks: ncnActive?.actionworks ?? '',
    observation: ncnActive?.observation ?? ''
  }
  const noteDataInitialValue = {
    creation: creationInitialValue,
    reception: receptionInitialValue,
    action: actionInitialValue,
    notification: notificationInitialValue
  }

  const { signatures, handleSaveSignature } = useSignModal()
  const [noteData, setNoteData] = useState(noteDataInitialValue)
  const [waitingResponse, setWaitingResponse] = useState(false)
  const blockers = [
    !!ncnActive?.title.length,
    ncnActive?.status !== 'created',
    ncnActive?.status !== 'received',
    ncnActive?.status !== 'inAction'
  ]
  const handleReception = (field, value) => {
    setNoteData({
      ...noteData,
      reception: { ...noteData.reception, [field]: value }
    })
  }

  const handleNotification = (field, value) => {
    setNoteData({
      ...noteData,
      notification: { ...noteData.notification, [field]: value }
    })
  }

  const handleCreation = (field, value) => {
    setNoteData({
      ...noteData,
      creation: { ...noteData.creation, [field]: value }
    })
  }

  const handleAction = (field, value) => {
    setNoteData({
      ...noteData,
      action: { ...noteData.action, [field]: value }
    })
  }

  const createNote = async () => {
    const creationData = {
      ...noteData.creation,
      creationDate: convertToDate(noteData.creation.creationDate),
      status: 'created',
      chargedBy: userData.id,
      shipOmi: selectedShip ? selectedShip?.idOMI : null,
      creatorSign: signatures?.creatorSign ?? null
    }
    try {
      await axios.post('/api/register_ncn', creationData)
      alert('Nota de no conformidad creada')
    } catch (e) {
      console.log(e)
      alert('Error al crear la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setWaitingResponse(false)
    }
  }

  const submitReception = async () => {
    const receptionData = {
      ...noteData.reception,
      status: 'received',
      inPdDate: convertToDate(noteData.reception.inPdDate),
      outPdDate: convertToDate(noteData.reception.outPdDate),
      receptorSign: signatures?.receptorSign ?? null,
      ncnid: ncnActive.ncnid
    }
    console.log(receptionData)
    try {
      await axios.put('/api/modify_ncn', receptionData)
      alert('Nota de no conformidad Actualizada')
    } catch (e) {
      console.log(e)
      alert('Error al crear la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setWaitingResponse(false)
    }
  }

  const submitAction = async () => {
    const actionData = {
      ...noteData.action,
      status: 'inAction',
      implementationDate: convertToDate(noteData.action.implementationDate),
      ncnid: ncnActive.ncnid
    }
    try {
      await axios.put('/api/modify_ncn', actionData)
      alert('Nota de no conformidad Actualizada')
    } catch (e) {
      console.log(e)
      alert('Error al crear la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setWaitingResponse(false)
    }
  }
  const submitNotification = async () => {
    const notificationData = {
      ...noteData.notification,
      SgsSign: signatures.SgsSign,
      AcSign: signatures.AcSign,
      cumplimentDate: convertToDate(noteData.notification.cumplimentDate),
      ncnid: ncnActive.ncnid,
      status: 'notified'
    }
    try {
      await axios.put('/api/modify_ncn', notificationData)
      alert('Nota de no conformidad Actualizada')
    } catch (e) {
      console.log(e)
      alert('Error al crear la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setWaitingResponse(false)
    }
  }
  const submitClose = async () => {
    const closeData = {
      ncnid: ncnActive.ncnid,
      status: 'closed'
    }
    try {
      await axios.put('/api/modify_ncn', closeData)
      alert('Nota de no conformidad Actualizada')
    } catch (e) {
      console.log(e)
      alert('Error al crear la nota')
      alert(e.message)
      alert(e.response.data.error)
    } finally {
      setWaitingResponse(false)
    }
  }

  return {
    ncnActive,
    blockers,
    noteData,
    handleCreation,
    handleSaveSignature,
    signatures,
    waitingResponse,
    handleReception,
    submitReception,
    createNote,
    submitAction,
    handleAction,
    handleNotification,
    submitNotification,
    userData,
    submitClose
  }
}
