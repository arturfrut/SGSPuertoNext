import clsx from 'clsx'
import NextLink from 'next/link'
import React from 'react'
import { useSidebarContext } from '../layout/layout-context'

interface Props {
  title: string
  icon: React.ReactNode
  isActive?: boolean
  href?: string
  isDisabled?: boolean
}

export const SidebarItem = ({
  icon,
  title,
  isActive,
  href = '',
  isDisabled
}: Props) => {
  const { setCollapsed } = useSidebarContext()
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed()
    }
  }
  console.log(isDisabled)
  return (
    <NextLink
      href={isDisabled ? '#' : href}
      className={`text-default-900 active:bg-none max-w-full ${
        isDisabled && 'pointer-events-none'
      }`}
    >
      <div
        className={clsx(
          isActive
            ? 'bg-primary-100 [&_svg_path]:fill-primary-500'
            : 'hover:bg-default-100',
          'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]'
        )}
        onClick={handleClick}
      >
        {icon}
        <span
          className={clsx('text-default-900', isDisabled && 'text-gray-700')}
        >
          {title}
        </span>
      </div>
    </NextLink>
  )
}
