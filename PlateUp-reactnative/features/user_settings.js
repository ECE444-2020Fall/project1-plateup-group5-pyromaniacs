import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import env from "../env";

const initialState = {
  user: null,
  status: "idle",
  error: null,
}

export const register = createAsyncThunk('userSettings/register', async (newUser) => {
  const response = await axios.post(`${env.SERVER_URL}/user`, newUser)
  return response.data;
})

export const login = createAsyncThunk('userSettings/login', async (user) => {
  console.log("In login")

  const response = await axios.post(`${env.SERVER_URL}/login`, user)
    .then(res => {
      // Set current user and navigate to the main app screen
      console.log("Success")
    })
    .catch(err => {
      console.log("Error")
    })
    .then(() => {
      console.log("Unknown error")
    });

    console.log("Response: ", response)
    return response.data;
})

export const logout = createAsyncThunk('userSettings/logout', async () => {
  const response = await axios.delete(`${env.SERVER_URL}/login`)
  return response.data;
})

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  extraReducers: {
    [register.pending]: (state) => {
        state.status = "registering";
        state.error = null
    },
    [register.fulfilled]: (state, action) => {
        state.status = "idle";
    },
    [register.rejected]: (state) => {
        state.status = "idle"
        state.error = "Could not create new user."
    },
    [login.pending]: (state) => {
      console.log("pending")
        state.status = "logging in";
        state.error = null
    },
    [login.fulfilled]: (state, action) => {
        console.log("fulfilled")
        state.status = "idle";
        state.user = action.payload;
    },
    [login.rejected]: (state) => {
      console.log("rejected")
        state.status = "idle"
        state.error = "Could not log in."
    },
    [logout.pending]: (state) => {
        state.status = "logging out";
        state.error = null
    },
    [logout.fulfilled]: (state) => {
        state.status = "idle";
        state.user = null;
    },
    [logout.rejected]: (state) => {
        state.status = "idle"
        state.error = "Could not log out."
    },
  }
})

export default userSettingsSlice.reducer