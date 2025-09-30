import { combineReducers } from '@reduxjs/toolkit'

// Slices
import { filtersReducer } from './slices/filtersSlice.ts'
import { uiReducer } from './slices/uiSlice.ts'

// APIs
import { productsApi } from './api/productsApi.ts'
import { categoriesApi } from './api/categoriesApi.ts'

export const rootReducer = combineReducers({
  // slices
  filters: filtersReducer,
  ui: uiReducer,
  // rtk query
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
