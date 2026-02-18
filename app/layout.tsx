import type { Metadata, Viewport } from 'next'
import './globals.css'
import SWRegister from '@/components/sw-register'

export const metadata: Metadata = {
  title: 'English 90 — 90 Days to Fluency',
  description: 'A 90-day English practice plan with spaced repetition.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'English 90' },
}

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SWRegister />
        {children}
      </body>
    </html>
  )
}
