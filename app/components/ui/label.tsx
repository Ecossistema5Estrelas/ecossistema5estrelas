import { cn } from '@/lib/utils'
import { LabelHTMLAttributes } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
}