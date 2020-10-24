import axios from "axios";
import env from "../../env";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Created using Redux Toolkit documentation example

const initialState = {
    data: {},
    status: "idle",
    error: null
}

export const fetchBrowseRecipes = createAsyncThunk('browse_recipes/fetchBrowseRecipes', async () => {
    const response = await axios.get(`${env.SERVER_URL}/recipe`);
    return response.data;
})
  
const browseRecipesSlice = createSlice({
    name: 'browseRecipes',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBrowseRecipes.pending]: (state) => {
            state.status = 'fetching'
            state.error = null
        },
        [fetchBrowseRecipes.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = action.payload
        },
        [fetchBrowseRecipes.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default browseRecipesSlice.reducer