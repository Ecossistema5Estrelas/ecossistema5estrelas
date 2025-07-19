'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const buttonVariants = {
  default: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:opacity-90',
  outline: 'border border-white text-white hover:bg-white hover:text-black',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  link: 'text-white underline hover:text-yellow-300',
}

const buttonSizes = {
  default: 'px-4 py-2 text-base',
  sm: 'px-3 py-1 text-sm',
  lg: 'px-6 py-3 text-lg',
  icon: 'p-2',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-xl font-bold transition-all duration-200 shadow-md',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
