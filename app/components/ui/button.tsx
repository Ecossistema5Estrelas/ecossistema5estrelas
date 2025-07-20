'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'outline' | 'ghost' | 'danger'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-white text-black dark:bg-zinc-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700',
  outline: 'border border-black text-black dark:border-white dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700',
  ghost: 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
}

export default function Button({
  children,
  className = '',
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'px-4 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  )
}

