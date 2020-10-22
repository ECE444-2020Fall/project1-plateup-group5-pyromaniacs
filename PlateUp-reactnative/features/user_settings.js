import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import env from "../env";

const initialState = {
  user: null,
  status: "idle",
  error: null
}

export const register = createAsyncThunk('userSettings/register', async (newUser) => {
  const response = await axios.post(`${env.SERVER_URL}/user`, newUser)
  return response.data;
})

export const login = createAsyncThunk('userSettings/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${env.SERVER_URL}/login`, user)
    return response.data;
  }
  catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const logout = createAsyncThunk('userSettings/logout', async () => {
  const response = await axios.delete(`${env.SERVER_URL}/login`)
  return response.data;
})

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = "registering";
    },
    [register.fulfilled]: (state, action) => {
      state.status = "idle";
    },
    [register.rejected]: (state, action) => {
      state.status = "idle";
    },

    [login.pending]: (state, action) => {
      if (state.status === "idle") {
        state.status = "logging in";
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.status === "logging in") {
        state.status = "idle";

        delete action.payload.password
        state.user = action.payload;
      }
    },
    [login.rejected]: (state, action) => {
      if (state.status === "logging in") {
        state.status = "idle";
        state.error = action.payload
      }
    },

    [logout.fulfilled]: (state) => {
      state.status = "idle";
      state.user = null;
    },
  }
})

export default userSettingsSlice.reducer