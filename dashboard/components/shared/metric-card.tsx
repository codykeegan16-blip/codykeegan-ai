import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changePositive?: boolean
  icon?: LucideIcon
  iconColor?: string
  subtitle?: string
}

export function MetricCard({ title, value, change, changePositive, icon: Icon, iconColor, subtitle }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">{title}</p>
            <p className="text-2xl font-bold text-zinc-100 tabular-nums">{value}</p>
            {change && (
              <p className={cn('text-xs mt-1 font-medium', changePositive ? 'text-emerald-400' : 'text-red-400')}>
                {changePositive ? '↑' : '↓'} {change}
              </p>
            )}
            {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
          </div>
          {Icon && (
            <div className={cn('p-2 rounded-lg', iconColor || 'bg-zinc-800')}>
              <Icon className="w-4 h-4 text-zinc-300" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
