import { baseApi } from '@/shared/api/baseApi'
import { Endpoints } from '@/shared/api/endpoints'
import type { CategoryDto } from '@/api/types/contracts'

export const categoriesServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryDto[], void>({
      query: () => ({ url: Endpoints.categories.list }),
      transformResponse: (resp: { data: CategoryDto[] }) => resp.data,
      providesTags: ['Categories'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetCategoriesQuery } = categoriesServices
