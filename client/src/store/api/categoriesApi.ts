import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Category = {
  id: string
  name: string
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => '/categories',
      providesTags: (result) =>
        result
          ? [...result.map((c) => ({ type: 'Categories' as const, id: c.id })), 'Categories']
          : ['Categories'],
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
