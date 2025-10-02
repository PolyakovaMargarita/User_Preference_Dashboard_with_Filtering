import type { RootState } from '../index'

const selectFiltersState = (state: RootState) => state.filters

export const selectFilters = selectFiltersState
