'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { PlatformMetrics } from '@/lib/types'

interface DailyEntry {
  date: string
  engagements?: number
  likes?: number
  comments?: number
  shares?: number
}

interface PlatformBarChartProps {
  data: (DailyEntry & PlatformMetrics & { date: string })[]
  color: string
}

function formatLabel(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function getEngagements(entry: DailyEntry & PlatformMetrics): number {
  if (entry.likes !== undefined) {
    return (entry.likes ?? 0) + (entry.comments ?? 0) + (entry.shares ?? 0)
  }
  return 0
}

export function PlatformBarChart({ data, color }: PlatformBarChartProps) {
  const chartData = data.map((d) => ({
    date: formatLabel(d.date),
    engagements: getEngagements(d),
  }))

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={chartData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }} barSize={12}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#52525b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#52525b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: '6px',
            fontSize: 11,
          }}
          labelStyle={{ color: '#a1a1aa' }}
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
        />
        <Bar dataKey="engagements" fill={color} radius={[2, 2, 0, 0]} opacity={0.85} />
      </BarChart>
    </ResponsiveContainer>
  )
}
