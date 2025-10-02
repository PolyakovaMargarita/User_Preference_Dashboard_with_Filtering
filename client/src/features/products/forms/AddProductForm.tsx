import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddProductFormSchema, type AddProductForm } from '../schemas'
import { useAddProductMutation } from '@/store/api/productsApi.ts'
import { useGetCategoriesQuery } from '@/store/api/categoriesApi.ts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useCreateCategoryMutation } from '@/features/categories/services'
import { useToast } from '@/components/ui/use-toast.tsx'

export function AddProductForm() {
  const [addProduct, { isLoading }] = useAddProductMutation()
  const {
    data: categories,
    isLoading: isCatsLoading,
    isError: isCatsError,
    isFetching: isCatsFetching,
  } = useGetCategoriesQuery()
  const { toast } = useToast?.() ?? { toast: (v: unknown) => v }
  const [createCategory, { isLoading: isCreateCatLoading }] = useCreateCategoryMutation()
  const [isAwaitingCategories, setIsAwaitingCategories] = useState(false)

  useEffect(() => {
    if (isAwaitingCategories && !isCatsFetching) {
      setIsAwaitingCategories(false)
    }
  }, [isAwaitingCategories, isCatsFetching])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProductForm>({ resolver: zodResolver(AddProductFormSchema) })

  const onSubmit = async (values: AddProductForm) => {
    try {
      await addProduct(values).unwrap()
      toast({ title: 'Product created' })
      reset()
    } catch (e) {
      toast({ title: 'Failed to create product' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-lg border p-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} />
      </div>

      <Controller
        control={control}
        name="category_id"
        render={({ field }) => (
          <div>
            <Label htmlFor="category_id">Category</Label>
            <Select
              value={field.value != null ? String(field.value) : ''}
              onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
            >
              <SelectTrigger id="category_id">
                <SelectValue placeholder={isCatsLoading ? 'Loading…' : 'Select a category'} />
              </SelectTrigger>
              <SelectContent>
                {isCatsError && (
                  <SelectItem value="error" disabled>
                    Failed to load categories
                  </SelectItem>
                )}
                {categories?.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="New category name"
                id="new_category_name"
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const name = (e.target as HTMLInputElement).value.trim()
                    if (!name) return
                    try {
                      const cat = await createCategory({ name }).unwrap()
                      field.onChange(cat.id)
                      ;(e.target as HTMLInputElement).value = ''
                      toast({ title: 'Category created' })
                      setIsAwaitingCategories(true)
                    } catch {
                      toast({ title: 'Failed to create category' })
                      setIsAwaitingCategories(false)
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                disabled={isCreateCatLoading}
                onClick={async () => {
                  const input = document.getElementById(
                    'new_category_name',
                  ) as HTMLInputElement | null
                  const name = input?.value.trim()
                  if (!name) return
                  try {
                    const cat = await createCategory({ name }).unwrap()
                    field.onChange(cat.id)
                    if (input) input.value = ''
                    toast({ title: 'Category created' })
                    setIsAwaitingCategories(true)
                  } catch {
                    toast({ title: 'Failed to create category' })
                    setIsAwaitingCategories(false)
                  }
                }}
              >
                Add
              </Button>
            </div>
            {errors.category_id && (
              <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            min={0}
            max={5}
            step={1}
            {...register('rating', { valueAsNumber: true })}
          />
          {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          disabled={isLoading || isCreateCatLoading || (isAwaitingCategories && isCatsFetching)}
          type="submit"
        >
          {isLoading ? 'Saving...' : 'Add product'}
        </Button>
        <Button type="button" onClick={() => reset()} variant="outline">
          Reset
        </Button>
      </div>
    </form>
  )
}
