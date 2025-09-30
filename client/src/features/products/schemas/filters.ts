import { z } from 'zod'

export const FiltersSchema = z.object({
  q: z.string().optional(),
  category: z.union([z.string(), z.number()]).optional(),
  min_price: z.number().min(0).optional(),
  max_price: z.number().min(0).optional(),
  min_rating: z.number().min(0).max(5).optional(),
  show_favorites: z.boolean().optional(),
  page: z.number().min(1).optional(),
  per_page: z.number().optional(),
})

export type Filters = z.infer<typeof FiltersSchema>
