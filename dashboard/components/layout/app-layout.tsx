'use client'
import { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { TopBar } from './topbar'

interface AppLayoutProps {
  children: ReactNode
  title: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
