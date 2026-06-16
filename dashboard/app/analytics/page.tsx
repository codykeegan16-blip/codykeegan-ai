import { AppLayout } from '@/components/layout/app-layout'
import { MetricCard } from '@/components/shared/metric-card'
import { PlatformBadge } from '@/components/shared/platform-badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ReachChart } from '@/components/charts/reach-chart'
import { PlatformBarChart } from '@/components/charts/platform-bar-chart'
import {
  ANALYTICS_OVERVIEW,
  PRIMARY_ACCOUNTS,
  CONTENT_ITEMS,
} from '@/lib/mock-data'
import { formatNumber, PLATFORM_COLORS, PLATFORM_NAMES } from '@/lib/utils'
import type { Platform, ContentItem } from '@/lib/types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function sumVariantMetric(item: ContentItem, key: 'reach' | 'engagements' | 'engagementRate'): number {
  return item.variants.reduce((acc, v) => {
    if (!v.metrics) return acc
    if (key === 'engagements') {
      return acc + ((v.metrics.likes ?? 0) + (v.metrics.comments ?? 0) + (v.metrics.shares ?? 0))
    }
    if (key === 'reach') {
      return acc + (v.metrics.reach ?? 0)
    }
    if (key === 'engagementRate') {
      return acc // handled separately
    }
    return acc
  }, 0)
}

function bestER(item: ContentItem): number {
  return item.variants.reduce((best, v) => {
    const er = v.metrics?.engagementRate ?? 0
    return er > best ? er : best
  }, 0)
}

