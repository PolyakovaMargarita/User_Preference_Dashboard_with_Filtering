import { baseApi } from '@/shared/api/baseApi'
import { Endpoints } from '@/shared/api/endpoints'
import type {
  ProductDto,
  ListResponse,
  GetProductsParams,
  CreateProductRequest,
  PaginationMeta,
} from '@/shared/types/contracts'

export const productsServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ListResponse<ProductDto>, Partial<GetProductsParams> | undefined>({
      query: (params = {}) => {
        const mapped: Record<string, unknown> = { ...params }
        if (Object.prototype.hasOwnProperty.call(mapped, 'show_only_favorites')) {
          mapped.favorites_only = mapped.show_only_favorites
          delete mapped.show_only_favorites
        }
        return { url: Endpoints.products.list, params: mapped }
      },
      transformResponse: (resp: { data: ProductDto[]; meta: PaginationMeta }) => ({
        items: resp.data,
        meta: resp.meta,
      }),
      providesTags: ['Products'],
    }),
    addProduct: build.mutation<ProductDto, CreateProductRequest>({
      query: (body) => ({ url: Endpoints.products.create, method: 'POST', body }),
      invalidatesTags: ['Products'],
    }),
    toggleFavorite: build.mutation<
      { favorited: boolean },
      { id: number; isFavorite?: boolean; listArg?: Partial<GetProductsParams> }
    >({
      query: ({ id, isFavorite }) => ({
        url: Endpoints.products.favorite(id),
        method: isFavorite ? 'DELETE' : 'POST',
      }),
      async onQueryStarted({ id, isFavorite, listArg }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          productsServices.util.updateQueryData('getProducts', listArg ?? {}, (draft) => {
            const idx = draft.items.findIndex((p) => p.id === id)
            if (idx === -1) return
            draft.items[idx] = { ...draft.items[idx], is_favorite: !isFavorite }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
      invalidatesTags: ['Products'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetProductsQuery, useAddProductMutation, useToggleFavoriteMutation } =
  productsServices
