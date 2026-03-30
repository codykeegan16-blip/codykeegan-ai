'use client'

import { Bell, Search, Plus, User } from 'lucide-react'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="h-14 flex items-center gap-4 px-6 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur flex-shrink-0">
      {/* Left: title + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <h1 className="text-sm font-semibold text-zinc-100 truncate">{title}</h1>
        <span className="text-zinc-600 text-sm hidden sm:inline">/</span>
        <span className="text-xs text-zinc-500 hidden sm:inline truncate">{title}</span>
      </div>

      {/* Center: global search */}
      <div className="relative hidden md:flex items-center w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-8 pl-8 pr-14 rounded-md bg-zinc-800/60 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-colors"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 bg-zinc-700 rounded px-1 py-0.5 pointer-events-none">
          ⌘K
        </span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification bell */}
        <button
          type="button"
          className="relative flex items-center justify-center w-8 h-8 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        {/* New Content button */}
        <button
          type="button"
          className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Content</span>
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex-shrink-0 hover:bg-indigo-500 transition-colors"
          aria-label="User menu"
        >
          CK
        </button>
      </div>
    </header>
  )
}
