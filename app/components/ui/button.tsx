'use client'

import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils' // se não tiver utilitário cn, remova esse uso

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline'
}

export default function Button({
  children,
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  const base = 'px-4 py-2 rounded font-medium transition duration-200'
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-100',
  }

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className || ''}`}
    >
      {children}
    </button>
  )
}
