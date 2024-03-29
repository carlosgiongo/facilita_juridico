import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Facilita Juridico - Teste prático',
  description: 'Desenvolvido por Carlos Giongo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      style={{
        margin: 0
      }}
      className={inter.className}>{children}</body>
    </html>
  )
}
