import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    saveSearch(_, action) {
      return action.payload;
    },
  },
});

export const { saveSearch } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
