import { memo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function FilterSearchFieldBase({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <Label htmlFor="q">Search</Label>
      <Input id="q" value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export const FilterSearchField = memo(FilterSearchFieldBase)
