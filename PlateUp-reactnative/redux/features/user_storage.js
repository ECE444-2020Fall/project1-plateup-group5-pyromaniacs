import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import env from '../../env';

export const IN_FLIGHT = 'IN_FLIGHT';
export const IDLE = 'IDLE';

// Grocery Cart API Calls
export const getGroceryInventory = createAsyncThunk('groceryInventory/getGroceryInventory', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${env.SERVER_URL}/inventory/${id}`, { timeout: 2000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : 'Unknown error.');
  }
});

export const updateGroceryInventory = createAsyncThunk('groceryInventory/updateGroceryInventory', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${env.SERVER_URL}/inventory/${id}`, data, { timeout: 2000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : 'Unknown error.');
  }
});

// Shopping List API Calls
export const getShoppingList = createAsyncThunk('shoppingList/getShoppingList', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${env.SERVER_URL}/shopping/${id}`, { timeout: 2000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : 'Unknown error.');
  }
});

export const updateShoppingList = createAsyncThunk('shoppingList/updateShoppingList', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${env.SERVER_URL}/shopping/${id}`, data, { timeout: 2000 });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : 'Unknown error.');
  }
});

export const flashShoppingList = createAsyncThunk('shoppingList/flashShoppingList', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${env.SERVER_URL}/shopping/flash`, { user_id: id }, { timeout: 2000 });

    console.log(response.data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : 'Unknown error.');
  }
});

const initialState = {
  groceryInventory: null,
  shoppingList: null,
  status: IDLE,
  error: null
};

const userStorageSlice = createSlice({
  name: 'userStorage',
  initialState,
  extraReducers: {
    [getGroceryInventory.pending]: (state) => ({
      ...state,
      status: IN_FLIGHT,
      error: null
    }),
    [getGroceryInventory.fulfilled]: (state, action) => ({
      ...state,
      status: IDLE,
      groceryInventory: action.payload.inventory
    }),
    [getGroceryInventory.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),
    [updateGroceryInventory.pending]: (state) => ({
      ...state,
      status: IN_FLIGHT,
      error: null
    }),
    [updateGroceryInventory.fulfilled]: (state, action) => ({
      ...state,
      status: IDLE,
      groceryInventory: action.payload.inventory
    }),
    [updateGroceryInventory.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),
    [getShoppingList.pending]: (state) => ({
      ...state,
      status: IN_FLIGHT,
      error: null
    }),
    [getShoppingList.fulfilled]: (state, action) => ({
      ...state,
      status: IDLE,
      shoppingList: action.payload.shopping
    }),
    [getShoppingList.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),
    [updateShoppingList.pending]: (state) => ({
      ...state,
      status: IN_FLIGHT,
      error: null
    }),
    [updateShoppingList.fulfilled]: (state, action) => ({
      ...state,
      status: IDLE,
      shoppingList: action.payload.shopping
    }),
    [updateShoppingList.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    }),
    [flashShoppingList.pending]: (state) => ({
      ...state,
      status: IN_FLIGHT,
      error: null
    }),
    [flashShoppingList.fulfilled]: (state, action) => ({
      ...state,
      status: IDLE,
      groceryInventory: action.payload.inventory,
      shoppingList: {}
    }),
    [flashShoppingList.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    })
  },
});

export default userStorageSlice.reducer;
