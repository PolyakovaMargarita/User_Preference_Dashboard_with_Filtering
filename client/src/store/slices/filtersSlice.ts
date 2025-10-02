import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type FiltersState = {
  q?: string
  category?: string | number
  min_price?: number
  max_price?: number
  min_rating?: number
  show_only_favorites?: boolean
  page: number
  per_page: number
}

const initialState: FiltersState = {
  q: undefined,
  category: undefined,
  min_price: undefined,
  max_price: undefined,
  min_rating: undefined,
  show_only_favorites: undefined,
  page: 1,
  per_page: 12,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<FiltersState>>) {
      Object.assign(state, action.payload)
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.per_page = action.payload
    },
    resetFilters() {
      return initialState
    },
  },
})

export const { setFilter, setPage, setPerPage, resetFilters } = filtersSlice.actions
export const filtersReducer = filtersSlice.reducer
