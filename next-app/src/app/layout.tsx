import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Haywood Universal - Construction & Property Management',
  description: 'Professional construction and property management services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
