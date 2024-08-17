'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Layout } from '../components/layout/layout'
import LoginForm from '@/components/login-form'
import React, { useState, useEffect } from 'react'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedIsLogged = sessionStorage.getItem('isLogged')
    if (storedIsLogged) {
      setIsLogged(JSON.parse(storedIsLogged))
    }
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted) {
      sessionStorage.setItem('isLogged', JSON.stringify(isLogged))
    }
  }, [isLogged, mounted])

  if (!mounted) {
    return null
  }

  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        {...themeProps}
      >
        {!isLogged ? (
          <LoginForm setIsLogged={setIsLogged} />
        ) : (
          <Layout>{children}</Layout>
        )}
      </NextThemesProvider>
    </NextUIProvider>
  )
}