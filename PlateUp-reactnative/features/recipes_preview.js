import axios from "axios";
import env from "../env";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Created using Redux Toolkit documentation example

const initialState = {
    recipePreviews: [],
    status: "idle",
    error: null
}

export const fetchRecipePreviews = createAsyncThunk('recipe_previews/fetchRecipePreviews', async () => {
    const response = await axios.get(`${env.SERVER_URL}/recipes`);
    return response.data;
})
  
const recipePreviewsSlice = createSlice({
    name: 'recipePreviews',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRecipePreviews.pending]: (state) => {
            state.status = 'fetching'
            state.error = null
        },
        [fetchRecipePreviews.fulfilled]: (state, action) => {
            state.status = 'success'
            state.recipePreviews = action.payload
        },
        [fetchRecipePreviews.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default recipePreviewsSlice.reducer