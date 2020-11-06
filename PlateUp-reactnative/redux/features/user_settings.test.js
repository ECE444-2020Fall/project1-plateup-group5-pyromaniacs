import userSettingsReducer, {
  register, login, logout, REGISTER_IPR, LOGIN_IPR, LOGOUT_IPR, IDLE
} from './user_settings';

describe('register reducer', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: register.pending,
      payload: {}
    };

    const previousState = {
      user: null,
      status: IDLE,
      error: null
    };

    const expectedState = {
      user: previousState.user,
      status: REGISTER_IPR,
      error: null
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: register.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      user: null,
      status: REGISTER_IPR,
      error: null
    };

    const expectedState = {
      user: previousState.user,
      status: IDLE,
      error: action.payload
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: register.fulfilled,
      payload: {
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        password: 'pbkdf2:sha256:150000$tuG3cesQ$f8ec98a66e6d6bf4910de9f5ba2482facd0ae6debf4d4f3e4e09fc09a42dfcc7',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      }
    };

    const previousState = {
      user: null,
      status: REGISTER_IPR,
      error: null
    };

    const expectedState = {
      user: null,
      status: IDLE,
      error: null
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });
});

describe('login reducer', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: login.pending,
      payload: {}
    };

    const previousState = {
      user: null,
      status: IDLE,
      error: null
    };

    const expectedState = {
      user: previousState.user,
      status: LOGIN_IPR,
      error: null
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: login.rejected,
      payload: 'Error Message'
    };

    const previousState = {
      user: null,
      status: LOGIN_IPR,
      error: null
    };

    const expectedState = {
      user: previousState.user,
      status: IDLE,
      error: action.payload
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: login.fulfilled,
      payload: {
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        password: 'pbkdf2:sha256:150000$tuG3cesQ$f8ec98a66e6d6bf4910de9f5ba2482facd0ae6debf4d4f3e4e09fc09a42dfcc7',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      }
    };

    const previousState = {
      user: null,
      status: LOGIN_IPR,
      error: null
    };

    const expectedState = {
      user: {
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      },
      status: IDLE,
      error: null
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });
});

describe('logout reducer', () => {
  test('correctly updates state on request fetching', () => {
    const action = {
      type: logout.pending,
      payload: {}
    };

    const previousState = {
      user: {
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      },
      status: IDLE,
      error: null
    };

    const expectedState = {
      user: previousState.user,
      status: LOGOUT_IPR,
      error: null
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response error', () => {
    const action = {
      type: logout.rejected,
      payload: 'Logout failed!'
    };

    const previousState = {
      user: {
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      },
      status: LOGOUT_IPR,
      error: null
    };

    const expectedState = {
      user: previousState.user,
      status: IDLE,
      error: action.payload
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });

  test('correctly updates state on response success', () => {
    const action = {
      type: logout.fulfilled,
      payload: 'Logout successful. User 18606548-10c8-11eb-8a7f-0242ac110002'
    };

    const previousState = {
      user: {
        email: 'test28',
        id: '18606548-10c8-11eb-8a7f-0242ac110002',
        inventory_id: '18606b6a-10c8-11eb-8a7f-0242ac110002',
        name: 'test28',
        settings_id: '18606962-10c8-11eb-8a7f-0242ac110002',
        shopping_id: '18606ab6-10c8-11eb-8a7f-0242ac110002'
      },
      status: LOGOUT_IPR,
      error: null
    };

    const expectedState = {
      user: null,
      status: IDLE,
      error: null
    };

    expect(userSettingsReducer(previousState, action)).toEqual(expectedState);
  });
});
