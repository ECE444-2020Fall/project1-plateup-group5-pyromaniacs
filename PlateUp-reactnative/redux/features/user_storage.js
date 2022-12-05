import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../api_requests';

export const IN_FLIGHT = 'IN_FLIGHT';
export const IDLE = 'IDLE';

// Grocery Cart API Calls
export const getGroceryInventory = createAsyncThunk(
  'groceryInventory/getGroceryInventory',
  async (userId, thunkAPI) => (apiGet(`/inventory/${userId}`, thunkAPI))
);

export const updateGroceryInventory = createAsyncThunk(
  'groceryInventory/updateGroceryInventory',
  async ({ userId, data }, thunkAPI) => (apiPost(`/inventory/${userId}`, data, thunkAPI))
);

// Shopping List API Calls
export const getShoppingList = createAsyncThunk(
  'shoppingList/getShoppingList',
  async (userId, thunkAPI) => (apiGet(`/shopping/${userId}`, thunkAPI))
);

export const updateShoppingList = createAsyncThunk(
  'shoppingList/updateShoppingList',
  async ({ userId, data }, thunkAPI) => (apiPost(`/shopping/${userId}`, data, thunkAPI))
);

export const flashShoppingList = createAsyncThunk(
  'shoppingList/flashShoppingList',
  async (userId, thunkAPI) => (apiPost('/shopping/flash', { user_id: userId }, thunkAPI))
);

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
      shoppingList: null
    }),
    [flashShoppingList.rejected]: (state, action) => ({
      ...state,
      status: IDLE,
      error: action.payload
    })
  },
});

export default userStorageSlice.reducer;
