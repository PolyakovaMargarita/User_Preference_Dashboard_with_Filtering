export const ROUTES = {
  ADD_PRODUCT: '/add',
  CATALOG: '/catalog',
} as const

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES]
