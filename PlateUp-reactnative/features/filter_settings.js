import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    maxCost: "",
    maxCookTime: "",
    recipesWithOwnedIngredients: false,
    activateFilters: true,
}

const filterSettingsSlice = createSlice({
  name: 'filterSettings',
  initialState,
  reducers: {
    saveFilters(state, action) {
      return action.payload;
    },
  },
})

export const { saveFilters } = filterSettingsSlice.actions
export default filterSettingsSlice.reducer