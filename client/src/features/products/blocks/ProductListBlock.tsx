import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectFilters, setPage, setPerPage } from '@/store/slices/filtersSlice'
import { useGetProductsQuery } from '@/store/api/productsApi.ts'
import { useToggleFavoriteMutation } from '@/features/products/services'
import { useToast } from '@/components/ui/use-toast.tsx'
import { ProductCard } from '@/features/products/components/ProductCard'
import { SkeletonCard } from '@/features/products/components/SkeletonCard'
import { Pagination } from '@/features/products/components/Pagination'

export function ProductListBlock() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)
  const { data, currentData, isLoading, isFetching, isError } = useGetProductsQuery(filters)
  const [toggleFavorite] = useToggleFavoriteMutation()
  const isInitialLoading = isLoading || (isFetching && !currentData)
  const { toast } = useToast?.() ?? { toast: (v: unknown) => v }

  const items = useMemo(() => (currentData ?? data)?.items ?? [], [currentData, data])

  const handleToggleFavorite = useCallback(
    async (id: number, isFavorite?: boolean) => {
      try {
        await toggleFavorite({ id, isFavorite, listArg: filters }).unwrap()
      } catch (e) {
        toast({ title: 'Failed to update favorite' })
      }
    },
    [toggleFavorite, filters, toast],
  )

  const handleChangePage = useCallback((page: number) => dispatch(setPage(page)), [dispatch])
  const handleChangePerPage = useCallback((pp: number) => dispatch(setPerPage(pp)), [dispatch])

  return (
    <>
      {isError && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Failed to load products
        </div>
      )}
      <div
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy={isLoading || isFetching}
      >
        {isInitialLoading &&
          Array.from({ length: filters.per_page }).map((_, i) => <SkeletonCard key={i} />)}
        {!isInitialLoading &&
          items.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                description: p.description,
                category: p.category
                  ? { id: p.category.id, name: p.category.name, slug: p.category.slug }
                  : undefined,
                category_id: p.category_id,
                price: p.price,
                rating: p.rating,
                is_favorite: p.is_favorite ?? p.is_favorited,
                created_at: p.created_at,
                updated_at: p.updated_at,
              }}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        {!isInitialLoading && !isError && items.length === 0 && (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No products found
          </div>
        )}
      </div>
      {(currentData ?? data)?.meta && (
        <Pagination
          meta={(currentData ?? data)!.meta}
          currentPage={filters.page}
          selectedPerPage={filters.per_page}
          onChangePage={handleChangePage}
          onChangePerPage={handleChangePerPage}
        />
      )}
    </>
  )
}
