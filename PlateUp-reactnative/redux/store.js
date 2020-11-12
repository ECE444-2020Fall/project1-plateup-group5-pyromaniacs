import { combineReducers, configureStore } from '@reduxjs/toolkit';
import browseRecipesReducer from './features/browse_recipes';
import filterSettingsReducer from './features/filter_settings';
import recipeDetailsReducer from './features/get_recipe_details';
import searchQueryReducer from './features/search_query';
import userSettingsReducer from './features/user_settings';
import userStorageReducer from './features/user_storage';

export const RESET_STORE = 'RESET_STORE';

const allReducers = combineReducers({
  browseRecipes: browseRecipesReducer,
  filterSettings: filterSettingsReducer,
  recipeDetails: recipeDetailsReducer,
  searchQuery: searchQueryReducer,
  userSettings: userSettingsReducer,
  userStorage: userStorageReducer
});

// Wraps all reducers so that when logging out, we can dispatch an
// action to reset the entire store. Setting state to undefined
// means each reducer will instead use their default state.
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return allReducers(undefined, {});
  }

  return allReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer
});
