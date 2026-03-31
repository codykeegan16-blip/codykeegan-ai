import { AppLayout } from '@/components/layout/app-layout'
import { TRENDS } from '@/lib/mock-data'
import { PLATFORM_COLORS, PLATFORM_NAMES } from '@/lib/utils'
import type { Platform } from '@/lib/types'

const VELOCITY_STYLES = {
  rising: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
  peak: 'text-amber-400 bg-amber-400/10 border border-amber-400/20',
  fading: 'text-zinc-400 bg-zinc-400/10 border border-zinc-700',
}
const VELOCITY_LABELS = { rising: '↑ Rising', peak: '◆ Peak', fading: '↓ Fading' }

function TrendScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? '#ef4444' : score >= 70 ? '#f59e0b' : '#3b82f6'
  const label = score >= 85 ? 'Hot' : score >= 70 ? 'Warm' : 'Tracking'
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-8 h-8 -rotate-90">
          <circle cx="16" cy="16" r="13" fill="none" stroke="#27272a" strokeWidth="3" />
          <circle cx="16" cy="16" r="13" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${(score / 100) * 81.68} 81.68`} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold" style={{ color }}>{score}</span>
      </div>
      <span className="text-[10px] font-semibold" style={{ color }}>{label}</span>
    </div>
  )
}

export default function TrendsPage() {
  return (
    <AppLayout title="News & Trends">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">News & Trends</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Platform-specific content angles for trending topics</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live feed · {TRENDS.length} trends tracked
          </div>
        </div>

        {/* Trend grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {TRENDS.map(trend => (
            <div key={trend.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden flex flex-col">
              {/* Card header */}
              <div className="p-4 border-b border-zinc-800">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <TrendScoreBadge score={trend.trendScore} />
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${VELOCITY_STYLES[trend.velocity]}`}>
                      {VELOCITY_LABELS[trend.velocity]}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{trend.category}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600 flex-shrink-0">
                    {new Date(trend.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">{trend.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2">{trend.summary}</p>
                <p className="text-[10px] text-zinc-600 mt-1.5">via {trend.source}</p>
              </div>

              {/* Platform tags */}
              <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-1.5 flex-wrap">
                {trend.platforms.map(p => (
                  <span key={p} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium"
                    style={{ backgroundColor: `${PLATFORM_COLORS[p as Platform]}15`, color: PLATFORM_COLORS[p as Platform] }}>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[p as Platform] }} />
                    {PLATFORM_NAMES[p as Platform]}
                  </span>
                ))}
              </div>

              {/* Platform angles */}
              <div className="flex-1 divide-y divide-zinc-800/50">
                {trend.platforms.map(p => {
                  const angle = trend.platformAngles[p as Platform]
                  if (!angle) return null
                  return (
                    <div key={p} className="p-3 hover:bg-zinc-800/20 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: PLATFORM_COLORS[p as Platform] }} />
                        <span className="text-[10px] font-semibold text-zinc-400">{PLATFORM_NAMES[p as Platform]}</span>
                        <span className="text-[10px] px-1 py-0.5 rounded bg-zinc-800 text-zinc-500">{angle.contentType}</span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-200 mb-1 line-clamp-1">"{angle.hook}"</p>
                      <p className="text-[11px] text-zinc-500 italic mb-1.5 line-clamp-1">{angle.angle}</p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1 flex-wrap">
                          {angle.hashtags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] text-zinc-600">{tag}</span>
                          ))}
                        </div>
                        <button className="text-[10px] px-2 py-0.5 rounded border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors flex-shrink-0">
                          {angle.suggestedCTA}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
