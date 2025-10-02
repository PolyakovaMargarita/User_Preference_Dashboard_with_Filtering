import { memo } from 'react'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

function FilterRatingSliderBase({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number
  max: number
  step?: number
  value?: number
  onChange: (min: number) => void
}) {
  return (
    <div className="space-y-2">
      <Label>Min rating</Label>
      <Slider
        min={min}
        max={max}
        step={step ?? 1}
        value={[value ?? min]}
        onValueChange={([mn]) => onChange(mn)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{String(value ?? min)}+</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export const FilterRatingSlider = memo(FilterRatingSliderBase)
