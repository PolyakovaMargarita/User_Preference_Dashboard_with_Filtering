import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Product = {
  id: string
  name: string
  price: number
  categoryId: string
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [...result.map((p) => ({ type: 'Products' as const, id: p.id })), 'Products']
          : ['Products'],
    }),
    addProduct: build.mutation<Product, Partial<Product>>({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const { useGetProductsQuery, useAddProductMutation } = productsApi
