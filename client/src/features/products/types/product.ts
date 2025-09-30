import type { Category } from '../../categories/types'

export interface Product {
  id: number
  name: string
  description?: string
  category?: Category
  category_id: number
  price: number
  rating: number // 0..5
  created_at?: string
  updated_at?: string
  is_favorite?: boolean
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}
