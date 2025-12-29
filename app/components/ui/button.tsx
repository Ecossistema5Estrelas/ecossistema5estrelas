'use client'

import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'default',
      size = 'default',
      type = 'button',
      ...props
    },
    ref
  ): JSX.Element => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variantClasses = {
      default:
        'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500',
      outline:
        'border border-gray-300 text-white hover:bg-gray-700 focus:ring-gray-500',
      ghost:
        'bg-transparent text-white hover:bg-gray-800 focus:ring-gray-600',
    }

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-12 px-6 text-base',
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button