import { Platform } from '@/lib/types'
import { PLATFORM_NAMES, PLATFORM_COLORS, getPlatformBgColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PlatformBadgeProps {
  platform: Platform
  size?: 'sm' | 'md'
  showName?: boolean
}

export function PlatformBadge({ platform, size = 'md', showName = true }: PlatformBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-md font-medium',
      getPlatformBgColor(platform),
      size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs'
    )}>
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: PLATFORM_COLORS[platform] }}
      />
      {showName && PLATFORM_NAMES[platform]}
    </span>
  )
}
