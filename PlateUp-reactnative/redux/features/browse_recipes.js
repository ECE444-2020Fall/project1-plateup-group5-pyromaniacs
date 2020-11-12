import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { constructQueryParams } from '../../constants/utils';
import { apiGet } from '../api_requests';

export const FETCHING = 'FETCHING';
export const IDLE = 'IDLE';

const queryParamMapping = {
  maxCost: 'Filter_cost',
  maxCookTimeHour: 'Filter_time_h',
  maxCookTimeMinutes: 'Filter_time_min',
  search: 'Search'
};

export const fetchBrowseRecipes = createAsyncThunk(
  'browse_recipes/fetchBrowseRecipes',
  async (settings, thunkAPI) => {
    const params = processSettingsIntoParams(settings);
    const queryParams = constructQueryParams(params, queryParamMapping);

    return apiGet(`/recipe${queryParams}`, thunkAPI);
  }
);

export const processSettingsIntoParams = (settings) => {
  const filters = { ...settings.filterSettings };
  const { searchQuery } = settings;
  let params = {};

  if (filters.activateFilters) {
    params = { ...filters, search: searchQuery };

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
    } else {
      delete params.maxCost;
    }

    delete params.activateFilters;
    delete params.maxCookTime;
  } else {
    params = { search: searchQuery };
  }

  return params;
};

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
    [fetchBrowseRecipes.pending]: (state) => ({
      ...state,
      status: FETCHING,
      error: null
    }),
    [fetchBrowseRecipes.fulfilled]: (state, action) => {
      const { recipes, is_random: isRandom } = action.payload;
      const transformedData = { recipes, isRandom };

      return {
        ...state,
        status: IDLE,
        data: transformedData
      };
    },
    [fetchBrowseRecipes.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    })
  }
});

export default browseRecipesSlice.reducer;
