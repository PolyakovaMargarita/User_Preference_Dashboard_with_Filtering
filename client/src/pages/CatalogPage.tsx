import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { setFilter, selectFilters } from '@/store/slices/filtersSlice'
import { FiltersForm } from '@/features/products/forms/FiltersForm'
import type { Filters } from '@/features/products/schemas'
import { ProductListBlock } from '@/features/products/blocks/ProductListBlock'

export function CatalogPage() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleFiltersSubmit = useCallback(
    (values: Filters) => {
      const mapped = {
        q: values.q || undefined,
        category: values.category
          ? isNaN(Number(values.category))
            ? values.category
            : Number(values.category)
          : undefined,
        min_price: values.min_price,
        max_price: values.max_price,
        min_rating: values.min_rating,
        show_only_favorites: values.show_favorites,
        page: 1,
      }
      dispatch(setFilter(mapped))
    },
    [dispatch],
  )

  const applyFiltersFromUrl = () => {
    const params: Record<string, unknown> = {}
    const q = searchParams.get('q') || undefined
    const page = Number(searchParams.get('page') || '1')
    const per_page = Number(searchParams.get('per_page') || '6')
    const category = searchParams.get('category') || undefined
    const min_price = searchParams.get('min_price')
    const max_price = searchParams.get('max_price')
    const min_rating = searchParams.get('min_rating')
    const favorites = searchParams.get('favorites_only')

    if (q) params.q = q
    if (category) params.category = isNaN(Number(category)) ? category : Number(category)
    if (min_price) params.min_price = Number(min_price)
    if (max_price) params.max_price = Number(max_price)
    if (min_rating) params.min_rating = Number(min_rating)
    if (favorites != null) params.show_only_favorites = favorites === 'true'
    params.page = page
    params.per_page = per_page

    dispatch(setFilter(params))
  }

  const updateUrlFromFilters = useCallback(() => {
    const params = new URLSearchParams()
    if (filters.q) params.set('q', String(filters.q))
    if (filters.category != null) params.set('category', String(filters.category))
    if (filters.min_price != null) params.set('min_price', String(filters.min_price))
    if (filters.max_price != null) params.set('max_price', String(filters.max_price))
    if (filters.min_rating != null) params.set('min_rating', String(filters.min_rating))
    if (filters.show_only_favorites != null)
      params.set('favorites_only', String(Boolean(filters.show_only_favorites)))
    params.set('page', String(filters.page))
    params.set('per_page', String(filters.per_page))

    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  useEffect(() => {
    applyFiltersFromUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateUrlFromFilters()
  }, [filters, setSearchParams, updateUrlFromFilters])

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Catalog</h1>
      <FiltersForm
        initialValues={{
          q: filters.q,
          category: filters.category,
          min_price: filters.min_price,
          max_price: filters.max_price,
          min_rating: filters.min_rating,
          show_favorites: filters.show_only_favorites,
        }}
        onSubmit={handleFiltersSubmit}
      />
      <ProductListBlock />
    </section>
  )
}
