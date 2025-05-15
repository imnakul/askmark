import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import bookmarksReducer from './slices/bookmarksSlice'
import authReducer from './slices/authSlice'
import storage from '../functions/storage'

const rootReducer = combineReducers({
   bookmarks: bookmarksReducer,
   auth: authReducer,
})

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['bookmarks', 'auth'], // Persist both bookmarks and auth
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // Disable serializable check for redux-persist
      }),
})

export const persistor = persistStore(store)
