import type { ProductDto } from '../dto/product'
import type { CategoryDto } from '../dto/category'
import type { ListResponse } from '../common/pagination'

export interface GetProductsParams {
  per_page?: number
  page?: number
  category?: number | string
  min_price?: number
  max_price?: number
  min_rating?: number
  q?: string
  favorites_only?: boolean
  sort?: string
}

export type GetProductsResponse = ListResponse<ProductDto>
export type GetCategoriesResponse = CategoryDto[]
export type GetProductResponse = ProductDto

export interface CreateProductRequest {
  category_id: number
  name: string
  description?: string
  price: number
  rating: number
}

export type UpdateProductRequest = Partial<CreateProductRequest>
export type FavoriteToggleResponse = ProductDto
