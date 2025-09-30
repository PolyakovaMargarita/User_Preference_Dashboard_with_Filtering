import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UiState = {
  theme: 'light' | 'dark'
  isSidebarOpen: boolean
}

const initialState: UiState = {
  theme: 'light',
  isSidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<UiState['theme']>) {
      state.theme = action.payload
    },
    toggleSidebar(state, action: PayloadAction<boolean | undefined>) {
      state.isSidebarOpen = action.payload ?? !state.isSidebarOpen
    },
  },
})

export const { setTheme, toggleSidebar } = uiSlice.actions
export const uiReducer = uiSlice.reducer
