import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL
      ? `${import.meta.env.VITE_APP_API_URL}/api`
      : 'http://localhost:8080/api',
  }),
  tagTypes: ['Products', 'Categories'],
  endpoints: () => ({}),
})
