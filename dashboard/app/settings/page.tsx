'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { TEAM_MEMBERS, PLATFORM_ACCOUNTS, PLATFORM_CONFIGS } from '@/lib/mock-data'
import { PLATFORM_NAMES, PLATFORM_COLORS } from '@/lib/utils'
import type { Platform } from '@/lib/types'
import { Shield, Bell, Globe, Users } from 'lucide-react'

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`h-9 px-4 text-sm font-medium rounded-md transition-colors ${active ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'}`}>
      {children}
    </button>
  )
}

function Toggle({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-0">
      <div>
        <p className="text-sm text-zinc-200">{label}</p>
        {description && <p className="text-xs text-zinc-500 mt-0.5">{description}</p>}
      </div>
      <button onClick={() => setOn(p => !p)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${on ? 'bg-indigo-600' : 'bg-zinc-700'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  editor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  approver: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  viewer: 'bg-zinc-700/50 text-zinc-400 border border-zinc-700',
}

export default function SettingsPage() {
  const [tab, setTab] = useState<'team' | 'platforms' | 'notifications' | 'workspace'>('team')

  return (
    <AppLayout title="Settings">
      <div className="space-y-5 max-w-4xl">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Settings</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Manage your workspace, team, and integrations</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg w-fit">
          {([
            { id: 'team', label: 'Team', icon: Users },
            { id: 'platforms', label: 'Platforms', icon: Globe },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'workspace', label: 'Workspace', icon: Shield },
          ] as const).map(({ id, label, icon: Icon }) => (
            <Tab key={id} active={tab === id} onClick={() => setTab(id)}>
              <span className="flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" />{label}</span>
            </Tab>
          ))}
        </div>

        {/* ── Team ──────────────────────────────────────────────────────── */}
        {tab === 'team' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-200">Team Members ({TEAM_MEMBERS.length})</h3>
              <button className="h-8 px-3 text-xs font-medium rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">+ Add Member</button>
            </div>
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Member</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="px-4 py-2.5 w-24" />
                  </tr>
                </thead>
                <tbody>
                  {TEAM_MEMBERS.map(member => (
                    <tr key={member.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            {member.initials}
                          </div>
                          <span className="text-sm text-zinc-200 font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${ROLE_COLORS[member.role]}`}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-400 hidden sm:table-cell">{member.email}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="h-6 px-2 text-[10px] rounded border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-colors">Edit</button>
                          {member.role !== 'admin' && (
                            <button className="h-6 px-2 text-[10px] rounded text-red-400 hover:bg-red-500/10 transition-colors">Remove</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Platforms ─────────────────────────────────────────────────── */}
        {tab === 'platforms' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-200">Connected Platforms</h3>
            {(['tiktok', 'facebook', 'linkedin', 'threads', 'youtube', 'x'] as Platform[]).map(platform => {
              const accounts = PLATFORM_ACCOUNTS.filter(a => a.platform === platform)
              const primary = accounts.find(a => a.isPrimary)
              const hasError = accounts.some(a => a.status === 'error')
              return (
                <div key={platform} className={`rounded-lg border bg-zinc-900/50 p-4 ${hasError ? 'border-amber-500/30' : 'border-zinc-800'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[platform] }} />
                      <div>
                        <p className="text-sm font-medium text-zinc-200">{PLATFORM_NAMES[platform]}</p>
                        {primary && <p className="text-xs text-zinc-500 font-mono">{primary.handle} · {primary.followers.toLocaleString()} followers</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasError ? (
                        <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">⚠ Issue</span>
                      ) : (
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Connected</span>
                      )}
                      {primary?.lastSync && (
                        <span className="text-[10px] text-zinc-600 hidden sm:block">
                          Synced {new Date(primary.lastSync).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                      <button className="h-7 px-3 text-xs rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">Reconnect</button>
                      <button className="h-7 px-3 text-xs rounded text-red-400 hover:bg-red-500/10 transition-colors">Disconnect</button>
                    </div>
                  </div>
                  {hasError && (
                    <p className="text-xs text-amber-400 mt-2 pl-5">One or more accounts have connection errors. Click Reconnect to restore access.</p>
                  )}
                  <div className="mt-2 pl-5 flex gap-2 flex-wrap">
                    {accounts.map(a => (
                      <span key={a.id} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {a.handle} ({a.accountType}){a.isPrimary ? ' ★' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Notifications ─────────────────────────────────────────────── */}
        {tab === 'notifications' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-indigo-400" /> Email Notifications</h3>
              <Toggle label="Approval needed" description="When a content item requires your review" defaultOn />
              <Toggle label="Publish failed" description="When a scheduled post fails to publish" defaultOn />
              <Toggle label="Post published" description="Confirmation when content goes live" />
              <Toggle label="Milestone reached" description="Follower counts and engagement milestones" defaultOn />
              <Toggle label="Competitor alert" description="When a tracked competitor posts viral content" />
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-blue-400" /> In-App Notifications</h3>
              <Toggle label="Approval needed" defaultOn />
              <Toggle label="Publish failed" defaultOn />
              <Toggle label="Blocked items" defaultOn />
              <Toggle label="Workflow issues" description="Scheduled without approval, missing assets, etc." defaultOn />
              <Toggle label="Trend alerts" description="New high-score trends in your tracked categories" />
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <span className="w-4 h-4 bg-[#4A154B] rounded flex items-center justify-center text-[8px] text-white font-bold">S</span>
                  Slack Integration
                </h3>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">Not connected</span>
              </div>
              <p className="text-xs text-zinc-500 mb-3">Connect Slack to receive notifications in your team channels.</p>
              <button className="h-8 px-4 text-xs font-medium rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">Connect Slack</button>
            </div>
          </div>
        )}

        {/* ── Workspace ─────────────────────────────────────────────────── */}
        {tab === 'workspace' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-200">General</h3>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5">Workspace Name</label>
                <input defaultValue="Cody Keegan" className="h-9 w-full max-w-sm rounded-md border border-zinc-700 bg-zinc-800/50 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5">Timezone</label>
                <select defaultValue="America/New_York" className="h-9 w-full max-w-sm rounded-md border border-zinc-700 bg-zinc-800/50 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option value="America/New_York">UTC-5 Eastern Time</option>
                  <option value="America/Los_Angeles">UTC-8 Pacific Time</option>
                  <option value="Europe/London">UTC+0 London</option>
                  <option value="Europe/Paris">UTC+1 Paris</option>
                  <option value="Asia/Singapore">UTC+8 Singapore</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5">Data Retention</label>
                <select defaultValue="12" className="h-9 w-full max-w-sm rounded-md border border-zinc-700 bg-zinc-800/50 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3">Default Publish Times</h3>
              <div className="space-y-2">
                {PLATFORM_CONFIGS.map(config => (
                  <div key={config.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PLATFORM_COLORS[config.id as Platform] }} />
                    <span className="text-sm text-zinc-300 w-24 flex-shrink-0">{PLATFORM_NAMES[config.id as Platform]}</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {config.optimalPostTimes.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono border border-zinc-700">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-zinc-900/50 p-4">
              <h3 className="text-sm font-semibold text-red-400 mb-2">Danger Zone</h3>
              <p className="text-xs text-zinc-500 mb-3">Permanently delete all content, analytics, and account data. This cannot be undone.</p>
              <button disabled className="h-8 px-4 text-xs font-medium rounded border border-red-500/30 text-red-500/50 cursor-not-allowed" title="Contact support to delete workspace">
                Delete Workspace
              </button>
            </div>

            <div className="flex justify-end">
              <button className="h-9 px-5 text-sm font-medium rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
