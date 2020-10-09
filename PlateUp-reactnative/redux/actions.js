import * as actions from './actionTypes'

export const userLoggedIn = (id, email) => ({
  type: actions.USER_LOGGED_IN,
  payload: { id, email }
})