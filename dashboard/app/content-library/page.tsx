'use client'

import { useState, useMemo } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { StatusBadge } from '@/components/shared/status-badge'
import { PlatformBadge } from '@/components/shared/platform-badge'
import { CONTENT_ITEMS, CAMPAIGNS, CAMPAIGN_BY_ID } from '@/lib/mock-data'
import { PLATFORM_NAMES, STATUS_LABELS, CONTENT_TYPE_LABELS } from '@/lib/utils'
import type { ContentItem, ContentVariant, Platform, ContentStatus, PublishIntent } from '@/lib/types'

const PLATFORMS: Platform[] = ['tiktok', 'facebook', 'linkedin', 'threads', 'youtube', 'x']

const STATUSES: ContentStatus[] = [
  'idea', 'drafting', 'review', 'approved', 'scheduled', 'published', 'failed', 'blocked',
]

const INTENTS: PublishIntent[] = [
  'educational', 'promotional', 'authority', 'entertainment',
  'community', 'awareness', 'conversion', 'engagement',
]

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

const PRIORITY_COLORS = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-zinc-500',
}

const INTENT_COLORS: Record<PublishIntent, string> = {
  educational: 'text-sky-400 bg-sky-400/10',
  promotional: 'text-pink-400 bg-pink-400/10',
  authority: 'text-violet-400 bg-violet-400/10',
  entertainment: 'text-yellow-400 bg-yellow-400/10',
  community: 'text-teal-400 bg-teal-400/10',
  awareness: 'text-orange-400 bg-orange-400/10',
  conversion: 'text-red-400 bg-red-400/10',
  engagement: 'text-emerald-400 bg-emerald-400/10',
}

interface SlideOverProps {
  item: ContentItem | null
  onClose: () => void
}

