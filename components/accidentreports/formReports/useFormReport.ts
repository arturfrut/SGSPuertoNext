import useSignModal from '@/components/signModal/useSignModal'
import { FR802Values } from '@/types/FR802'
import { useForm } from 'react-hook-form'
import { useWitness } from './useWitness'

export const useFormReport = (accidentReportData: { crewList: any[] }) => {
  const { register, handleSubmit, setValue, watch } = useForm<FR802Values>()
  const { handleSelectChange, addWitness, removeWitness, witnessList } =
    useWitness(accidentReportData.crewList, setValue)
  const { signatures, handleSaveSignature } = useSignModal()

  // const onSubmit = (e: React.FormEvent, data: FR802Values) => {
  const onSubmit = (data: FR802Values) => {
    console.log(data)
    // submitAccidentReport(e,data)
    //TODO : Corregir formato de data para poder enviar al a bdd
  }

  const handleShipStatus = (e: { target: { value: string } }) => {
    setValue('shipStatus.shipStatus', e.target.value)
  }

  const shipStatusConditional =
    watch('shipStatus.shipStatus') === 'Otras circunstancias'

  const HCValue = watch('HC.HC')

  const handleAccidentTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`accidentType.${e.target.name}`, e.target.checked)
  }

  const handleShipCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`shipCondition.${e.target.name}`, e.target.checked)
  }

  return {
    register,
    handleSubmit,
    watch,
    handleSelectChange,
    addWitness,
    removeWitness,
    witnessList,
    onSubmit,
    handleShipStatus,
    shipStatusConditional,
    HCValue,
    handleAccidentTypes,
    handleShipCondition,
    signatures,
    handleSaveSignature
  }
}
