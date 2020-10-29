import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from '../../env';
import { constructQueryParams } from '../../constants/utils';

// Created using Redux Toolkit documentation example

const initialState = {
  data: {},
  status: 'idle',
  error: null
};

const queryParamMapping = {
  maxCost: 'Filter_cost',
  maxCookTimeHour: 'Filter_time_h',
  maxCookTimeMinutes: 'Filter_time_min',
  search: 'Search'
};

export const fetchBrowseRecipes = createAsyncThunk('browse_recipes/fetchBrowseRecipes', async (settings, { rejectWithValue }) => {
  const filters = { ...settings.filterSettings };
  const searchQuery = settings.searchQuery;
  let params = {}

  if (filters.activateFilters) {
    params = { ...filters, search: searchQuery }

    delete params.activateFilters;

    params.maxCookTimeHour = params.maxCookTime ? Math.floor(Number(params.maxCookTime) / 60).toString() : '';
    params.maxCookTimeMinutes = params.maxCookTime ? (Number(params.maxCookTime) % 60).toString() : '';

    delete params.maxCookTime;
  }
  else {
    params = { search: searchQuery }
  }

  const queryParams = constructQueryParams(params, queryParamMapping);

  try {
    const response = await axios({
      method: 'get',
      timeout: 1000,
      url: `${env.SERVER_URL}/recipe${queryParams}`,
      responseType: 'json'
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const browseRecipesSlice = createSlice({
  name: 'browseRecipes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBrowseRecipes.pending]: (state) => {
      state.status = 'fetching';
      state.error = null;
    },
    [fetchBrowseRecipes.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data = action.payload;
    },
    [fetchBrowseRecipes.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    }
  }
});

export default browseRecipesSlice.reducer;
