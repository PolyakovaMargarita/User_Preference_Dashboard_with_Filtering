import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { setFilter, selectFilters, resetFilters } from '@/store/slices/filtersSlice'
import { useGetCategoriesQuery } from '@/store/api/categoriesApi.ts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { useDebounce } from '@/shared/hooks/useDebounce'

export function FilterPanel() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)
  const { data: categories } = useGetCategoriesQuery()

  const [localSearch, setLocalSearch] = useState(filters.q ?? '')
  const debounced = useDebounce(localSearch, 400)

  useEffect(() => {
    if (debounced !== (filters.q ?? '')) {
      dispatch(setFilter({ q: debounced || undefined, page: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-2 rounded-lg border p-3 text-sm sm:gap-4 sm:p-4 md:grid-cols-4">
      <div>
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          className="h-9"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Rating</Label>
        <Slider
          min={0}
          max={5}
          step={1}
          value={[filters.min_rating ?? 0]}
          onValueChange={([min]) => dispatch(setFilter({ min_rating: min, page: 1 }))}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{String(filters.min_rating ?? 0)}+</span>
          <span>5</span>
        </div>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          className="mt-1 w-full rounded-md border bg-background px-2 py-1 text-sm sm:px-3 sm:py-2"
          value={filters.category ?? ''}
          onChange={(e) =>
            dispatch(
              setFilter({ category: e.target.value ? Number(e.target.value) : undefined, page: 1 }),
            )
          }
        >
          <option value="">All</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label>Price</Label>
        <Slider
          min={0}
          max={5000}
          step={10}
          value={[filters.min_price ?? 0, filters.max_price ?? 5000]}
          onValueChange={([min, max]) =>
            dispatch(setFilter({ min_price: min, max_price: max, page: 1 }))
          }
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${String(filters.min_price ?? 0)}</span>
          <span>${String(filters.max_price ?? 5000)}</span>
        </div>
      </div>
      <div className="flex items-end gap-2 md:col-span-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <Switch
            checked={Boolean(filters.show_only_favorites)}
            onCheckedChange={(v) =>
              dispatch(setFilter({ show_only_favorites: Boolean(v), page: 1 }))
            }
          />
          Favorites only
        </label>
        <Button
          size="default"
          variant="outline"
          className="ml-auto"
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
