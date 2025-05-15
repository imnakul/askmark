import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   bookmarks: [],
}

const bookmarksSlice = createSlice({
   name: 'bookmarks',
   initialState,
   reducers: {
      addBookmark: (state, action) => {
         state.bookmarks.push({
            ...action.payload,
            id: Date.now(), // Add a unique ID
            createdAt: new Date().toISOString(),
         })
      },
      removeBookmark: (state, action) => {
         state.bookmarks = state.bookmarks.filter(
            (bookmark) => bookmark.id !== action.payload
         )
      },
      updateBookmark: (state, action) => {
         const index = state.bookmarks.findIndex(
            (bookmark) => bookmark.id === action.payload.id
         )
         if (index !== -1) {
            state.bookmarks[index] = {
               ...state.bookmarks[index],
               ...action.payload,
               updatedAt: new Date().toISOString(),
            }
         }
      },
   },
})

export const { addBookmark, removeBookmark, updateBookmark } =
   bookmarksSlice.actions
export default bookmarksSlice.reducer
