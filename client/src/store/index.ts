import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { productsApi } from './api/productsApi.ts'
import { categoriesApi } from './api/categoriesApi.ts'
import { isDevEnv } from '../shared/utils/env'

const isDev = isDevEnv()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, categoriesApi.middleware),
  devTools: isDev,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// Typed hooks
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
