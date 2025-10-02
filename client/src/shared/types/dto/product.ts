import type { CategoryDto } from './category.ts'

export interface ProductDto {
  id: number
  name: string
  description?: string
  category_id: number
  category?: CategoryDto
  price: number
  rating: number
  is_favorite?: boolean
  is_favorited?: boolean
  created_at?: string
  updated_at?: string
}
