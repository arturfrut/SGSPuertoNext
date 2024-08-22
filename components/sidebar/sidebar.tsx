import { manualsRoutes } from '@/constants/manualsRoutes'
import { Avatar, Select, SelectItem, Tooltip } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AccidentReportIcon } from '../icons/sidebar/accidentReport-icon'
import { AccountsIcon } from '../icons/sidebar/accounts-icon'
import { CaptainHatIcon } from '../icons/sidebar/captainHat-icon'
import { ChangeLogIcon } from '../icons/sidebar/changelog-icon'
import { ChiefEngineerIcon } from '../icons/sidebar/chiefEngineer-icon'
import { CloseTripIcon } from '../icons/sidebar/closeTrip-icon'
import { CrewIcon } from '../icons/sidebar/crew-icon'
import { FilterIcon } from '../icons/sidebar/filter-icon'
import { HomeIcon } from '../icons/sidebar/home-icon'
import { ManualIcon } from '../icons/sidebar/manuals-icon'
import { NonCoformityIcon } from '../icons/sidebar/nonConformity-icon'
import { NotificationIcon } from '../icons/sidebar/notificationicon'
import { SettingsIcon } from '../icons/sidebar/settings-icon'
import { WeatherReportIcon } from '../icons/sidebar/weatherReport-icon'
import { useSidebarContext } from '../layout/layout-context'
import { CollapseItems } from './collapse-items'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { Sidebar } from './sidebar.styles'
import useGlobalStore from '@/stores/useGlobalStore'


interface ShipInterface {
  idOMI: string
  name: string
  company: string
  matricula: string
  type: string
}

export const SidebarWrapper = () => {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebarContext()
  const [ships, setShips] = useState<ShipInterface[]>([])
  const [selectedShip, setSelectedShip] = useState<ShipInterface | null>(null)
  const barcoSeleccionado = useGlobalStore((state) => state.selectedShip);


  useEffect(() => {
    const storedShips = localStorage.getItem('shipsData')
    if (storedShips) {
      const parsedShips = JSON.parse(storedShips)
      setShips(parsedShips)
      setSelectedShip(selectedShip)
    }

    const storedSelectedShip = localStorage.getItem('selectedShipStored')
    if (storedSelectedShip) {
      setSelectedShip(JSON.parse(storedSelectedShip).idIomi)
    }
  }, [])
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShipId = e.target.value
    const selectedShip =
      ships.find(ship => ship.idOMI === selectedShipId) || null
    setSelectedShip(selectedShip)

    localStorage.setItem('selectedShipStored', JSON.stringify(selectedShip))
  }

  return (
    <aside className='h-screen z-[202] sticky top-0'>
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed
        })}
      >
        <div className='flex flex-col justify-between h-full'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              title='Home'
              icon={<HomeIcon />}
              isActive={pathname === '/'}
              href='/'
            />
            {ships.length < 0 ? (
              <h1>NO HAY BARCOS DISPONIBLES</h1>
            ) : (
              <SidebarMenu title='SELECCIONE BARCO' bigText>
                <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                  <Select
                    color='warning'
                    label='Barco seleccionado'
                    className='max-w-xs'
                    onChange={handleSelectionChange}
                  >
                    {ships.map(ship => (
                      <SelectItem key={ship.idOMI}>{ship.name}</SelectItem>
                    ))}
                  </Select>
                </div>
              </SidebarMenu>
            )}

            <SidebarMenu title='Mi usuario'>
              <SidebarItem
                isActive={pathname === '/accounts'}
                title='Mi usuario'
                icon={<AccountsIcon />}
                href='accounts'
              />
              <SidebarItem
                isActive={pathname === '/notifications'}
                title='Mis notificaciones'
                icon={<NotificationIcon />}
                href=''
                isDisabled
              />
              <CollapseItems
                icon={<ManualIcon />}
                items={manualsRoutes}
                title='Manuales'
              />
            </SidebarMenu>

            <SidebarMenu title='Administrador'>
              <SidebarItem
                isActive={pathname === '/create-user'}
                title='Crear usuario'
                icon={<AccountsIcon />} // TODO: Icono de crear usuario
                href='create-user'
              />
              <SidebarItem
                isActive={pathname === '/create-company'}
                title='Registrar empresa'
                icon={<AccountsIcon />} // TODO: Icono de crear usuario
                href='create-ship'
              />
              <SidebarItem
                isActive={pathname === '/create-ship'}
                title='Registrar barco'
                icon={<CloseTripIcon />} // TODO: Icono de crear usuario
                href='create-ship'
              />
            </SidebarMenu>

            <SidebarMenu title='Tu barco'>
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/captainForms'}
                title='Capitán'
                icon={<CaptainHatIcon />}
                href='/captainForms'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/expiration-controls'}
                title='Ctrl de vencimientos'
                icon={<CaptainHatIcon />}
                href='/expiration-controls'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/accidentreports'}
                title='Reportar accidente'
                icon={<AccidentReportIcon />}
                href='/accidentreports'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/accidentreports'}
                title='Reporte A. Climática'
                icon={<WeatherReportIcon />}
                href='/weather-alert'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/maintenanceForms'}
                title='Mantenimiento'
                icon={<ChiefEngineerIcon />}
                href='/maintenanceForms'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/crewForms'}
                title='Tripulantes'
                icon={<CrewIcon />}
                href='/crewForms'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/testsForms'}
                title='Capacitaciones'
                icon={<SettingsIcon />}
                href='/trainings'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/non-conformity'}
                title='Nota de no conformidad'
                icon={<NonCoformityIcon />}
                href='/non-conformity'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/closeTrip'}
                title='Cierre de viaje actual'
                icon={<CloseTripIcon />}
                href='/closeTrip'
              />
            </SidebarMenu>

            <SidebarMenu title='Updates'>
              <SidebarItem
                isActive={pathname === '/changelog'}
                title='Changelog'
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={'Settings'} color='primary'>
              <div className='max-w-fit'>
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Adjustments'} color='primary'>
              <div className='max-w-fit'>
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Profile'} color='primary'>
              <Avatar
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                size='sm'
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  )
}