function SlideOver({ item, onClose }: SlideOverProps) {
  if (!item) return null

  const campaign = item.campaignId ? CAMPAIGN_BY_ID[item.campaignId] : null
  const repurposeSource = item.repurposeFrom ? CONTENT_ITEMS.find(c => c.id === item.repurposeFrom) : null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[520px] bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800 flex-shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1.5">
              {item.priority && (
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_COLORS[item.priority]}`} />
              )}
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                {CONTENT_TYPE_LABELS[item.type]}
              </span>
            </div>
            <h2 className="text-base font-semibold text-zinc-100 leading-snug">{item.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Meta row */}
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={item.status} />
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${INTENT_COLORS[item.publishIntent]}`}>
              {item.publishIntent.charAt(0).toUpperCase() + item.publishIntent.slice(1)}
            </span>
            {campaign && (
              <span
                className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: campaign.color + '20', color: campaign.color }}
              >
                {campaign.name}
              </span>
            )}
          </div>

          {/* Hook */}
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1.5">Hook</p>
            <p className="text-sm text-zinc-200 italic leading-relaxed">"{item.hook}"</p>
          </div>

          {/* CTA */}
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1.5">Primary CTA</p>
            <p className="text-sm text-zinc-300">{item.primaryCTA}</p>
          </div>

          {/* Notes */}
          {item.notes && (
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1.5">Notes</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.notes}</p>
            </div>
          )}

          {/* Repurpose from */}
          {repurposeSource && (
            <div className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2.5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1">Repurposed from</p>
              <p className="text-sm text-zinc-300">{repurposeSource.title}</p>
            </div>
          )}

          {/* Variants */}
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-2.5">
              Variants ({item.variants.length})
            </p>
            <div className="space-y-2">
              {item.variants.map((variant: ContentVariant) => {
                const hasMetrics = variant.metrics && (
                  (variant.metrics.impressions ?? 0) > 0 ||
                  (variant.metrics.engagementRate ?? 0) > 0
                )
                return (
                  <div
                    key={variant.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <PlatformBadge platform={variant.platform} size="sm" />
                      <StatusBadge status={variant.status} size="sm" />
                    </div>
                    <div className="text-xs text-zinc-500 italic truncate mb-1.5">
                      "{variant.hook}"
                    </div>
                    {(variant.scheduledAt || variant.publishedAt) && (
                      <div className="text-xs text-zinc-600">
                        {variant.publishedAt
                          ? `Published ${relativeDate(variant.publishedAt)}`
                          : variant.scheduledAt
                            ? `Scheduled ${new Date(variant.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                            : null}
                      </div>
                    )}
                    {variant.failedReason && (
                      <div className="mt-1.5 text-xs text-red-400">{variant.failedReason}</div>
                    )}
                    {variant.blockedReason && (
                      <div className="mt-1.5 text-xs text-orange-400">{variant.blockedReason}</div>
                    )}
                    {hasMetrics && variant.metrics && (
                      <div className="mt-2 flex gap-3 text-xs">
                        {variant.metrics.impressions != null && variant.metrics.impressions > 0 && (
                          <span className="text-zinc-400">
                            <span className="text-zinc-200 font-medium">
                              {variant.metrics.impressions >= 1000
                                ? `${(variant.metrics.impressions / 1000).toFixed(0)}K`
                                : variant.metrics.impressions}
                            </span>{' '}
                            imp
                          </span>
                        )}
                        {variant.metrics.engagementRate != null && variant.metrics.engagementRate > 0 && (
                          <span className="text-zinc-400">
                            <span className="text-zinc-200 font-medium">
                              {variant.metrics.engagementRate.toFixed(1)}%
                            </span>{' '}
                            ER
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ContentLibraryPage() {
  // Filter state
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState<Platform | ''>('')
  const [statusFilter, setStatusFilter] = useState<ContentStatus | ''>('')
  const [campaignFilter, setCampaignFilter] = useState('')
  const [intentFilter, setIntentFilter] = useState<PublishIntent | ''>('')
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)

  // Bulk select
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Action dropdown
  const [openActionId, setOpenActionId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return CONTENT_ITEMS.filter(item => {
      if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false
      if (platformFilter && !item.variants.some(v => v.platform === platformFilter)) return false
      if (statusFilter && item.status !== statusFilter) return false
      if (campaignFilter && item.campaignId !== campaignFilter) return false
      if (intentFilter && item.publishIntent !== intentFilter) return false
      return true
    })
  }, [search, platformFilter, statusFilter, campaignFilter, intentFilter])

  const allSelected = filtered.length > 0 && filtered.every(i => selectedIds.has(i.id))

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(prev => {
        const next = new Set(prev)
        filtered.forEach(i => next.delete(i.id))
        return next
      })
    } else {
      setSelectedIds(prev => {
        const next = new Set(prev)
        filtered.forEach(i => next.add(i.id))
        return next
      })
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Unique platforms in filtered items for display
  function getItemPlatforms(item: ContentItem): Platform[] {
    return [...new Set(item.variants.map(v => v.platform))]
  }

  const selectClass = "bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500"

  return (
    <AppLayout title="Content Library">
      <div className="space-y-4">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-zinc-100">Content Library</h1>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-400">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          {/* View toggle */}
          <div className="flex items-center gap-1 rounded-md border border-zinc-800 p-0.5 bg-zinc-900">
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                view === 'table'
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
            </button>
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                view === 'grid'
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search titles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm rounded-md pl-8 pr-3 py-1.5 w-52 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 placeholder:text-zinc-600"
            />
          </div>

          {/* Platform */}
          <select
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value as Platform | '')}
            className={selectClass}
          >
            <option value="">All Platforms</option>
            {PLATFORMS.map(p => (
              <option key={p} value={p}>{PLATFORM_NAMES[p]}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ContentStatus | '')}
            className={selectClass}
          >
            <option value="">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>

          {/* Campaign */}
          <select
            value={campaignFilter}
            onChange={e => setCampaignFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">All Campaigns</option>
            {CAMPAIGNS.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Intent */}
          <select
            value={intentFilter}
            onChange={e => setIntentFilter(e.target.value as PublishIntent | '')}
            className={selectClass}
          >
            <option value="">All Intents</option>
            {INTENTS.map(i => (
              <option key={i} value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>
            ))}
          </select>

          {/* Clear */}
          {(search || platformFilter || statusFilter || campaignFilter || intentFilter) && (
            <button
              onClick={() => {
                setSearch('')
                setPlatformFilter('')
                setStatusFilter('')
                setCampaignFilter('')
                setIntentFilter('')
              }}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1.5"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── TABLE VIEW ── */}
        {view === 'table' && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                    <th className="w-10 px-3 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-zinc-100 accent-zinc-400 cursor-pointer"
                      />
                    </th>
                    <th className="px-3 py-3 text-left font-medium">Title</th>
                    <th className="px-3 py-3 text-left font-medium">Type</th>
                    <th className="px-3 py-3 text-left font-medium">Status</th>
                    <th className="px-3 py-3 text-left font-medium">Platforms</th>
                    <th className="px-3 py-3 text-left font-medium">Campaign</th>
                    <th className="px-3 py-3 text-left font-medium">Intent</th>
                    <th className="px-3 py-3 text-left font-medium">Variants</th>
                    <th className="px-3 py-3 text-left font-medium">Updated</th>
                    <th className="w-10 px-3 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-3 py-12 text-center text-zinc-600 text-sm">
                        No content items match your filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map(item => {
                      const campaign = item.campaignId ? CAMPAIGN_BY_ID[item.campaignId] : null
                      const platforms = getItemPlatforms(item)
                      const publishedVariants = item.variants.filter(v => v.status === 'published').length

                      return (
                        <tr
                          key={item.id}
                          className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedItem(item)}
                        >
                          {/* Checkbox */}
                          <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(item.id)}
                              onChange={() => toggleSelect(item.id)}
                              className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-zinc-100 accent-zinc-400 cursor-pointer"
                            />
                          </td>

                          {/* Title */}
                          <td className="px-3 py-3 max-w-[260px]">
                            <div className="flex items-center gap-2">
                              {item.priority && (
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PRIORITY_COLORS[item.priority]}`} />
                              )}
                              <span className="font-medium text-zinc-200 truncate">{item.title}</span>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-400">
                              {CONTENT_TYPE_LABELS[item.type]}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <StatusBadge status={item.status} size="sm" />
                          </td>

                          {/* Platforms */}
                          <td className="px-3 py-3">
                            <div className="flex flex-wrap gap-1">
                              {platforms.map(p => (
                                <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                              ))}
                            </div>
                          </td>

                          {/* Campaign */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            {campaign ? (
                              <span
                                className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                                style={{ backgroundColor: campaign.color + '20', color: campaign.color }}
                              >
                                {campaign.name}
                              </span>
                            ) : (
                              <span className="text-zinc-600">—</span>
                            )}
                          </td>

                          {/* Intent */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${INTENT_COLORS[item.publishIntent]}`}>
                              {item.publishIntent.charAt(0).toUpperCase() + item.publishIntent.slice(1)}
                            </span>
                          </td>

                          {/* Variants */}
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className="text-zinc-400 text-xs">
                              <span className="text-zinc-200 font-medium">{publishedVariants}</span>
                              /{item.variants.length} platforms
                            </span>
                          </td>

                          {/* Updated */}
                          <td className="px-3 py-3 whitespace-nowrap text-zinc-500 text-xs">
                            {relativeDate(item.updatedAt)}
                          </td>

                          {/* Actions */}
                          <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                            <div className="relative">
                              <button
                                onClick={() => setOpenActionId(openActionId === item.id ? null : item.id)}
                                className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="5" r="1.5" />
                                  <circle cx="12" cy="12" r="1.5" />
                                  <circle cx="12" cy="19" r="1.5" />
                                </svg>
                              </button>
                              {openActionId === item.id && (
                                <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl z-20 py-1">
                                  {['Edit', 'Duplicate', 'Archive'].map(action => (
                                    <button
                                      key={action}
                                      onClick={() => setOpenActionId(null)}
                                      className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                                        action === 'Archive'
                                          ? 'text-red-400 hover:bg-red-500/10'
                                          : 'text-zinc-300 hover:bg-zinc-800'
                                      }`}
                                    >
                                      {action}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── GRID VIEW ── */}
        {view === 'grid' && (
          <div className="grid grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <div className="col-span-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center text-zinc-600 text-sm">
                No content items match your filters.
              </div>
            ) : (
              filtered.map(item => {
                const platforms = getItemPlatforms(item)
                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 hover:border-zinc-700 hover:bg-zinc-800/40 transition-all cursor-pointer flex flex-col gap-3"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {item.priority && (
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 ${PRIORITY_COLORS[item.priority]}`} />
                        )}
                        <h3 className="text-sm font-medium text-zinc-200 leading-snug line-clamp-2">{item.title}</h3>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-400">
                        {CONTENT_TYPE_LABELS[item.type]}
                      </span>
                      <StatusBadge status={item.status} size="sm" />
                    </div>

                    {/* Platforms */}
                    <div className="flex flex-wrap gap-1">
                      {platforms.map(p => (
                        <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                      ))}
                    </div>

                    {/* Hook */}
                    <p className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2">
                      "{item.hook}"
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-1 border-t border-zinc-800/60">
                      <span className="text-xs text-zinc-600">
                        {item.variants.length} variant{item.variants.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-zinc-600">{relativeDate(item.updatedAt)}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>

      {/* Slide-over */}
      <SlideOver item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Close action dropdowns on outside click */}
      {openActionId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenActionId(null)}
        />
      )}
    </AppLayout>
  )
}
