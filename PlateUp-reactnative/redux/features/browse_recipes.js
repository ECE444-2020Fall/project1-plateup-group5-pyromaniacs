import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constructQueryParams } from '../../constants/utils';
import env from '../../env';

export const FETCHING = 'FETCHING';
export const IDLE = 'IDLE';

const queryParamMapping = {
  maxCost: 'Filter_cost',
  maxCookTimeHour: 'Filter_time_h',
  maxCookTimeMinutes: 'Filter_time_min',
  search: 'Search'
};

export const fetchBrowseRecipes = createAsyncThunk('browse_recipes/fetchBrowseRecipes', async (settings, { rejectWithValue }) => {
  const params = processSettingsIntoParams(settings);
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

export const processSettingsIntoParams = (settings) => {
  const filters = { ...settings.filterSettings };
  const searchQuery = settings.searchQuery;
  let params = {}

  if (filters.activateFilters) {
    params = { ...filters, search: searchQuery }

    // Convert max cook time to integer before splitting into hours and minutes as the
    // server expects these values to be integers.
    if (params.maxCookTime) {
      const maxCookTime = Math.floor(Number(params.maxCookTime));

      params.maxCookTimeHour = Math.floor(maxCookTime / 60).toString();
      params.maxCookTimeMinutes = (maxCookTime % 60).toString();
    }

    // Server expects cost in cents
    if (params.maxCost) {
      params.maxCost = (Number(params.maxCost) * 100).toString();
    }
    else {
      delete params.maxCost;
    }

    delete params.activateFilters;
    delete params.maxCookTime;
  }
  else {
    params = { search: searchQuery }
  }

  return params;
}

const initialState = {
  data: {},
  status: IDLE,
  error: null
};

const browseRecipesSlice = createSlice({
  name: 'browseRecipes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBrowseRecipes.pending]: (state) => {
      state.status = FETCHING;
      state.error = null;
    },
    [fetchBrowseRecipes.fulfilled]: (state, action) => {
      state.status = IDLE;
      state.data = action.payload;
    },
    [fetchBrowseRecipes.rejected]: (state, action) => {
      state.status = IDLE;
      state.error = action.error.message;
    }
  }
});

export default browseRecipesSlice.reducer;
