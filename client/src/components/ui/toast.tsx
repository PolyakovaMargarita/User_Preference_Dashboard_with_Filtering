import * as React from 'react'
import { cn } from '@/lib/utils'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastViewport(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('fixed right-4 top-4 z-50 flex flex-col gap-2', props.className)}
      {...props}
    />
  )
}

export function Toast(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-md border bg-background p-3 shadow-sm',
        props.className,
      )}
      {...props}
    />
  )
}

export function ToastTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm font-medium', className)} {...props} />
}

export function ToastDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export function ToastClose(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Close"
      className={cn(
        'ml-auto rounded-md border px-2 py-1 text-xs hover:bg-accent hover:text-accent-foreground',
      )}
      {...props}
    >
      Close
    </button>
  )
}
