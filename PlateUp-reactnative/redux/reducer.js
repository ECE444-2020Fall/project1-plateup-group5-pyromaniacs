import * as actions from './actionTypes'
import produce from 'immer'

/*
Store looks like:
{
  currentUser: {
    id: String
    name: String
    email: String
    inventoryId: String
    shoppingId: String
    settingsId: String
  }
}
 */
export default function reducer(state = {}, action) {
  return produce(state, draft => {
    switch(action.type) {
      case actions.USER_LOGGED_IN:
        draft.currentUser.id = action.payload.id;
        draft.currentUser.name = action.payload.name;
        draft.currentUser.email = action.payload.email;
        draft.currentUser.inventoryId = action.payload.inventoryId;
        draft.currentUser.shoppingId = action.payload.shoppingId;
        draft.currentUser.settingsId = action.payload.settingsId;
        break;
      default:
        draft.currentUser = {};
        break;
    }
  });
}