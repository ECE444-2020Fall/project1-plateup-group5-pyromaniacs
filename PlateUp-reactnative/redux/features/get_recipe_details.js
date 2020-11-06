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
    return rejectWithValue(err.response ? err.response.data : 'Unknown error.');
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
    [getRecipeDetails.pending]: (state) => ({
      ...state,
      status: FETCHING,
      error: null
    }),
    [getRecipeDetails.fulfilled]: (state, action) => {
      const ingredientsParsed = JSON.parse(action.payload.recipe_preview.ingredients);
      const transformedPayload = action.payload;
      transformedPayload.recipe_preview.ingredients = ingredientsParsed;

      return {
        ...state,
        status: IDLE,
        data: transformedPayload
      };
    },
    [getRecipeDetails.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),
  }
});

export default recipeDetailsSlice.reducer;
