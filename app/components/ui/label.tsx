'use client'

import type { LabelHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({
  className,
  ...props
}: LabelProps): JSX.Element {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
}