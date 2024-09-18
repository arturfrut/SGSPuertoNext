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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CompanyOptionsInterface } from '../createShip'
import { ExpirationTable } from '../expirationControls/expirationTable'
import { MaintenanceHistoryTable } from '../maintenanceHistory/maintenanceHistoryTable'

interface shipOptionsInterface {
  omi: number
  ship_name: string
}

const AdminCompanies = () => {
  const [loadingCompany, setLoadingCompany] = useState<boolean>(true)
  const [companyOptions, setCompanyOptions] = useState<
    CompanyOptionsInterface[]
  >([])
  const [selectedCompany, setSelectedCompany] = useState<string>()
  const [loadingShip, setLoadingShip] = useState<boolean>(true)
  const [shipOptions, setShipOptions] = useState<shipOptionsInterface[]>([])
  const [selectedShip, setSelectedShip] = useState<shipOptionsInterface>()

  async function fetchData() {
    try {
      const res = await axios.get(`/api/get_companies`)
      const data = await res.data
      setCompanyOptions(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoadingCompany(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchShipData() {
    try {
      const res = await axios.get(`/api/get_ships/${selectedCompany}`)
      const data = await res.data
      setShipOptions(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoadingShip(false)
    }
  }

  useEffect(() => {
    fetchShipData()
  }, [selectedCompany])

  return (
    <div className=' w-full '>
      <Select
        label='Empresas'
        className='mb-4'
        disabled={loadingCompany}
        onChange={e => setSelectedCompany(e.target.value)}
      >
        {companyOptions.map(company => (
          <SelectItem key={company.company_omi} value={company.company_omi}>
            {company.company_name}
          </SelectItem>
        ))}
      </Select>
      <Select className='mb-4' label='Barcos' disabled={loadingShip}>
        {shipOptions.map(ship => (
          <SelectItem
            key={ship?.omi}
            value={ship?.omi}
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
            <ExpirationTable idOmi={selectedShip?.omi} idCaptain={undefined} />
          </AccordionItem>
          <AccordionItem
            key='3'
            aria-label='Accordion 3'
            title='Control puerto'
          >
            <Table aria-label='Example static collection table'>
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key='1'>
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key='2'>
                  <TableCell>Zoey Lang</TableCell>
                  <TableCell>Technical Lead</TableCell>
                  <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key='3'>
                  <TableCell>Jane Fisher</TableCell>
                  <TableCell>Senior Developer</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key='4'>
                  <TableCell>William Howard</TableCell>
                  <TableCell>Community Manager</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionItem>
          <AccordionItem
            key='4'
            aria-label='Accordion 4'
            title='Condición de despacho'
          >
            <h2>Vencimiento</h2>
            <p>Estado: Navengando, en puerto, retiro de servicio</p>
          </AccordionItem>
          <AccordionItem
            key='5'
            aria-label='Accordion 5'
            title='Capacitaciones'
          >
            <Table aria-label='Example static collection table'>
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key='1'>
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key='2'>
                  <TableCell>Zoey Lang</TableCell>
                  <TableCell>Technical Lead</TableCell>
                  <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key='3'>
                  <TableCell>Jane Fisher</TableCell>
                  <TableCell>Senior Developer</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key='4'>
                  <TableCell>William Howard</TableCell>
                  <TableCell>Community Manager</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                <Table aria-label='Example static collection table'>
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key='1'>
                      <TableCell>Tony Reichert</TableCell>
                      <TableCell>CEO</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key='2'>
                      <TableCell>Zoey Lang</TableCell>
                      <TableCell>Technical Lead</TableCell>
                      <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key='3'>
                      <TableCell>Jane Fisher</TableCell>
                      <TableCell>Senior Developer</TableCell>
                      <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key='4'>
                      <TableCell>William Howard</TableCell>
                      <TableCell>Community Manager</TableCell>
                      <TableCell>Vacation</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
