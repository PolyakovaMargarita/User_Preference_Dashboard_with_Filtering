import { memo } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CategoryDto } from '@/shared/types/contracts'

function FilterCategorySelectBase({
  value,
  onChange,
  categories,
  isLoading,
  isError,
}: {
  value?: string | number
  onChange: (v: string | number | undefined) => void
  categories?: CategoryDto[]
  isLoading?: boolean
  isError?: boolean
}) {
  return (
    <div>
      <Label htmlFor="category">Category</Label>
      <Select
        value={value == null ? 'all' : String(value)}
        onValueChange={(val) => {
          if (val === 'all') return onChange(undefined)
          const num = Number(val)
          onChange(Number.isNaN(num) ? val : num)
        }}
      >
        <SelectTrigger id="category">
          <SelectValue placeholder={isLoading ? 'Loading…' : 'All'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" disabled={isLoading}>
            All
          </SelectItem>
          {isError && (
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
    </div>
  )
}

export const FilterCategorySelect = memo(FilterCategorySelectBase)
