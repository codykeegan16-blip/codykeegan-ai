import { ContentStatus } from '@/lib/types'
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: ContentStatus
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-md font-medium',
      STATUS_COLORS[status],
      size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs'
    )}>
      {STATUS_LABELS[status]}
    </span>
  )
}
