'use client'
import { Accordion, AccordionItem, Divider } from '@nextui-org/react'
import { ExpirationTable } from '../expirationControls/expirationTable'
import { MaintenanceHistoryTable } from '../maintenanceHistory/maintenanceHistoryTable'
import { PortControlTable } from '../portControl/portControlTable'
import { DeliveryDataForCompanies } from '../commandDelivery/deliveryDataForCompanies'
import TrainingsTable from '../trainings/TrainingsTable'
import useGlobalStore from '@/stores/useGlobalStore'
import { OrderRepairTable } from '../OrderRepair/orderRapairTable'

export const Content = () => {
  const { userData, rolSelected, selectedShip, ships, companyInUse } =
    useGlobalStore()

  return (
    <div className=' w-full '>

      <h1 className='text-center text-4xl font-bold'>
        Buenas tardes {userData?.name}
      </h1>
      <h4>Rol: {rolSelected ?? 'Sin rol seleccionado'}</h4>
      <h4>
        Empresa: {companyInUse?.company_name ?? 'No hay compañia seleccionada'}
      </h4>
      <h4>
        Barco seleccionado: {selectedShip?.name ?? 'Sin barco seleccionado'}
      </h4>

      {ships.length > 1 && (
        <h4>
          Barcos a cargo :
          {ships.length > 1 &&
            ships.map((ship, i) => <span>{ship?.name},</span>)}{' '}
        </h4>
      )}

      <h2>En esta página se deben mostrar solo los documentos vencidos</h2>
      {selectedShip ? (
        <Accordion>
          <AccordionItem key='1' aria-label='Accordion 1' title='Tripulación'>
            <Accordion>
              <AccordionItem
                key='1'
                aria-label='Accordion 1'
                title='Tripulante 1'
              >
                <div>
                  <p>Vencimiento 1</p>
                  <p>Vencimiento 2</p>
                  <p>Vencimiento 3</p>
                  <p>Vencimiento 4</p>
                </div>
              </AccordionItem>
              <AccordionItem
                key='2'
                aria-label='Accordion 2'
                title='Tripulante 2'
              >
                <h2>Coso</h2>
              </AccordionItem>
              <AccordionItem
                key='3'
                aria-label='Accordion 3'
                title='Tripulante 3'
              >
                <h2>Coso</h2>
              </AccordionItem>
            </Accordion>
          </AccordionItem>
          <AccordionItem key='2' aria-label='Accordion 2' title='Vencimientos'>
            <ExpirationTable idOmi={selectedShip?.idOMI} />
          </AccordionItem>
          <AccordionItem
            key='3'
            aria-label='Accordion 3'
            title='Control puerto'
          >
            <PortControlTable />
          </AccordionItem>
          <AccordionItem
            key='4'
            aria-label='Accordion 4'
            title='Condición de despacho'
          >
            <DeliveryDataForCompanies idOmi={selectedShip.idOMI} />
          </AccordionItem>
          <AccordionItem
            key='5'
            aria-label='Accordion 5'
            title='Capacitaciones'
          >
            <TrainingsTable id_omi={selectedShip.idOMI} />
          </AccordionItem>
          <AccordionItem key='6' aria-label='Accordion 6' title='Mantenimiento'>
            <Accordion>
              <AccordionItem
                key='1'
                aria-label='Accordion 1'
                title='Historial de mantenimiento'
              >
                <MaintenanceHistoryTable idOmi={selectedShip?.idOMI} />
              </AccordionItem>
              <AccordionItem
                key='2'
                aria-label='Accordion 2'
                title='Ordenes y reparaciones'
              >
                <OrderRepairTable idOmi={selectedShip.idOMI} />
              </AccordionItem>
            </Accordion>
          </AccordionItem>
        </Accordion>
      ) : (
        <h1 className='my-8'>Esperando selección</h1>
      )}
    </div>
  )
}
