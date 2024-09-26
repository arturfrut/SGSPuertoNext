'use client'
import useDeliveryByShip from '@/app/hooks/useDeliveryByShip'
import { FC } from 'react'


interface DeliveryDataForCompaniesInterface {
  idOmi:number
}
export const DeliveryDataForCompanies:FC<DeliveryDataForCompaniesInterface> = ({idOmi}) => {
  const { lastCharge } = useDeliveryByShip(idOmi)
  return lastCharge ? (
    <div>
      <p>Estado actual del barco: {lastCharge?.ship_state}</p>
      <p>Fecha de carga de última entrega: {lastCharge?.created_at}</p>
      <p>Persona que recibe: {lastCharge?.receipt_person_name}</p>
      <p>Persona que entregó: {lastCharge?.delivery_person_name}</p>
    </div>
  ) : (
    <p>Cargando data...</p>
  )
}
