import { combineReducers } from '@reduxjs/toolkit'

// Slices
import { filtersReducer } from './slices/filtersSlice.ts'
import { uiReducer } from './slices/uiSlice.ts'

// APIs
import { baseApi } from '@/shared/api/baseApi'

export const rootReducer = combineReducers({
  // slices
  filters: filtersReducer,
  ui: uiReducer,
  // rtk query
  [baseApi.reducerPath]: baseApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
