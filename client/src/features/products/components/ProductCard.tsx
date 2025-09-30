import { memo } from 'react'
import type { Product } from '@/features/products/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Star } from 'lucide-react'

type Props = {
  product: Product
  onToggleFavorite: (id: number, isFavorite?: boolean) => void
}

export const ProductCard = memo(function ProductCard({ product, onToggleFavorite }: Props) {
  const { id, name, category, price, rating } = product
  return (
    <Card
      className={
        product.is_favorite
          ? 'border-yellow-400 ring-2 ring-yellow-400/40 transition-colors'
          : 'transition-colors'
      }
      data-favorite={Boolean(product.is_favorite)}
    >
      <CardContent className="p-3">
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
            <img
              loading="lazy"
              alt={name}
              src={`https://picsum.photos/seed/${id}/600/400`}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={product.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={Boolean(product.is_favorite)}
                variant="outline"
                size="icon"
                className={`absolute right-2 top-2 ${product.is_favorite ? 'bg-yellow-400 text-black' : ''}`}
                onClick={() => onToggleFavorite(id, product.is_favorite)}
              >
                <Star className="h-4 w-4" fill={product.is_favorite ? 'currentColor' : 'none'} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle favorite</TooltipContent>
          </Tooltip>
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="line-clamp-1 text-sm font-medium">{name}</h3>
          <div className="text-xs text-muted-foreground">
            {category?.name && <Badge variant="secondary">{category.name}</Badge>}{' '}
            {product.is_favorite && <Badge className="bg-yellow-400 text-black">Favorite</Badge>}
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-base font-semibold">${price.toFixed(2)}</span>
            <span className="text-sm">⭐ {rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
