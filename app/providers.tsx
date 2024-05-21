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
  const [isLogged, setIsLogged] = React.useState(false)
  console.log(isLogged)
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
