import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import env from '../../env';

export const GET_RECIPE_DETAILS_IPR = 'GETTING_RECIPE_DETAILS';
export const IDLE = 'IDLE';

const initialState = {
  status: IDLE,
  error: null,
  data: null,
};

export const getRecipeDetails = createAsyncThunk('recipeDetails/getRecipeDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${env.SERVER_URL}/recipe/${id}`, { timeout: 1000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : "Unknown error.");
  }
});

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  extraReducers: {
    [getRecipeDetails.pending]: (state) => {
      if (state.status === IDLE) {
        state.status = GET_RECIPE_DETAILS_IPR;
        state.error = null;
      }
    },
    [getRecipeDetails.fulfilled]: (state, action) => {
      if (state.status === GET_RECIPE_DETAILS_IPR) {
        state.status = IDLE;
        state.data = action.payload;
      }
    },
    [getRecipeDetails.rejected]: (state, action) => {
      if (state.status === GET_RECIPE_DETAILS_IPR) {
        state.status = IDLE;
        state.error = action.payload;
      }
    },
  }
});

export default recipeDetailsSlice.reducer;
