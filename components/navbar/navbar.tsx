import useGlobalStore from '@/stores/useGlobalStore'
import { Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'
import { FeedbackIcon } from '../icons/navbar/feedback-icon'
import { SupportIcon } from '../icons/navbar/support-icon'
import { BurguerButton } from './burguer-button'
import { NotificationsDropdown } from './notifications-dropdown'
import { UserDropdown } from './user-dropdown'
import { DarkModeSwitch } from './darkmodeswitch'

interface Props {
  children: React.ReactNode
}

export const NavbarWrapper = ({ children }: Props) => {
  const { selectedShip, ships, setSelectedShip } = useGlobalStore()

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Navbar
        isBordered
        className='w-full'
        classNames={{
          wrapper: 'w-full max-w-full'
        }}
      >
        <NavbarContent className='md:hidden'>
          <BurguerButton />
        </NavbarContent>
        <h3>
          {selectedShip?.name
            ? `Barco seleccionado: ${selectedShip?.name}`
            : 'SIN BARCO SELECCIONADO'}
        </h3>
        <NavbarContent className='w-full max-md:hidden'>
          {/* 
          TODO: Acomodar de forma dinamica
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          /> */}
          <div />
        </NavbarContent>
        <NavbarContent
          justify='end'
          className='w-fit data-[justify=end]:flex-grow-0'
        >
          <div className='flex items-center gap-2 max-md:hidden'>
            <FeedbackIcon />
            <span>Feedback?</span>
          </div>

          {/* <NotificationsDropdown /> */}

          {/* <div className='max-md:hidden'>
            <SupportIcon />
          </div> */}

          {/*
          TODO: Decidir si sirve link a algún lado
          <Link
            href="https://github.com/Siumauricio/nextui-dashboard-template"
            target={"_blank"}
          >
            <GithubIcon />
          </Link> */}
          <NavbarContent>
            <DarkModeSwitch />

            {/* <UserDropdown /> */}
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  )
}
