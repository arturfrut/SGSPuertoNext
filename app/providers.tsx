
'use client'
import LoginForm from '@/components/login-form'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'
import { Layout } from '../components/layout/layout'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [isLogged, setIsLogged] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
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