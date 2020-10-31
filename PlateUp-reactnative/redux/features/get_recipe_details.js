import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import env from '../../env';

export const FETCHING = 'FETCHING';
export const IDLE = 'IDLE';

export const getRecipeDetails = createAsyncThunk('recipeDetails/getRecipeDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${env.SERVER_URL}/recipe/${id}`, { timeout: 1000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : "Unknown error.");
  }
});

const initialState = {
  data: null,
  status: IDLE,
  error: null,
};

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  extraReducers: {
    [getRecipeDetails.pending]: (state) => {
      if (state.status === IDLE) {
        state.status = FETCHING;
        state.error = null;
      }
    },
    [getRecipeDetails.fulfilled]: (state, action) => {
      if (state.status === FETCHING) {
        state.status = IDLE;
        state.data = action.payload;

        // Parse JSON here instead of where ingredients are displayed
        state.data.recipe_preview.ingredients = JSON.parse(state.data.recipe_preview.ingredients)
      }
    },
    [getRecipeDetails.rejected]: (state, action) => {
      if (state.status === FETCHING) {
        state.status = IDLE;
        state.error = action.payload;
      }
    },
  }
});

export default recipeDetailsSlice.reducer;
