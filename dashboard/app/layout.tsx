import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Social Media Command Center',
  description: 'Premium social media management dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full bg-zinc-950">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
