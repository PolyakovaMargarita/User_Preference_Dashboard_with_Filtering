import { z } from 'zod'

export const AddProductFormSchema = z.object({
  name: z.string().min(1, 'Enter a name'),
  description: z.string().optional(),
  category_id: z.number().min(1, 'Select a category'),
  price: z.number().min(0, 'Price must be >= 0'),
  rating: z.number().min(0).max(5),
})

export type AddProductForm = z.infer<typeof AddProductFormSchema>
