import { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-zinc-100 text-zinc-900',
        secondary: 'border-transparent bg-zinc-800 text-zinc-100',
        destructive: 'border-transparent bg-red-600 text-white',
        outline: 'border-zinc-700 text-zinc-100',
        primary: 'border-transparent bg-indigo-600 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
