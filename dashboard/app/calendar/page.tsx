'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { SCHEDULED_ITEMS, CAMPAIGNS } from '@/lib/mock-data'
import { PLATFORM_COLORS, PLATFORM_NAMES, STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import type { Platform } from '@/lib/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PLATFORMS: Platform[] = ['tiktok', 'facebook', 'linkedin', 'threads', 'youtube', 'x']

// Build April 2026 + late March calendar
const APRIL_DAYS = Array.from({ length: 30 }, (_, i) => `2026-04-${String(i + 1).padStart(2, '0')}`)
const ALL_DATES = ['2026-03-30', '2026-03-31', ...APRIL_DAYS]

// Day of week for April 1 2026 (Wednesday = 3)
const APRIL_START_DOW = 3 // 0=Sun
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getItemsForDate(date: string) {
  return SCHEDULED_ITEMS.filter(item => item.scheduledAt.startsWith(date))
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function PlatformDot({ platform }: { platform: Platform }) {
  return <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: PLATFORM_COLORS[platform] }} />
}

export default function CalendarPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all')

  const filteredItems = SCHEDULED_ITEMS.filter(item =>
    platformFilter === 'all' || item.platform === platformFilter
  )

  // Group list view by week
  const byDate = filteredItems.reduce<Record<string, typeof filteredItems>>((acc, item) => {
    const date = item.scheduledAt.split('T')[0]
    if (!acc[date]) acc[date] = []
    acc[date].push(item)
    return acc
  }, {})
  const sortedDates = Object.keys(byDate).sort()

  // Calendar grid: April 2026
  // Pad start with empties
  const calendarCells: Array<{ date: string | null }> = [
    ...Array.from({ length: APRIL_START_DOW }, () => ({ date: null })),
    ...APRIL_DAYS.map(d => ({ date: d })),
  ]
  // Pad end to complete last row
  while (calendarCells.length % 7 !== 0) calendarCells.push({ date: null })

  const today = '2026-03-30'

  return (
    <AppLayout title="Content Calendar">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Content Calendar</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Schedule and track content across all platforms</p>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex rounded-md border border-zinc-800 overflow-hidden">
              {(['calendar', 'list'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`h-8 px-3 text-xs font-medium capitalize transition-colors ${view === v ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {v}
                </button>
              ))}
            </div>
            {/* Platform filter */}
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value as Platform | 'all')}
              className="h-8 rounded-md border border-zinc-700 bg-zinc-800/50 px-2 text-xs text-zinc-100 focus:outline-none"
            >
              <option value="all">All Platforms</option>
              {PLATFORMS.map(p => <option key={p} value={p}>{PLATFORM_NAMES[p]}</option>)}
            </select>
          </div>
        </div>

        {/* Month navigation */}
        <div className="flex items-center gap-3">
          <button className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-semibold text-zinc-100">April 2026</span>
          <button className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          <span className="text-xs text-zinc-500 ml-1">{filteredItems.length} scheduled items</span>
        </div>

        {view === 'calendar' ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-zinc-800">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="py-2 text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calendarCells.map((cell, i) => {
                if (!cell.date) {
                  return <div key={`empty-${i}`} className="h-28 bg-zinc-900/20 border-r border-b border-zinc-800/50" />
                }
                const dayItems = getItemsForDate(cell.date).filter(item =>
                  platformFilter === 'all' || item.platform === platformFilter
                )
                const dayNum = parseInt(cell.date.split('-')[2])
                const isToday = cell.date === today
                return (
                  <div key={cell.date} className={`h-28 border-r border-b border-zinc-800/50 p-1.5 flex flex-col gap-0.5 ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}`}>
                    <span className={`text-[11px] font-medium w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ${isToday ? 'bg-indigo-600 text-white' : 'text-zinc-400'}`}>
                      {dayNum}
                    </span>
                    <div className="flex flex-col gap-0.5 overflow-hidden flex-1">
                      {dayItems.slice(0, 3).map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-1 px-1 py-0.5 rounded text-[9px] leading-tight truncate"
                          style={{ backgroundColor: `${PLATFORM_COLORS[item.platform]}20`, color: PLATFORM_COLORS[item.platform] }}
                          title={`${PLATFORM_NAMES[item.platform]}: ${item.title}`}
                        >
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: PLATFORM_COLORS[item.platform] }} />
                          <span className="truncate">{item.title}</span>
                        </div>
                      ))}
                      {dayItems.length > 3 && (
                        <span className="text-[9px] text-zinc-500 pl-1">+{dayItems.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* List view */
          <div className="space-y-6">
            {sortedDates.map(date => (
              <div key={date}>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>{formatDate(date)}</span>
                  <span className="text-zinc-700">·</span>
                  <span>{byDate[date].length} item{byDate[date].length !== 1 ? 's' : ''}</span>
                </h3>
                <div className="rounded-lg border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
                  {byDate[date].map(item => {
                    const campaign = CAMPAIGNS.find(c => c.id === item.campaignId)
                    return (
                      <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/30 transition-colors">
                        <span className="text-xs text-zinc-500 w-16 flex-shrink-0 tabular-nums">{formatTime(item.scheduledAt)}</span>
                        <PlatformDot platform={item.platform} />
                        <span className="text-xs text-zinc-300 font-mono">{PLATFORM_NAMES[item.platform]}</span>
                        <span className="text-sm text-zinc-100 flex-1 min-w-0 truncate">{item.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${STATUS_COLORS[item.status]}`}>{STATUS_LABELS[item.status]}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 flex-shrink-0">{item.type}</span>
                        {campaign && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded hidden sm:inline-block flex-shrink-0" style={{ backgroundColor: `${campaign.color}15`, color: campaign.color }}>
                            {campaign.name}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            {sortedDates.length === 0 && (
              <div className="text-center py-16 text-zinc-500 text-sm">No scheduled items for this filter</div>
            )}
          </div>
        )}

        {/* Campaign legend */}
        <div className="flex items-center gap-4 flex-wrap pt-2">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Campaigns:</span>
          {CAMPAIGNS.filter(c => c.status !== 'completed').map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-xs text-zinc-400">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
