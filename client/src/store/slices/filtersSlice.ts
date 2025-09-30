import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type FiltersState = {
  search: string
  categoryId: string | null
}

const initialState: FiltersState = {
  search: '',
  categoryId: null,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setCategoryId(state, action: PayloadAction<string | null>) {
      state.categoryId = action.payload
    },
    resetFilters() {
      return initialState
    },
  },
})

export const { setSearch, setCategoryId, resetFilters } = filtersSlice.actions
export const filtersReducer = filtersSlice.reducer
