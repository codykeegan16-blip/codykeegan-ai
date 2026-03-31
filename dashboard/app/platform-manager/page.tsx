import { AppLayout } from '@/components/layout/app-layout'
import { PLATFORM_ACCOUNTS, PLATFORM_CONFIGS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { PLATFORM_COLORS, PLATFORM_NAMES } from '@/lib/utils'
import type { Platform, PlatformAccount } from '@/lib/types'

const STATUS_STYLES = {
  active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  disconnected: 'bg-zinc-700/50 text-zinc-400 border border-zinc-700',
  error: 'bg-red-500/10 text-red-400 border border-red-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex items-end gap-0.5 h-8">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-indigo-500/60"
          style={{ height: `${Math.max(4, (v / max) * 32)}px` }}
        />
      ))}
    </div>
  )
}

function AccountRow({ account }: { account: PlatformAccount }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
      <div className="flex items-center gap-2 min-w-0">
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${account.status === 'active' ? 'bg-emerald-500' : account.status === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
        <span className="text-sm text-zinc-200 font-mono truncate">{account.handle}</span>
        <span className="text-xs text-zinc-500">{account.accountType}</span>
        {account.isPrimary && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">Primary</span>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-2">
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${STATUS_STYLES[account.status]}`}>
          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
        </span>
        {account.lastSync && (
          <span className="text-[10px] text-zinc-500 hidden sm:block">
            Synced {new Date(account.lastSync).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
    </div>
  )
}

function PlatformCard({ platform }: { platform: Platform }) {
  const config = PLATFORM_CONFIGS.find(c => c.id === platform)
  const accounts = PLATFORM_ACCOUNTS.filter(a => a.platform === platform)
  const primary = accounts.find(a => a.isPrimary)
  const hasError = accounts.some(a => a.status === 'error' || a.status === 'disconnected')
  const color = PLATFORM_COLORS[platform]
  const sparklineValues = primary?.dailyMetrics.map(d => d.engagementRate ?? 0) ?? []

  if (!primary || !config) return null

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">{PLATFORM_NAMES[platform]}</h3>
            <p className="text-xs text-zinc-500 font-mono">{primary.handle}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded font-medium ${STATUS_STYLES[primary.status]}`}>
          {primary.status === 'active' ? 'Connected' : primary.status}
        </span>
      </div>

      {/* Error banner */}
      {hasError && (
        <div className="px-4 py-2 bg-amber-500/5 border-b border-amber-500/20 flex items-center gap-2">
          <span className="text-amber-400 text-xs">⚠</span>
          <span className="text-xs text-amber-400">One or more accounts have connection issues</span>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-px bg-zinc-800 border-b border-zinc-800">
        {[
          { label: 'Followers', value: formatNumber(primary.followers) },
          { label: '30d Impressions', value: formatNumber(primary.metrics.impressions ?? 0) },
          { label: 'Eng. Rate', value: `${primary.metrics.engagementRate ?? 0}%` },
          { label: 'Follower Growth', value: `+${formatNumber(primary.metrics.followerGrowth ?? 0)}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-zinc-900/80 p-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-sm font-bold text-zinc-100 tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {/* Sparkline */}
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">7-Day Engagement Rate</p>
          <Sparkline values={sparklineValues} />
        </div>

        {/* Platform constraints */}
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Platform Constraints</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
            {config.maxVideoSeconds && <span>Max video: {config.maxVideoSeconds}s</span>}
            {config.maxCharacters && <span>Max chars: {config.maxCharacters.toLocaleString()}</span>}
            {config.maxHashtags && <span>Max hashtags: {config.maxHashtags}</span>}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {config.supportedContentTypes.map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{t}</span>
            ))}
          </div>
        </div>

        {/* Optimal post times */}
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Optimal Post Times</p>
          <div className="flex gap-1.5 flex-wrap">
            {config.optimalPostTimes.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">{t}</span>
            ))}
          </div>
        </div>

        {/* Connected accounts */}
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Connected Accounts ({accounts.length})</p>
          <div>
            {accounts.map(acc => <AccountRow key={acc.id} account={acc} />)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button className="h-7 px-3 text-xs rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">Sync Now</button>
          <button className="h-7 px-3 text-xs rounded text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">View Posts</button>
          <button className="h-7 px-3 text-xs rounded text-red-400 hover:bg-red-500/10 transition-colors ml-auto">Disconnect</button>
        </div>
      </div>
    </div>
  )
}

const PLATFORMS: Platform[] = ['tiktok', 'facebook', 'linkedin', 'threads', 'youtube', 'x']

export default function PlatformManagerPage() {
  return (
    <AppLayout title="Platform Manager">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Platform Manager</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Manage connected accounts and monitor per-platform health</p>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {PLATFORMS.map(platform => {
            const primary = PLATFORM_ACCOUNTS.find(a => a.platform === platform && a.isPrimary)
            const hasError = PLATFORM_ACCOUNTS.filter(a => a.platform === platform).some(a => a.status === 'error')
            return (
              <div key={platform} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 flex flex-col items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform] }} />
                <span className="text-[10px] font-medium text-zinc-300">{PLATFORM_NAMES[platform]}</span>
                <span className="text-[10px] text-zinc-500">{formatNumber(primary?.followers ?? 0)}</span>
                {hasError && <span className="text-[9px] text-amber-400">⚠ issue</span>}
              </div>
            )
          })}
        </div>

        {/* Platform cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PLATFORMS.map(platform => (
            <PlatformCard key={platform} platform={platform} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
