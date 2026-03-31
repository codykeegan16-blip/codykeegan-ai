'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { DailyMetric } from '@/lib/types'

interface ReachChartProps {
  data: DailyMetric[]
}

const PLATFORM_COLORS = {
  tiktok: '#FF0050',
  linkedin: '#0A66C2',
  x: '#1DA1F2',
  youtube: '#FF0000',
  facebook: '#1877F2',
  threads: '#a1a1aa',
} as const

function formatLabel(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function ReachChart({ data }: ReachChartProps) {
  const chartData = data.map((d) => ({
    date: formatLabel(d.date),
    tiktok: d.tiktok ?? 0,
    linkedin: d.linkedin ?? 0,
    x: d.x ?? 0,
    youtube: d.youtube ?? 0,
    facebook: d.facebook ?? 0,
    threads: d.threads ?? 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
        <defs>
          {Object.entries(PLATFORM_COLORS).map(([key, color]) => (
            <linearGradient key={key} id={`rgrad-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#71717a', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={4}
        />
        <YAxis
          tick={{ fill: '#71717a', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            fontSize: 12,
          }}
          labelStyle={{ color: '#a1a1aa' }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => <span style={{ color: '#a1a1aa' }}>{value.charAt(0).toUpperCase() + value.slice(1)}</span>}
        />
        {Object.entries(PLATFORM_COLORS).map(([key, color]) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#rgrad-${key})`}
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
