import type { PaginationMeta } from '@/features/products/types'

export type { Category } from '@/features/categories/types'
export type { Product } from '@/features/products/types'

export type ListResponse<T> = { items: T[]; meta: PaginationMeta }