function totalEngagements(item: ContentItem): number {
  return item.variants.reduce((acc, v) => {
    if (!v.metrics) return acc
    return acc + (v.metrics.likes ?? 0) + (v.metrics.comments ?? 0) + (v.metrics.shares ?? 0)
  }, 0)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { dailyMetrics, platformBreakdown, totalReach, totalImpressions, totalEngagements: engTot, avgEngagementRate } = ANALYTICS_OVERVIEW

  // Published content items (have at least one published variant)
  const publishedItems = CONTENT_ITEMS.filter((item) =>
    item.variants.some((v) => v.status === 'published')
  ).sort((a, b) => {
    const aReach = sumVariantMetric(a, 'reach')
    const bReach = sumVariantMetric(b, 'reach')
    return bReach - aReach
  })

  const platforms: Platform[] = ['tiktok', 'linkedin', 'youtube', 'x', 'facebook', 'threads']

  return (
    <AppLayout title="Analytics">
      <Tabs defaultValue="overview" className="space-y-6">
        {/* Tab bar */}
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-platform">By Platform</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Overview ─────────────────────────────────────────── */}
        <TabsContent value="overview" className="space-y-6">

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard
              title="Total Reach"
              value={formatNumber(totalReach)}
              change="12.4% vs last period"
              changePositive
            />
            <MetricCard
              title="Total Impressions"
              value={formatNumber(totalImpressions)}
              change="8.1% vs last period"
              changePositive
            />
            <MetricCard
              title="Total Engagements"
              value={formatNumber(engTot)}
              change="6.3% vs last period"
              changePositive
            />
            <MetricCard
              title="Avg Engagement Rate"
              value={`${avgEngagementRate}%`}
              change="0.8% vs last period"
              changePositive
            />
          </div>

          {/* 30-day reach chart */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              30-Day Reach by Platform
            </p>
            <ReachChart data={dailyMetrics} />
          </div>

          {/* Platform breakdown cards */}
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Platform Breakdown
            </p>
            <div className="grid grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const breakdown = platformBreakdown[platform]
                const account = PRIMARY_ACCOUNTS.find((a) => a.platform === platform)
                if (!breakdown) return null

                return (
                  <div
                    key={platform}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PLATFORM_COLORS[platform] }}
                      />
                      <span className="text-sm font-semibold text-zinc-100">
                        {PLATFORM_NAMES[platform]}
                      </span>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 gap-y-3">
                      <div>
                        <p className="text-xs text-zinc-500">Followers</p>
                        <p className="text-sm font-bold text-zinc-100 tabular-nums">
                          {account ? formatNumber(account.followers) : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">30d Growth</p>
                        <p className="text-sm font-bold text-emerald-400 tabular-nums">
                          +{formatNumber(breakdown.followerGrowth ?? 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Impressions</p>
                        <p className="text-sm font-bold text-zinc-100 tabular-nums">
                          {formatNumber(breakdown.impressions ?? 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Eng. Rate</p>
                        <p className="text-sm font-bold text-zinc-100 tabular-nums">
                          {(breakdown.engagementRate ?? 0).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* ── Tab 2: By Platform ──────────────────────────────────────── */}
        <TabsContent value="by-platform" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const account = PRIMARY_ACCOUNTS.find((a) => a.platform === platform)
              const breakdown = platformBreakdown[platform]
              if (!account || !breakdown) return null

              const color = PLATFORM_COLORS[platform]

              return (
                <div
                  key={platform}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
                >
                  {/* Platform header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-semibold text-zinc-100">
                        {PLATFORM_NAMES[platform]}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Followers</p>
                      <p className="text-sm font-bold text-zinc-100 tabular-nums">
                        {formatNumber(account.followers)}
                      </p>
                    </div>
                  </div>

                  {/* Follower growth */}
                  <p className="text-xs text-emerald-400 mb-3">
                    +{formatNumber(breakdown.followerGrowth ?? 0)} this month
                  </p>

                  {/* Bar chart — last 7 days engagements */}
                  <div className="mb-3">
                    <p className="text-xs text-zinc-600 mb-1">Last 7 days — engagements</p>
                    <PlatformBarChart data={account.dailyMetrics} color={color} />
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                    <div>
                      <p className="text-xs text-zinc-500">Impressions</p>
                      <p className="text-xs font-semibold text-zinc-200 tabular-nums">
                        {formatNumber(breakdown.impressions ?? 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Reach</p>
                      <p className="text-xs font-semibold text-zinc-200 tabular-nums">
                        {formatNumber(breakdown.reach ?? 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Eng. Rate</p>
                      <p className="text-xs font-semibold text-zinc-200 tabular-nums">
                        {(breakdown.engagementRate ?? 0).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Clicks</p>
                      <p className="text-xs font-semibold text-zinc-200 tabular-nums">
                        {formatNumber(account.metrics.clicks ?? 0)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* ── Tab 3: Content Performance ──────────────────────────────── */}
        <TabsContent value="content">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Content Performance — Published
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-4 py-3 text-zinc-500 font-medium">Title</th>
                    <th className="text-left px-4 py-3 text-zinc-500 font-medium">Platforms</th>
                    <th className="text-right px-4 py-3 text-zinc-500 font-medium">Total Reach</th>
                    <th className="text-right px-4 py-3 text-zinc-500 font-medium">Engagements</th>
                    <th className="text-right px-4 py-3 text-zinc-500 font-medium">Best ER</th>
                    <th className="text-left px-4 py-3 text-zinc-500 font-medium">Status</th>
                    <th className="text-right px-4 py-3 text-zinc-500 font-medium">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedItems.map((item) => {
                    const publishedVariants = item.variants.filter((v) => v.status === 'published')
                    const uniquePlatforms = [...new Set(publishedVariants.map((v) => v.platform))]
                    const reach = sumVariantMetric(item, 'reach')
                    const engagements = totalEngagements(item)
                    const er = bestER(item)

                    // Get earliest published date
                    const publishedDates = publishedVariants
                      .map((v) => v.publishedAt)
                      .filter(Boolean) as string[]
                    const firstPublished = publishedDates.length > 0
                      ? publishedDates.sort()[0]
                      : null
                    const publishedDate = firstPublished
                      ? (() => {
                          const d = new Date(firstPublished)
                          return `${d.getMonth() + 1}/${d.getDate()}`
                        })()
                      : '—'

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <p className="text-zinc-200 font-medium max-w-[260px] truncate">
                            {item.title}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {uniquePlatforms.map((p) => (
                              <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-zinc-200 tabular-nums font-medium">
                          {reach > 0 ? formatNumber(reach) : '—'}
                        </td>
                        <td className="px-4 py-3 text-right text-zinc-200 tabular-nums font-medium">
                          {engagements > 0 ? formatNumber(engagements) : '—'}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums font-medium">
                          <span
                            className={er > 0 ? (er >= 6 ? 'text-emerald-400' : 'text-zinc-200') : 'text-zinc-600'}
                          >
                            {er > 0 ? `${er.toFixed(1)}%` : '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={item.status} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-right text-zinc-500 tabular-nums">
                          {publishedDate}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {publishedItems.length === 0 && (
                <p className="text-xs text-zinc-600 text-center py-8">No published content</p>
              )}
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </AppLayout>
  )
}
