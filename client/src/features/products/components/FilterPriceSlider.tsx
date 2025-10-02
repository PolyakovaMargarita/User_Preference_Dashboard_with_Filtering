import { memo } from 'react'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

function FilterPriceSliderBase({
  min,
  max,
  onChange,
  minValue,
  maxValue,
}: {
  min: number
  max: number
  onChange: (min: number, max: number) => void
  minValue?: number
  maxValue?: number
}) {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label>Price</Label>
      <Slider
        min={min}
        max={max}
        step={10}
        value={[minValue ?? min, maxValue ?? max]}
        onValueChange={([mn, mx]) => onChange(mn, mx)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${String(minValue ?? min)}</span>
        <span>${String(maxValue ?? max)}</span>
      </div>
    </div>
  )
}

export const FilterPriceSlider = memo(FilterPriceSliderBase)
