import { memo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

function FilterFavoritesToggleBase({
  checked,
  onChange,
}: {
  checked?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <Checkbox checked={!!checked} onCheckedChange={(v) => onChange(Boolean(v))} />
      Favorites only
    </label>
  )
}

export const FilterFavoritesToggle = memo(FilterFavoritesToggleBase)
