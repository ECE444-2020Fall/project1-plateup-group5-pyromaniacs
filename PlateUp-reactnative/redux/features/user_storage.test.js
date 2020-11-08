import userStorageReducer, {
  IDLE, IN_FLIGHT, getGroceryInventory, updateGroceryInventory, getShoppingList, updateShoppingList
} from './user_storage';

describe('get grocery inventory', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: getGroceryInventory.pending,
      payload: null
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IDLE,
      error: null,
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IN_FLIGHT,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: getGroceryInventory.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IDLE,
      error: action.payload
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: getGroceryInventory.fulfilled,
      payload: {
        inventory: {
          name: {
            qty: 0,
            unit: 'string'
          }
        }
      }
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: action.payload.inventory,
      shoppingList: previousState.shoppingList,
      status: IDLE,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });
});

describe('update shopping list', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: updateGroceryInventory.pending,
      payload: null
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IDLE,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IN_FLIGHT,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: updateGroceryInventory.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IDLE,
      error: action.payload
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: updateGroceryInventory.fulfilled,
      payload: {
        inventory: {
          name: {
            qty: 0,
            unit: 'string'
          }
        }
      }
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: action.payload.inventory,
      shoppingList: previousState.shoppingList,
      status: IDLE,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });
});

describe('get shopping list', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: getShoppingList.pending,
      payload: null
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IDLE,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IN_FLIGHT,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: getShoppingList.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IDLE,
      error: action.payload
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: getShoppingList.fulfilled,
      payload: {
        shopping: {
          name: {
            qty: 0,
            unit: 'string'
          }
        }
      }
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: action.payload.shopping,
      status: IDLE,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });
});

describe('update shopping list', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: updateShoppingList.pending,
      payload: null
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IDLE,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IN_FLIGHT,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: updateShoppingList.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: previousState.groceryInventory,
      shoppingList: previousState.shoppingList,
      status: IDLE,
      error: action.payload
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: updateShoppingList.fulfilled,
      payload: {
        shopping: {
          name: {
            qty: 0,
            unit: 'string'
          }
        }
      }
    };

    const previousState = {
      groceryInventory: null,
      shoppingList: null,
      status: IN_FLIGHT,
      error: null
    };

    const expectedState = {
      groceryInventory: null,
      shoppingList: action.payload.shopping,
      status: IDLE,
      error: null
    };

    expect(userStorageReducer(previousState, action)).toEqual(expectedState);
  });
});
