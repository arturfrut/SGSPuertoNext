import { fontSans } from '@/config/fonts'
import '@/styles/globals.css'

import clsx from 'clsx'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'SGS',
  description: 'Sistema  de gestión de seguridad'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={clsx('font-sans antialiased', fontSans.className)}>
        <Providers>
          <div className='p-4 flex justify-center'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
