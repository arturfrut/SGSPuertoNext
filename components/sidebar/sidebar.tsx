import { useLogout } from '@/app/hooks/useLogout'
import { manualsRoutes } from '@/constants/manualsRoutes'
import useGlobalStore from '@/stores/useGlobalStore'
import { Avatar, Select, SelectItem, Tooltip } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { AccidentReportIcon } from '../icons/sidebar/accidentReport-icon'
import { AccountsIcon } from '../icons/sidebar/accounts-icon'
import { AuditIcon } from '../icons/sidebar/audit-icon'
import { CaptainHatIcon } from '../icons/sidebar/captainHat-icon'
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
import { WrenchIcon } from '../icons/sidebar/wrench-icon'
import { useSidebarContext } from '../layout/layout-context'
import { CollapseItems } from './collapse-items'
import { SidebarItem } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'
import { Sidebar } from './sidebar.styles'

export const SidebarWrapper = () => {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebarContext()
  const {
    selectedShip,
    ships,
    setSelectedShip,
    roles,
    rolSelected,
    setRolSelected,
    userData
  } = useGlobalStore()

  const { handleLogout } = useLogout()
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShipId = e.target.value
    const selectedShip =
      ships.find(ship => (ship.idOMI as unknown as string) == selectedShipId) ||
      null
    setSelectedShip(selectedShip)
  }

  const handleSelectionRol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRolSelected(e.target.value)
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
            {userData?.roles.includes(0) && (
              <SidebarMenu title={`Cambiar rol ${rolSelected}`}>
                <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                  <Select
                    color='warning'
                    className='max-w-xs'
                    onChange={handleSelectionRol}
                    
                    value={rolSelected??'casa'}
                    aria-label='rolSelected'
                  >
                    {roles ? (
                      roles.map(rol => <SelectItem key={rol}>{rol}</SelectItem>)
                    ) : (
                      <SelectItem key={'cargando'}>Cargando</SelectItem>
                    )}
                  </Select>
                </div>
              </SidebarMenu>
            )}
            {ships.length < 0 ? (
              <h1>NO HAY BARCOS DISPONIBLES</h1>
            ) : (
              <SidebarMenu title={'Cambiar barco seleccionado'}>
                <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                  <Select
                    aria-label='select-ship'
                    color='warning'
                    className='max-w-xs'
                    onChange={handleSelectionChange}
                    value={selectedShip?.name ?? 'Seleccionar barco'}
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
                href='/accounts'
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
                href='/create-user'
              />
              <SidebarItem
                isActive={pathname === '/create-company'}
                title='Registrar empresa'
                icon={<AccountsIcon />} // TODO: Icono de crear usuario
                href='/create-company'
              />
              <SidebarItem
                isActive={pathname === '/create-ship'}
                title='Registrar barco'
                icon={<CloseTripIcon />} // TODO: Icono de crear usuario
                href='/create-ship'
              />
              <SidebarItem
                isActive={pathname === '/admin-companies'}
                title='Empresas'
                icon={<CloseTripIcon />} // TODO: Icono de crear usuario
                href='/admin-companies'
              />
              <SidebarItem
                isActive={pathname === '/danger-alerts'}
                title='Alerta climatica/accidentes'
                icon={<CloseTripIcon />} // TODO: Icono de crear usuario
                href='/danger-alerts'
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
                isActive={pathname === '/weather-alert'}
                title='Reporte A. Climática'
                icon={<WeatherReportIcon />}
                href='/weather-alert'
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
                isActive={pathname === '/command-delivery'}
                title='Entrega/Cierre de comando'
                icon={<CloseTripIcon />}
                href='/command-delivery'
              />
              <SidebarItem
                isDisabled={!selectedShip}
                isActive={pathname === '/audit'}
                title='Informe de auditoria'
                icon={<AuditIcon />}
                href='/audit'
              />
            </SidebarMenu>

            <SidebarMenu title='Mantenimiento'>
              <SidebarItem
                isActive={pathname === '/maintenance-history'}
                title='Historial de mantenimiento'
                icon={<ChiefEngineerIcon />}
                href='/maintenance-history'
              />
              <SidebarItem
                isActive={pathname === '/maintenance-register'}
                title='Registro de mantenimiento'
                icon={<ChiefEngineerIcon />}
                href='/maintenance-register'
              />
              <SidebarItem
                isActive={pathname === '/order-repair'}
                title='Ordenes y reparaciones'
                icon={<WrenchIcon />}
                href='/order-repair'
              />
              <SidebarItem
                isActive={pathname === '/machine-delivery'}
                title='Entrega/recepción cargo máquinas'
                icon={<WrenchIcon />}
                href='/machine-delivery'
              />
            </SidebarMenu>

            <SidebarMenu title='Guardia en puerto'>
              <SidebarItem
                isActive={pathname === '/port-control'}
                title='Control de guardia'
                icon={<AccountsIcon />}
                href='/port-control'
              />
              <SidebarItem
                isActive={pathname === '/accounts'}
                title='FP 101 Políticas'
                icon={<AccountsIcon />}
                href='/accounts'
              />
              <SidebarItem
                isActive={pathname === '/accounts'}
                title='FP 501 familiarizacion'
                icon={<AccountsIcon />}
                href='/accounts'
              />
              <SidebarItem
                isActive={pathname === '/accounts'}
                title='FP 502 EPP'
                icon={<AccountsIcon />}
                href='/accounts'
              />
            </SidebarMenu>

            <SidebarMenu title='Updates'>
              {/* <SidebarItem
                isActive={pathname === '/changelog'}
                title='Changelog'
                icon={<ChangeLogIcon />}
              /> */}
              <p className='cursor-pointer' onClick={handleLogout}>
                Cerrar sesión
              </p>
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
