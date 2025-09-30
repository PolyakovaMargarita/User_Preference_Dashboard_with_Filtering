import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiltersSchema, type Filters } from '../schemas'
import { useGetCategoriesQuery } from '@/store/api/categoriesApi.ts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'

export function FiltersForm({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: Filters) => void
  initialValues?: Partial<Filters>
}) {
  const { data: categories } = useGetCategoriesQuery()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Filters>({ resolver: zodResolver(FiltersSchema), defaultValues: initialValues })

  const submit = (values: Filters) => {
    onSubmit(values)
  }

  // Debounced search state
  const [localSearch, setLocalSearch] = useState<string>(initialValues?.q ?? '')
  const debouncedQ = useDebounce(localSearch, 400)

  useEffect(() => {
    if (debouncedQ !== (watch('q') ?? '')) {
      setValue('q', debouncedQ || undefined, { shouldDirty: true })
      handleSubmit(submit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ])

  const clear = () => {
    reset({
      q: undefined,
      category: undefined,
      min_price: undefined,
      max_price: undefined,
      min_rating: undefined,
      show_favorites: undefined,
    })
    setLocalSearch('')
    handleSubmit(submit)()
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3"
    >
      <div>
        <Label htmlFor="q">Search</Label>
        <Input id="q" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} />
        {errors.q && <p className="text-sm text-red-600 mt-1">{errors.q.message as string}</p>}
      </div>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={field.value == null ? 'all' : String(field.value)}
              onValueChange={(val) => {
                if (val === 'all') return field.onChange(undefined)
                const num = Number(val)
                return field.onChange(Number.isNaN(num) ? val : num)
              }}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories?.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />
      <div className="space-y-2 md:col-span-2">
        <Label>Price</Label>
        <Slider
          min={0}
          max={5000}
          step={10}
          value={[watch('min_price') ?? 0, watch('max_price') ?? 5000]}
          onValueChange={([min, max]) => {
            setValue('min_price', min, { shouldDirty: true })
            setValue('max_price', max, { shouldDirty: true })
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${String(watch('min_price') ?? 0)}</span>
          <span>${String(watch('max_price') ?? 5000)}</span>
        </div>
        {(errors.min_price || errors.max_price) && (
          <p className="text-sm text-red-600 mt-1">
            {(errors.min_price?.message as string) || (errors.max_price?.message as string)}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Min rating</Label>
        <Slider
          min={0}
          max={5}
          step={1}
          value={[watch('min_rating') ?? 0]}
          onValueChange={([min]) => setValue('min_rating', min, { shouldDirty: true })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{String(watch('min_rating') ?? 0)}+</span>
          <span>5</span>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <label className="inline-flex items-center gap-2 text-sm">
          <Checkbox
            checked={!!watch('show_favorites')}
            onCheckedChange={(v) => setValue('show_favorites', Boolean(v))}
          />
          Favorites only
        </label>
      </div>
      <div className="md:col-span-3 flex gap-2">
        <Button type="submit">Apply</Button>
        <Button type="button" onClick={clear} variant="outline">
          Reset
        </Button>
      </div>
    </form>
  )
}
