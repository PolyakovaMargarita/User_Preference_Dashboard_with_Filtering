import * as React from 'react'
import { cn } from '@/lib/utils'

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('', className)} {...props} />
}

export const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'inline-flex h-9 min-w-9 items-center justify-center whitespace-nowrap rounded-md border px-3 text-sm transition hover:bg-accent hover:text-accent-foreground',
      isActive && 'bg-accent text-accent-foreground',
      className,
    )}
    {...props}
  />
))
PaginationLink.displayName = 'PaginationLink'

export const PaginationPrevious = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
  ({ className, children, ...props }, ref) => (
    <PaginationLink ref={ref} aria-label="Go to previous page" className={className} {...props}>
      {children ?? 'Previous'}
    </PaginationLink>
  ),
)
PaginationPrevious.displayName = 'PaginationPrevious'

export const PaginationNext = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
  ({ className, children, ...props }, ref) => (
    <PaginationLink ref={ref} aria-label="Go to next page" className={className} {...props}>
      {children ?? 'Next'}
    </PaginationLink>
  ),
)
PaginationNext.displayName = 'PaginationNext'

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('px-2 text-muted-foreground', className)} aria-hidden {...props}>
      …
    </span>
  )
}
