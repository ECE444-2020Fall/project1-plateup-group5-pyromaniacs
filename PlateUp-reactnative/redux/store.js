import { configureStore } from '@reduxjs/toolkit';
import browseRecipesReducer from './features/browse_recipes';
import filterSettingsReducer from './features/filter_settings';
import recipeDetailsReducer from './features/get_recipe_details';
import searchQueryReducer from './features/search_query';
import userSettingsReducer from './features/user_settings';
import userStorageReducer from './features/user_storage';

const store = configureStore({
  reducer: {
    browseRecipes: browseRecipesReducer,
    filterSettings: filterSettingsReducer,
    recipeDetails: recipeDetailsReducer,
    searchQuery: searchQueryReducer,
    userSettings: userSettingsReducer,
    userStorage: userStorageReducer
  }
});

export default store;
