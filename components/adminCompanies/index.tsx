'use client'
import {
  Accordion,
  AccordionItem,
  Divider,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useState } from 'react'
import { ExpirationTable } from '../expirationControls/expirationTable'
import { MaintenanceHistoryTable } from '../maintenanceHistory/maintenanceHistoryTable'
import { PortControlTable } from '../portControl/portControlTable'
import { DeliveryDataForCompanies } from '../commandDelivery/deliveryDataForCompanies'
import useAllCompanies from '@/app/hooks/useAllCompanies'
import useShipsByCompany, {
  ShipOptionsInterface
} from '@/app/hooks/useShipsByCompany'
import TrainingsTable from '../trainings/TrainingsTable'
import useGlobalStore from '@/stores/useGlobalStore'
import { OrderRepairTable } from '../OrderRepair/orderRapairTable'

const AdminCompanies = () => {
  const { loadingCompanies } = useAllCompanies()
  const { companies, rolSelected } = useGlobalStore()
  const [selectedCompany, setSelectedCompany] = useState<string>()
  const { shipOptions, loadingShip } = useShipsByCompany(selectedCompany)
  const [selectedShip, setSelectedShip] = useState<ShipOptionsInterface>()

  return (
    <div className=' w-full '>
      {rolSelected === 'administrador' && (
        <Select
          label='Empresas'
          className='mb-4'
          disabled={loadingCompanies}
          onChange={e => setSelectedCompany(e.target.value)}
        >
          {companies.map(company => (
            <SelectItem key={company.company_omi} value={company.company_omi}>
              {company.company_name}
            </SelectItem>
          ))}
        </Select>
      )}
      <Select className='mb-4' label='Barcos' disabled={loadingShip} isLoading={loadingShip}>
        {shipOptions.map(ship => (
          <SelectItem
            key={ship?.omi}
            value={ship?.omi ?? 'Sin barco seleccionado'}
            onClick={e => setSelectedShip(ship)}
          >
            {ship?.ship_name}
          </SelectItem>
        ))}
      </Select>
      <Divider className='my-4' />
      <h1 className='text-4xl'>
        {selectedShip
          ? `Barco seleccionado: ${selectedShip.ship_name}`
          : 'Aún no hay barco seleccionado'}
      </h1>

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
            <ExpirationTable idOmi={selectedShip?.omi} />
          </AccordionItem>
          <AccordionItem
            key='3'
            aria-label='Accordion 3'
            title='Control de guardia en puerto'
          >
            <PortControlTable />
          </AccordionItem>
          <AccordionItem
            key='4'
            aria-label='Accordion 4'
            title='Condición de despacho'
          >
            <DeliveryDataForCompanies idOmi={selectedShip.omi} />
          </AccordionItem>
          <AccordionItem
            key='5'
            aria-label='Accordion 5'
            title='Capacitaciones'
          >
            <TrainingsTable id_omi={selectedShip.omi} />
          </AccordionItem>
          <AccordionItem key='6' aria-label='Accordion 6' title='Mantenimiento'>
            <Accordion>
              <AccordionItem
                key='1'
                aria-label='Accordion 1'
                title='Historial de mantenimiento'
              >
                <MaintenanceHistoryTable idOmi={selectedShip?.omi} />
              </AccordionItem>
              <AccordionItem
                key='2'
                aria-label='Accordion 2'
                title='Ordenes y reparaciones'
              >
                <OrderRepairTable idOmi={selectedShip.omi} />
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

export default AdminCompanies
