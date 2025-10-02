import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiltersSchema, type Filters } from '../schemas'
import { useGetCategoriesQuery } from '@/store/api/categoriesApi.ts'
import { Button } from '@/components/ui/button'
import { FilterSearchField } from '@/features/products/components/FilterSearchField'
import { FilterCategorySelect } from '@/features/products/components/FilterCategorySelect'
import { FilterPriceSlider } from '@/features/products/components/FilterPriceSlider'
import { FilterRatingSlider } from '@/features/products/components/FilterRatingSlider'
import { FilterFavoritesToggle } from '@/features/products/components/FilterFavoritesToggle'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'

export function FiltersForm({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: Filters) => void
  initialValues?: Partial<Filters>
}) {
  const {
    data: categories,
    isLoading: isCatsLoading,
    isError: isCatsError,
  } = useGetCategoriesQuery()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Filters>({ resolver: zodResolver(FiltersSchema), defaultValues: initialValues })

  const submit = useCallback(
    (values: Filters) => {
      onSubmit(values)
    },
    [onSubmit],
  )

  const [localSearch, setLocalSearch] = useState<string>(initialValues?.q ?? '')
  const debouncedQ = useDebounce(localSearch, 400)

  useEffect(() => {
    if (debouncedQ !== (watch('q') ?? '')) {
      setValue('q', debouncedQ || undefined, { shouldDirty: true })
      handleSubmit(submit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ])

  const [watchedCategory, watchedMinPrice, watchedMaxPrice, watchedMinRating, watchedFavorites] =
    watch(['category', 'min_price', 'max_price', 'min_rating', 'show_favorites'])

  const debouncedFilters = useDebounce(
    {
      category: watchedCategory,
      min_price: watchedMinPrice,
      max_price: watchedMaxPrice,
      min_rating: watchedMinRating,
      show_favorites: watchedFavorites,
    },
    1000,
  )

  useEffect(() => {
    handleSubmit(submit)()
  }, [debouncedFilters, handleSubmit, submit])

  const clear = useCallback(() => {
    reset({
      q: undefined,
      category: undefined,
      min_price: undefined,
      max_price: undefined,
      min_rating: undefined,
      show_favorites: undefined,
    })
    setValue('category', undefined, { shouldDirty: true })
    setLocalSearch('')
    handleSubmit(submit)()
  }, [handleSubmit, reset, submit, setValue])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3"
    >
      <FilterSearchField
        value={localSearch}
        onChange={setLocalSearch}
        error={errors.q?.message as string | undefined}
      />
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <FilterCategorySelect
            value={field.value}
            onChange={(v) => field.onChange(v)}
            categories={categories}
            isLoading={isCatsLoading}
            isError={isCatsError}
          />
        )}
      />
      <FilterPriceSlider
        min={0}
        max={5000}
        minValue={watch('min_price') ?? 0}
        maxValue={watch('max_price') ?? 5000}
        onChange={(min, max) => {
          setValue('min_price', min, { shouldDirty: true })
          setValue('max_price', max, { shouldDirty: true })
        }}
      />
      {(errors.min_price || errors.max_price) && (
        <p className="text-sm text-red-600 mt-1 md:col-span-2">
          {(errors.min_price?.message as string) || (errors.max_price?.message as string)}
        </p>
      )}
      <FilterRatingSlider
        min={0}
        max={5}
        value={watch('min_rating') ?? 0}
        onChange={(min) => setValue('min_rating', min, { shouldDirty: true })}
      />
      <div className="md:col-span-3 flex gap-2 items-center">
        <div className="">
          <FilterFavoritesToggle
            checked={!!watch('show_favorites')}
            onChange={(v) => setValue('show_favorites', Boolean(v))}
          />
        </div>
        <div className="flex ml-auto">
          <Button type="button" onClick={clear} variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </form>
  )
}
