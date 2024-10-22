import React from 'react'
import { useLockedBody } from '../hooks/useBodyLock'
import { NavbarWrapper } from '../navbar/navbar'
import { SidebarWrapper } from '../sidebar/sidebar'
import { SidebarContext } from './layout-context'
import useGlobalStore from '@/stores/useGlobalStore'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { userSign } = useGlobalStore()
  const [_, setLocked] = useLockedBody(false)
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    setLocked(!sidebarOpen)
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar
      }}
    >
      <section className='flex'>
        {userSign && <SidebarWrapper />}
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  )
}
