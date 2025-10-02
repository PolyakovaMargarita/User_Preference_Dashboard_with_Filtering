export const Endpoints = {
  products: {
    list: '/products',
    create: '/products',
    byId: (id: number) => `/products/${id}`,
    favorite: (id: number) => `/products/${id}/favorite`,
  },
  categories: {
    list: '/categories',
    create: '/categories',
  },
} as const
