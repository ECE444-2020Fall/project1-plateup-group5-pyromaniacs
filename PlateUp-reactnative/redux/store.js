import { configureStore } from '@reduxjs/toolkit'
//import userReducer from './reducer'
import userSettingsReducer from '../features/user_settings'
import browseRecipesReducer from '../features/browse_recipes'
import filterSettingsReducer from '../features/filter_settings'

const store = configureStore({
    reducer: {
        browseRecipes: browseRecipesReducer,
        filterSettings: filterSettingsReducer,
        userSettings: userSettingsReducer
    }
});

export default store;