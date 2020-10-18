import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducer'
import filterSettingsReducer from '../features/filter_settings'

const store = configureStore({
  reducer: {
    user: userReducer,
    filterSettings: filterSettingsReducer,
  }
});

export default store;