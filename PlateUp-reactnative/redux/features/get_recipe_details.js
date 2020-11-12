import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet } from '../api_requests';

export const FETCHING = 'FETCHING';
export const IDLE = 'IDLE';

export const getRecipeDetails = createAsyncThunk(
  'recipeDetails/getRecipeDetails',
  async (id, thunkAPI) => (apiGet(`/recipe/${id}`, thunkAPI))
);

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
