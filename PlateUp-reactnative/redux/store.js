import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer'
import browseRecipesReducer from '../features/browse_recipes'

const store = configureStore({
    reducer: {
        browseRecipes: browseRecipesReducer,
        user: userReducer
    }
});

export default store;