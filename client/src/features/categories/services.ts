import { baseApi } from '@/shared/api/baseApi'
import { Endpoints } from '@/shared/api/endpoints'
import type { CategoryDto } from '@/shared/types/contracts'

export const categoriesServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryDto[], void>({
      query: () => ({ url: Endpoints.categories.list }),
      transformResponse: (resp: { data: CategoryDto[] }) => resp.data,
      providesTags: ['Categories'],
    }),
    createCategory: build.mutation<CategoryDto, { name: string }>({
      query: (body) => ({ url: Endpoints.categories.create, method: 'POST', body }),
      invalidatesTags: ['Categories'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoriesServices
