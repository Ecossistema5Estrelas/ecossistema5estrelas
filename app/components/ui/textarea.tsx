import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[100px] w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea