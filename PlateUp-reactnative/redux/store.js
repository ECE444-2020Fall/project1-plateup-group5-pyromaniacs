import { configureStore } from '@reduxjs/toolkit';
import userSettingsReducer from './features/user_settings';
import browseRecipesReducer from './features/browse_recipes';
import filterSettingsReducer from './features/filter_settings';
import searchQueryReducer from './features/search_query';

const store = configureStore({
    reducer: {
        browseRecipes: browseRecipesReducer,
        filterSettings: filterSettingsReducer,
        searchQuery: searchQueryReducer,
        userSettings: userSettingsReducer
    }
});

export default store;