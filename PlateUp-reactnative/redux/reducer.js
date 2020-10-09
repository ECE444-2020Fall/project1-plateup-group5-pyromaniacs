import * as actions from './actionTypes'
import produce from 'immer'

/*
Store looks like:
{
  currentUser: {
    id: String
    email: String
  }
}
 */
export default function reducer(state = {}, action) {
  return produce(state, draft => {
    switch(action.type) {
      case actions.USER_LOGGED_IN:
        draft.currentUser.id = action.payload.id;
        draft.currentUser.email = action.payload.email;
        break;
      default:
        draft.currentUser = {};
        break;
    }
  });
}