import type { CategoryDto } from './category'

export interface ProductDto {
  id: number
  name: string
  description?: string
  category_id: number
  category?: CategoryDto
  price: number
  rating: number
  // Backend returns is_favorited; keep both for compatibility
  is_favorite?: boolean
  is_favorited?: boolean
  created_at?: string
  updated_at?: string
}
