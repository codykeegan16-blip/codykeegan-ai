'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Platform, ContentStatus } from '@/lib/types'
import { PLATFORM_NAMES, STATUS_LABELS } from '@/lib/utils'
import { Search } from 'lucide-react'

interface ContentFiltersProps {
  onFiltersChange?: (filters: FilterState) => void
  showSearch?: boolean
  showPlatform?: boolean
  showStatus?: boolean
  showCampaign?: boolean
}

export interface FilterState {
  search: string
  platform: Platform | 'all'
  status: ContentStatus | 'all'
  campaign: string | 'all'
}

export function ContentFilters({
  onFiltersChange,
  showSearch = true,
  showPlatform = true,
  showStatus = true,
  showCampaign = false,
}: ContentFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    platform: 'all',
    status: 'all',
    campaign: 'all',
  })

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const platforms: Array<{ value: Platform | 'all'; label: string }> = [
    { value: 'all', label: 'All Platforms' },
    ...Object.entries(PLATFORM_NAMES).map(([k, v]) => ({ value: k as Platform, label: v })),
  ]

  const statuses: Array<{ value: ContentStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Statuses' },
    ...Object.entries(STATUS_LABELS).map(([k, v]) => ({ value: k as ContentStatus, label: v })),
  ]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search content..."
            className="pl-8 w-[200px]"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>
      )}
      {showPlatform && (
        <select
          className="h-9 rounded-md border border-zinc-700 bg-zinc-800/50 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          value={filters.platform}
          onChange={(e) => updateFilter('platform', e.target.value as Platform | 'all')}
        >
          {platforms.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      )}
      {showStatus && (
        <select
          className="h-9 rounded-md border border-zinc-700 bg-zinc-800/50 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value as ContentStatus | 'all')}
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      )}
      {showCampaign && (
        <select
          className="h-9 rounded-md border border-zinc-700 bg-zinc-800/50 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          value={filters.campaign}
          onChange={(e) => updateFilter('campaign', e.target.value)}
        >
          <option value="all">All Campaigns</option>
        </select>
      )}
    </div>
  )
}
