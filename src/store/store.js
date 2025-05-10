import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import bookmarksReducer from './slices/bookmarksSlice'
import storage from '../functions/storage'

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['bookmarks'], // Only persist bookmarks
}

const persistedReducer = persistReducer(persistConfig, bookmarksReducer)

export const store = configureStore({
   reducer: {
      bookmarks: persistedReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // Disable serializable check for redux-persist
      }),
})

export const persistor = persistStore(store)
