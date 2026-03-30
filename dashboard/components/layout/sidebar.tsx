'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Library,
  CalendarDays,
  Monitor,
  BarChart3,
  Target,
  TrendingUp,
  Zap,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/overview' },
  { label: 'Content Library', icon: Library, href: '/content-library' },
  { label: 'Calendar', icon: CalendarDays, href: '/calendar' },
  { label: 'Platform Manager', icon: Monitor, href: '/platform-manager' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Competitors', icon: Target, href: '/competitor-tracker' },
  { label: 'News & Trends', icon: TrendingUp, href: '/trends' },
  { label: 'Control Center', icon: Zap, href: '/control-center' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

const connectedPlatforms = [
  { label: 'TikTok' },
  { label: 'Facebook' },
  { label: 'LinkedIn' },
  { label: 'Threads' },
  { label: 'YouTube' },
  { label: 'X' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-zinc-950 border-r border-zinc-800 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-500/10">
          <Zap className="w-4 h-4 text-indigo-500" />
        </div>
        <span className="text-sm font-bold tracking-widest">
          <span className="text-white">COMMAND</span>
          <br />
          <span className="text-indigo-500 text-[10px] tracking-[0.2em]">CENTER</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-0.5">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-zinc-800 text-white border-l-2 border-indigo-500 pl-[10px]'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border-l-2 border-transparent pl-[10px]'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Platform status */}
      <div className="px-4 py-4 border-t border-zinc-800 flex-shrink-0">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2.5">
          Connected Platforms
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {connectedPlatforms.map(({ label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-[11px] text-zinc-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
