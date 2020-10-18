import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer'
import recipePreviewsReducer from '../features/recipes_preview'

const store = configureStore({
    reducer: {
        recipePreviews: recipePreviewsReducer,
        user: userReducer
    }
});

export default store;