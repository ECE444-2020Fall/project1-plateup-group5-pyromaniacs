import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import env from '../../env';

export const REGISTER_IPR = 'REGISTERING';
export const LOGIN_IPR = 'LOGGING_IN';
export const LOGOUT_IPR = 'LOGGING_OUT';
export const IDLE = 'IDLE';

const initialState = {
  user: null,
  status: IDLE,
  error: null
};

export const register = createAsyncThunk('userSettings/register', async (newUser, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${env.SERVER_URL}/user`, newUser, { timeout: 1000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : "Unknown error");
  }
});

export const login = createAsyncThunk('userSettings/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${env.SERVER_URL}/login`, user, { timeout: 1000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : "Unknown error");
  }
});

export const logout = createAsyncThunk('userSettings/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${env.SERVER_URL}/login`, { timeout: 1000 });
    return response.data;
  } catch (err) {
    return rejectWithValue('Logout failed!');
  }
});

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  extraReducers: {
    [register.pending]: (state) => {
      if (state.status === IDLE) {
        state.status = REGISTER_IPR;
        state.error = null;
      }
    },
    [register.fulfilled]: (state) => {
      if (state.status === REGISTER_IPR) {
        state.status = IDLE;
      }
    },
    [register.rejected]: (state, action) => {
      if (state.status === REGISTER_IPR) {
        state.status = IDLE;
        state.error = action.payload;
      }
    },

    [login.pending]: (state) => {
      if (state.status === IDLE) {
        state.status = LOGIN_IPR;
        state.error = null;
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.status === LOGIN_IPR) {
        state.status = IDLE;

        // We don't want to store the password hash
        delete action.payload.password;
        state.user = action.payload;
      }
    },
    [login.rejected]: (state, action) => {
      if (state.status === LOGIN_IPR) {
        state.status = IDLE;
        state.error = action.payload;
      }
    },

    [logout.pending]: (state) => {
      if (state.status === IDLE) {
        state.status = LOGOUT_IPR;
        state.error = null;
      }
    },
    [logout.fulfilled]: (state) => {
      if (state.status === LOGOUT_IPR) {
        state.status = IDLE;
        state.user = null;
      }
    },
    [logout.rejected]: (state, action) => {
      if (state.status === LOGOUT_IPR) {
        state.status = IDLE;
        state.error = action.payload;
      }
    },
  }
});

export default userSettingsSlice.reducer;
