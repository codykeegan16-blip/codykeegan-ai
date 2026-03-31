import { AppLayout } from '@/components/layout/app-layout'
import { MetricCard } from '@/components/shared/metric-card'
import { PlatformBadge } from '@/components/shared/platform-badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { EngagementChart } from '@/components/charts/engagement-chart'
import {
  CONTENT_ITEMS,
  PRIMARY_ACCOUNTS,
  ANALYTICS_OVERVIEW,
  NOTIFICATIONS,
} from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { PLATFORM_COLORS, PLATFORM_NAMES } from '@/lib/utils'
import type { Platform } from '@/lib/types'

// Notification type-to-style map
const NOTIF_STYLES: Record<string, { dot: string; bg: string; border: string }> = {
  failed:          { dot: 'bg-red-500',    bg: 'bg-red-500/5',    border: 'border-red-500/20' },
  blocked:         { dot: 'bg-orange-400', bg: 'bg-orange-400/5', border: 'border-orange-400/20' },
  approval_needed: { dot: 'bg-indigo-400', bg: 'bg-indigo-400/5', border: 'border-indigo-400/20' },
}

function formatRelativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return 'just now'
}

export default function OverviewPage() {
  const last14 = ANALYTICS_OVERVIEW.dailyMetrics.slice(-14)

  // Sort primary accounts by followers desc
  const sortedAccounts = [...PRIMARY_ACCOUNTS].sort((a, b) => b.followers - a.followers)

  // Last 5 content items (ci_001 through ci_005)
  const recentItems = CONTENT_ITEMS.slice(0, 5)

  // Unread notifications
  const alerts = NOTIFICATIONS.filter((n) => !n.read)

  return (
    <AppLayout title="Overview">
      <div className="space-y-6">

        {/* ── KPI Cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <MetricCard
              title="Total Reach"
              value="1.84M"
              change="12.4% vs last period"
              changePositive
            />
          </div>
          <div className="col-span-2">
            <MetricCard
              title="Total Impressions"
              value="2.96M"
              change="8.1% vs last period"
              changePositive
            />
          </div>
          <div className="col-span-2">
            <MetricCard
              title="Avg Engagement Rate"
              value="6.1%"
              change="0.8% vs last period"
              changePositive
            />
          </div>
          <div className="col-span-2">
            <MetricCard
              title="Total Followers"
              value="359.4K"
              change="+11.2K this month"
              changePositive
            />
          </div>
          <div className="col-span-2">
            <MetricCard
              title="Content Published"
              value="24"
              subtitle="This month"
            />
          </div>
          <div className="col-span-2">
            <MetricCard
              title="Scheduled"
              value="9"
              subtitle="Upcoming"
            />
          </div>
        </div>

        {/* ── Middle Row ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Engagement trend chart */}
          <div className="col-span-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              Engagement by Platform — Last 14 Days
            </p>
            <EngagementChart data={last14} />
          </div>

          {/* Platform performance table */}
          <div className="col-span-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Platform Performance
            </p>
            <div className="space-y-0">
              <div className="grid grid-cols-4 gap-2 pb-2 border-b border-zinc-800">
                <span className="text-xs text-zinc-600 col-span-1">Platform</span>
                <span className="text-xs text-zinc-600 text-right">Followers</span>
                <span className="text-xs text-zinc-600 text-right">30d Growth</span>
                <span className="text-xs text-zinc-600 text-right">ER</span>
              </div>
              {sortedAccounts.map((account) => {
                const breakdown = ANALYTICS_OVERVIEW.platformBreakdown[account.platform as Platform]
                const growth = account.metrics.followerGrowth ?? 0
                const er = account.metrics.engagementRate ?? 0
                return (
                  <div
                    key={account.id}
                    className="grid grid-cols-4 gap-2 py-2 border-b border-zinc-800/50 items-center"
                  >
                    <div className="col-span-1 flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PLATFORM_COLORS[account.platform as Platform] }}
                      />
                      <span className="text-xs text-zinc-300 font-medium truncate">
                        {PLATFORM_NAMES[account.platform as Platform]}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-200 tabular-nums text-right">
                      {formatNumber(account.followers)}
                    </span>
                    <span className="text-xs text-emerald-400 tabular-nums text-right">
                      +{formatNumber(growth)}
                    </span>
                    <span className="text-xs text-zinc-300 tabular-nums text-right">
                      {er.toFixed(1)}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Row ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Recent content */}
          <div className="col-span-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Recent Content
            </p>
            <div className="space-y-0">
              <div className="grid grid-cols-12 gap-2 pb-2 border-b border-zinc-800">
                <span className="text-xs text-zinc-600 col-span-5">Title</span>
                <span className="text-xs text-zinc-600 col-span-2">Status</span>
                <span className="text-xs text-zinc-600 col-span-3">Platforms</span>
                <span className="text-xs text-zinc-600 col-span-2 text-right">Created</span>
              </div>
              {recentItems.map((item) => {
                const publishedVariants = item.variants.filter(
                  (v) => v.status === 'published' || v.status === 'scheduled' || v.status === 'approved'
                )
                const uniquePlatforms = [...new Set(item.variants.map((v) => v.platform))]
                const created = new Date(item.createdAt)
                const dateStr = `${created.getMonth() + 1}/${created.getDate()}`

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 py-2.5 border-b border-zinc-800/50 items-center"
                  >
                    <div className="col-span-5 min-w-0">
                      <p className="text-xs text-zinc-200 font-medium truncate leading-snug">
                        {item.title}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                    <div className="col-span-3 flex flex-wrap gap-1">
                      {uniquePlatforms.map((p) => (
                        <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                      ))}
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-xs text-zinc-500">{dateStr}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Workflow alerts */}
          <div className="col-span-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Needs Attention
            </p>
            <div className="space-y-2">
              {alerts.map((notif) => {
                const style = NOTIF_STYLES[notif.type] ?? {
                  dot: 'bg-zinc-500',
                  bg: 'bg-zinc-800/40',
                  border: 'border-zinc-700',
                }
                return (
                  <div
                    key={notif.id}
                    className={`rounded-md border p-3 ${style.bg} ${style.border}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-200 leading-snug">
                          {notif.title}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                          {notif.message}
                        </p>
                        <p className="text-xs text-zinc-600 mt-1">
                          {formatRelativeTime(notif.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              {alerts.length === 0 && (
                <p className="text-xs text-zinc-600 py-4 text-center">No pending alerts</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}
