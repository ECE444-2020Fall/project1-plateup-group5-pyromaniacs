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

const filterQueryParamMapping = {
  maxCost: 'Filter_cost',
  maxCookTimeHour: 'Filter_time_h',
  maxCookTimeMinutes: 'Filter_time_min'
};

export const fetchBrowseRecipes = createAsyncThunk('browse_recipes/fetchBrowseRecipes', async (settings, { rejectWithValue }) => {
  let queryParams = '';
  const filters = { ...settings.filterSettings };
  const { searchQuery } = settings;

  if (filters.activateFilters) {
    // Server expects cost in cents
    filters.maxCost *= 100;

    filters.maxCookTimeHour = filters.maxCookTime ? Math.floor(Number(filters.maxCookTime) / 60).toString() : '';
    filters.maxCookTimeMinutes = filters.maxCookTime ? Math.floor(Number(filters.maxCookTime) % 60).toString() : '';

    delete filters.activateFilters;
    delete filters.maxCookTime;

    for (const filter in filters) {
      if (filters[filter] && filterQueryParamMapping[filter]) {
        queryParams = constructQueryParams(queryParams, `${filterQueryParamMapping[filter]}=${filters[filter]}`);
      }
    }
  }

  queryParams = constructQueryParams(queryParams, `Search=${searchQuery}`);

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
