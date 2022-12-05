import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPost, apiDelete } from '../api_requests';

export const REGISTER_IPR = 'REGISTERING';
export const LOGIN_IPR = 'LOGGING_IN';
export const LOGOUT_IPR = 'LOGGING_OUT';
export const IDLE = 'IDLE';

const initialState = {
  user: null,
  status: IDLE,
  error: null
};

export const register = createAsyncThunk(
  'userSettings/register',
  async (newUser, thunkAPI) => (apiPost('/user', newUser, thunkAPI))
);

export const login = createAsyncThunk(
  'userSettings/login',
  async (user, thunkAPI) => (apiPost('/login', user, thunkAPI))
);

export const logout = createAsyncThunk(
  'userSettings/logout',
  async (_, thunkAPI) => (apiDelete('/login', thunkAPI, 'Logout failed!'))
);

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  extraReducers: {
    [register.pending]: (state) => ({
      ...state,
      status: REGISTER_IPR,
      error: null
    }),
    [register.fulfilled]: (state) => ({
      ...state,
      status: IDLE

    }),
    [register.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),

    [login.pending]: (state) => ({
      ...state,
      status: LOGIN_IPR,
      error: null
    }),
    [login.fulfilled]: (state, action) => {
      const userData = action.payload;
      // We don't want to store the password hash
      delete userData.password;

      return {
        ...state,
        status: IDLE,
        user: userData
      };
    },
    [login.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),

    [logout.pending]: (state) => ({
      ...state,
      status: LOGOUT_IPR,
      error: null
    }),
    [logout.fulfilled]: (state) => ({
      ...state,
      status: IDLE,
      user: null
    }),
    [logout.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),
  }
});

export default userSettingsSlice.reducer;
