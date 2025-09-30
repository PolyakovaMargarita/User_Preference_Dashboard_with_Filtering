import type { PaginationMeta } from '@/api/types/contracts'
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

type Props = {
  meta: PaginationMeta
  onChangePage: (page: number) => void
  onChangePerPage?: (perPage: number) => void
  currentPage?: number
  selectedPerPage?: number
}

export function Pagination({
  meta,
  onChangePage,
  onChangePerPage,
  currentPage,
  selectedPerPage,
}: Props) {
  const current = (currentPage ?? Number(meta.current_page)) || 1
  const last = Number(meta.last_page) || 1
  const perPage = (selectedPerPage ?? Number(meta.per_page)) || 12

  const isPrevDisabled = current <= 1
  const isNextDisabled = current >= last

  const prev: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    if (isPrevDisabled) return
    onChangePage(Math.max(1, current - 1))
  }
  const next: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    if (isNextDisabled) return
    onChangePage(Math.min(last, current + 1))
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 justify-center sm:justify-between text-center sm:text-left">
      <ShadPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={prev}
              href="#"
              role="button"
              className={
                isPrevDisabled
                  ? 'pointer-events-none opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }
              aria-disabled={isPrevDisabled}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={next}
              href="#"
              role="button"
              className={
                isNextDisabled
                  ? 'pointer-events-none opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }
              aria-disabled={isNextDisabled}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>

      {onChangePerPage && (
        <select
          className="rounded-md border bg-background px-2 py-1 text-sm"
          onChange={(e) => onChangePerPage(Number(e.target.value))}
          value={perPage}
        >
          {[6, 12, 24, 48].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      )}
      <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
        Page {current} of {last} • Total: {meta.total}
      </div>
    </div>
  )
}
