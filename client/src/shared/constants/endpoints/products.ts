export const ProductsEndpoints = {
  getProducts: '/products',
  addProduct: '/products',
  byId: (id: number) => `/products/${id}`,
  favorite: (id: number) => `/products/${id}/favorite`,
} as const
