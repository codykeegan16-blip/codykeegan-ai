'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { CONTENT_ITEMS, NOTIFICATIONS } from '@/lib/mock-data'
import { PLATFORM_NAMES, PLATFORM_COLORS } from '@/lib/utils'
import type { Platform } from '@/lib/types'
import { AlertTriangle, CheckCircle, XCircle, Clock, RefreshCw, Zap } from 'lucide-react'

type ActionState = Record<string, string>

function PlatformPill({ platform }: { platform: Platform }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium"
      style={{ backgroundColor: `${PLATFORM_COLORS[platform]}15`, color: PLATFORM_COLORS[platform] }}>
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform] }} />
      {PLATFORM_NAMES[platform]}
    </span>
  )
}

export default function ControlCenterPage() {
  const [actioned, setActioned] = useState<ActionState>({})

  const act = (key: string, label: string) => setActioned(prev => ({ ...prev, [key]: label }))
  const isActioned = (key: string) => !!actioned[key]

  // Approval queue: items with variants in 'review' or missing approval
  const approvalItems = CONTENT_ITEMS.filter(item =>
    item.variants.some(v => v.status === 'review') ||
    (item.status === 'scheduled' && !item.approvedBy)
  )

  // Failed variants
  const failedVariants = CONTENT_ITEMS.flatMap(item =>
    item.variants.filter(v => v.status === 'failed').map(v => ({ item, variant: v }))
  )

  // Blocked items
  const blockedItems = CONTENT_ITEMS.filter(item =>
    item.status === 'blocked' || item.variants.some(v => v.status === 'blocked')
  )

  // Workflow issues: scheduled without approval
  const workflowIssues = CONTENT_ITEMS.filter(item =>
    item.status === 'scheduled' && !item.approvedBy
  )

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length
  const failedCount = failedVariants.length
  const blockedCount = blockedItems.length

  return (
    <AppLayout title="Control Center">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Control Center</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Review and act on pending items across all platforms</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Clock className="w-3 h-3" /> {approvalItems.length} approvals
            </span>
            <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">
              <XCircle className="w-3 h-3" /> {failedCount} failed
            </span>
            <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <AlertTriangle className="w-3 h-3" /> {blockedCount} blocked
            </span>
          </div>
        </div>

        {/* ── Section 1: Approval Queue ─────────────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> Approval Queue ({approvalItems.length})
          </h3>
          <div className="space-y-3">
            {approvalItems.map(item => {
              const key = `approve-${item.id}`
              const warned = item.status === 'scheduled' && !item.approvedBy
              return (
                <div key={item.id} className={`rounded-lg border bg-zinc-900/50 overflow-hidden ${warned ? 'border-red-500/30' : 'border-zinc-800'}`}>
                  {warned && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/5 border-b border-red-500/20">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="text-xs text-red-400 font-medium">Scheduled without approval — review required before publish date</span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-100 mb-1 truncate">{item.title}</p>
                        <p className="text-xs text-zinc-400 italic mb-2 line-clamp-1">"{item.hook}"</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.variants.filter(v => v.status === 'review' || v.status === 'approved').map(v => (
                            <PlatformPill key={v.id} platform={v.platform} />
                          ))}
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">{item.publishIntent}</span>
                        </div>
                      </div>
                      {!isActioned(key) ? (
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => act(key, 'approved')}
                            className="h-8 px-3 text-xs font-medium rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                            Approve
                          </button>
                          <button onClick={() => act(key, 'changes-requested')}
                            className="h-8 px-3 text-xs font-medium rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                            Request Changes
                          </button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-400 flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {actioned[key] === 'approved' ? 'Approved' : 'Changes requested'}
                        </span>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-zinc-600 mt-2 border-l-2 border-zinc-800 pl-2">{item.notes}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Section 2: Failed Posts ────────────────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <XCircle className="w-3.5 h-3.5 text-red-400" /> Failed Posts ({failedVariants.length})
          </h3>
          <div className="space-y-3">
            {failedVariants.map(({ item, variant }) => {
              const key = `retry-${variant.id}`
              return (
                <div key={variant.id} className="rounded-lg border border-red-500/20 bg-zinc-900/50 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-2 bg-red-500/5 border-b border-red-500/10">
                    <PlatformPill platform={variant.platform} />
                    <span className="text-sm font-medium text-zinc-200 truncate flex-1">{item.title}</span>
                    {variant.publishedAt && (
                      <span className="text-[10px] text-zinc-500 flex-shrink-0">
                        {new Date(variant.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 mb-3">
                      <p className="text-[11px] text-red-300 font-mono leading-relaxed">{variant.failedReason}</p>
                    </div>
                    {!isActioned(key) ? (
                      <div className="flex gap-2">
                        <button onClick={() => act(key, 'retried')}
                          className="h-7 px-3 text-xs font-medium rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5">
                          <RefreshCw className="w-3 h-3" /> Retry
                        </button>
                        <button onClick={() => act(key, 'edited')}
                          className="h-7 px-3 text-xs rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                          Edit & Resubmit
                        </button>
                        <button onClick={() => act(key, 'dismissed')}
                          className="h-7 px-3 text-xs rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
                          Dismiss
                        </button>
                      </div>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        {actioned[key] === 'retried' ? 'Retry queued' : actioned[key] === 'edited' ? 'Opened for edit' : 'Dismissed'}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Section 3: Blocked Items ───────────────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" /> Blocked Items ({blockedItems.length})
          </h3>
          <div className="space-y-3">
            {blockedItems.map(item => {
              const blockedVariants = item.variants.filter(v => v.status === 'blocked')
              const key = `unblock-${item.id}`
              return (
                <div key={item.id} className="rounded-lg border border-orange-500/20 bg-zinc-900/50 overflow-hidden">
                  <div className="px-4 py-2 bg-orange-500/5 border-b border-orange-500/10 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-zinc-200 flex-1 truncate">{item.title}</span>
                    <div className="flex gap-1">
                      {blockedVariants.map(v => <PlatformPill key={v.id} platform={v.platform} />)}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {(item.status === 'blocked' ? [{ blockedReason: item.notes }] : blockedVariants).map((v, i) => (
                      <div key={i} className="rounded-md bg-orange-500/5 border border-orange-500/20 px-3 py-2">
                        <p className="text-[11px] text-orange-300 leading-relaxed">{(v as { blockedReason?: string }).blockedReason || item.notes}</p>
                      </div>
                    ))}
                    {!isActioned(key) ? (
                      <div className="flex gap-2 pt-1">
                        <button onClick={() => act(key, 'resolved')}
                          className="h-7 px-3 text-xs rounded border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                          Mark Resolved
                        </button>
                        <button onClick={() => act(key, 'reassigned')}
                          className="h-7 px-3 text-xs rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                          Reassign
                        </button>
                        <button onClick={() => act(key, 'escalated')}
                          className="h-7 px-3 text-xs rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                          Escalate
                        </button>
                      </div>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" /> {actioned[key] === 'resolved' ? 'Marked resolved' : actioned[key] === 'reassigned' ? 'Reassigned' : 'Escalated'}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Section 4: Workflow Issues ─────────────────────────────────── */}
        {workflowIssues.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> Workflow Issues ({workflowIssues.length})
            </h3>
            <div className="space-y-3">
              {workflowIssues.map(item => {
                const key = `workflow-${item.id}`
                const scheduledVariants = item.variants.filter(v => v.status === 'scheduled')
                return (
                  <div key={item.id} className="rounded-lg border border-yellow-500/20 bg-zinc-900/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-zinc-100 mb-1">{item.title}</p>
                        <p className="text-xs text-zinc-400 mb-2">
                          <span className="text-yellow-400 font-medium">Status:</span> Scheduled without editorial approval sign-off.{' '}
                          {scheduledVariants.length} variant{scheduledVariants.length !== 1 ? 's' : ''} will publish automatically.
                        </p>
                        <div className="flex gap-1 flex-wrap">
                          {scheduledVariants.map(v => (
                            <div key={v.id} className="flex items-center gap-1">
                              <PlatformPill platform={v.platform} />
                              {v.scheduledAt && (
                                <span className="text-[10px] text-zinc-500">
                                  {new Date(v.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      {!isActioned(key) ? (
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => act(key, 'pulled')}
                            className="h-7 px-3 text-xs rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                            Pull from Schedule
                          </button>
                          <button onClick={() => act(key, 'fast-tracked')}
                            className="h-7 px-3 text-xs rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                            Fast-track Approval
                          </button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-400 flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {actioned[key] === 'pulled' ? 'Pulled from schedule' : 'Sent for approval'}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  )
}
