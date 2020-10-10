import * as actions from './actionTypes'

export const userLoggedIn = (id, name, email, inventoryId, shoppingId, settingsId) => ({
  type: actions.USER_LOGGED_IN,
  payload: { id, name, email, inventoryId, shoppingId, settingsId }
})