'use client'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Layout } from '../components/layout/layout'
import LoginForm from '@/components/login-form'
import React, { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

// Crear el queryClient fuera del componente para que no se reinicie en cada render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, 
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  }
})

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
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools /> 
    </QueryClientProvider>
  )
}