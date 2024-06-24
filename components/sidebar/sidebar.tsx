import { manualsRoutes } from "@/constants/manualsRoutes";
import { Avatar, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { AccidentReportIcon } from "../icons/sidebar/accidentReport-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CaptainHatIcon } from "../icons/sidebar/captainHat-icon";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { ChiefEngineerIcon } from "../icons/sidebar/chiefEngineer-icon";
import { CloseTripIcon } from "../icons/sidebar/closeTrip-icon";
import { CrewIcon } from "../icons/sidebar/crew-icon";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { ManualIcon } from "../icons/sidebar/manuals-icon";
import { NotificationIcon } from "../icons/sidebar/notificationicon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { useSidebarContext } from "../layout/layout-context";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";
import { NonCoformityIcon } from "../icons/sidebar/nonConformity-icon";
import { WeatherReportIcon } from "../icons/sidebar/weatherReport-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Mi usuario">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Mi usuario" // TODO: aca debería aparecer el nombre del usuario por defecto
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === "/notifications"}
                title="Mis notificaciones"
                icon={<NotificationIcon />}
                href=""
                isDisabled
              />
              <CollapseItems
                icon={<ManualIcon />}
                items={manualsRoutes}
                title="Manuales"
              />
            </SidebarMenu>

            <SidebarMenu title="Viaje Actual">
              <SidebarItem
                isActive={pathname === "/captainForms"}
                title="Capitán"
                icon={<CaptainHatIcon />}
                href="/captainForms"
              />
              <SidebarItem
                isActive={pathname === "/accidentreports"}
                title="Reportar accidente"
                icon={<AccidentReportIcon />}
                href="/accidentreports"
              />
              <SidebarItem
                isActive={pathname === "/risk-evaluation"}
                title="Evaluación de riesgo"
                icon={<AccidentReportIcon />}
                href="/risk-evaluation"
              />
              <SidebarItem
                isActive={pathname === "/accidentreports"}
                title="Reporte A. Climática"
                icon={<WeatherReportIcon />}
                href="/weather-alert"
              />
              <SidebarItem
                isActive={pathname === "/maintenanceForms"}
                title="Mantenimiento"
                icon={<ChiefEngineerIcon />}
                href="/maintenanceForms"
              />
              <SidebarItem
                isActive={pathname === "/crewForms"}
                title="Tripulantes"
                icon={<CrewIcon />}
                href="/crewForms"
              />
              <SidebarItem
                isActive={pathname === "/testsForms"}
                title="Capacitaciones"
                icon={<SettingsIcon />}
                href="/trainings"
              />
              <SidebarItem
                isActive={pathname === "/non-conformity"}
                title="Nota de no conformidad"
                icon={<NonCoformityIcon />}
                href="/non-conformity"
              />
              <SidebarItem
                isActive={pathname === "/closeTrip"}
                title="Cierre de viaje actual"
                icon={<CloseTripIcon />}
                href="/closeTrip"
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
