import { AppLayout } from '@/components/layout/app-layout'
import { COMPETITORS, COMPETITOR_SCORES } from '@/lib/mock-data'
import { formatNumber, PLATFORM_NAMES, PLATFORM_COLORS } from '@/lib/utils'
import type { Platform } from '@/lib/types'

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-400 w-28 truncate flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold tabular-nums w-6 text-right flex-shrink-0" style={{ color }}>{score}</span>
    </div>
  )
}

function GrowthBadge({ value }: { value: number }) {
  const color = value >= 1 ? 'text-emerald-400' : value >= 0 ? 'text-amber-400' : 'text-red-400'
  const arrow = value >= 0 ? '↑' : '↓'
  return <span className={`text-xs font-medium ${color}`}>{arrow} {Math.abs(value).toFixed(1)}%/wk</span>
}

export default function CompetitorTrackerPage() {
  return (
    <AppLayout title="Competitor Tracker">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Competitor Tracker</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Track competitor performance across platforms</p>
          </div>
          <span className="text-xs text-zinc-500">Updated Mar 30, 2026</span>
        </div>

        {/* Comparison scores overview */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Overall Competitive Score (1–100)</p>
          <div className="space-y-3">
            {COMPETITORS.map(comp => {
              const scores = COMPETITOR_SCORES[comp.id]
              return (
                <div key={comp.id} className="flex items-center gap-3">
                  <span className="text-sm text-zinc-300 w-40 truncate flex-shrink-0">{comp.name}</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${scores.overall}%`,
                        backgroundColor: scores.overall >= 70 ? '#10b981' : scores.overall >= 50 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold tabular-nums w-8 text-right flex-shrink-0 text-zinc-100">{scores.overall}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Competitor cards */}
        <div className="space-y-4">
          {COMPETITORS.map(comp => {
            const scores = COMPETITOR_SCORES[comp.id]
            return (
              <div key={comp.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                {/* Card header */}
                <div className="flex items-start justify-between p-4 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-zinc-100">{comp.name}</h3>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${scores.overall >= 70 ? 'bg-emerald-500/10 text-emerald-400' : scores.overall >= 50 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                        {scores.overall}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{comp.industry}</p>
                    {comp.website && <a href="#" className="text-xs text-indigo-400 hover:underline">{comp.website}</a>}
                  </div>
                  <div className="w-48 space-y-1.5">
                    <ScoreBar score={scores.reach} label="Reach" />
                    <ScoreBar score={scores.engagement} label="Engagement" />
                    <ScoreBar score={scores.consistency} label="Consistency" />
                    <ScoreBar score={scores.trend} label="Trend" />
                  </div>
                </div>

                {/* Strengths + weaknesses */}
                <div className="grid grid-cols-2 gap-4 p-4 border-b border-zinc-800">
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Strengths</p>
                    <ul className="space-y-1">
                      {comp.strengths.slice(0, 3).map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                          <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Weaknesses</p>
                    <ul className="space-y-1">
                      {comp.weaknesses.slice(0, 3).map((w, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                          <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Platform breakdown */}
                <div className="p-4">
                  <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Platform Presence</p>
                  <div className="space-y-4">
                    {comp.platforms.map(plat => (
                      <div key={plat.platform} className="rounded-md border border-zinc-800 bg-zinc-900/80 p-3">
                        {/* Platform header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[plat.platform as Platform] }} />
                            <span className="text-sm font-medium text-zinc-200">{PLATFORM_NAMES[plat.platform as Platform]}</span>
                            <span className="text-xs text-zinc-500 font-mono">{plat.handle}</span>
                          </div>
                          <GrowthBadge value={plat.weeklyGrowth} />
                        </div>
                        {/* Platform metrics */}
                        <div className="grid grid-cols-4 gap-3 mb-3">
                          <div>
                            <p className="text-[10px] text-zinc-500 mb-0.5">Followers</p>
                            <p className="text-sm font-bold text-zinc-100 tabular-nums">{formatNumber(plat.followers)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 mb-0.5">Avg ER</p>
                            <p className="text-sm font-bold text-zinc-100 tabular-nums">{plat.avgEngagementRate}%</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 mb-0.5">Posts/Wk</p>
                            <p className="text-sm font-bold text-zinc-100 tabular-nums">{plat.postsPerWeek}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 mb-0.5">Top Format</p>
                            <p className="text-sm font-bold text-zinc-100">{plat.topContentType}</p>
                          </div>
                        </div>
                        {/* Recent posts */}
                        <div className="space-y-1.5">
                          {plat.recentPosts.slice(0, 2).map(post => (
                            <div key={post.id} className="flex items-start gap-2 text-xs">
                              <span className="text-[10px] px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 flex-shrink-0 mt-0.5">{post.type}</span>
                              <span className="text-zinc-400 flex-1 min-w-0 line-clamp-1">{post.caption.slice(0, 90)}{post.caption.length > 90 ? '…' : ''}</span>
                              <div className="flex items-center gap-2 text-zinc-500 flex-shrink-0">
                                <span>♥ {formatNumber(post.likes)}</span>
                                <span>💬 {formatNumber(post.comments)}</span>
                                {post.views && <span>👁 {formatNumber(post.views)}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {comp.notes && (
                  <div className="px-4 pb-4">
                    <p className="text-[10px] text-zinc-500 italic border-l-2 border-zinc-700 pl-2">{comp.notes}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}
