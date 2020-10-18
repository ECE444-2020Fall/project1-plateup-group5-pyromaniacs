import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer'
import browseRecipesReducer from '../features/browse_recipes'
import filterSettingsReducer from '../features/filter_settings'

const store = configureStore({
    reducer: {
        browseRecipes: browseRecipesReducer,
        filterSettings: filterSettingsReducer,
        user: userReducer
    }
});

export default store;