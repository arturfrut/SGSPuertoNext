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
    <html lang='en'>
      <body className={clsx('font-sans antialiased', fontSans.className)}>
        <Providers>
          <div className='px-4'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
