import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   bookmarks: [
      // {
      //    id: 'sample-1',
      //    title: 'Next.js Documentation',
      //    description:
      //       'The official Next.js documentation for learning and reference.',
      //    link: 'https://nextjs.org/docs',
      //    thumbnail: 'https://nextjs.org/static/favicon/favicon.ico',
      //    tags: ['docs', 'react', 'framework'],
      //    createdAt: '2024-01-01T10:00:00.000Z',
      //    category: 'Document',
      //    favorite: false,
      // },
      // {
      //    id: 'sample-2',
      //    title: 'YouTube: Fireship',
      //    description: 'Fireship - High-intensity web development tutorials.',
      //    link: 'https://www.youtube.com/c/Fireship',
      //    thumbnail:
      //       'https://www.youtube.com/s/desktop/6e8e6e8e/img/favicon.ico',
      //    tags: ['video', 'webdev', 'youtube'],
      //    createdAt: '2024-01-02T12:00:00.000Z',
      //    category: 'Video',
      //    favorite: false,
      // },
      // {
      //    id: 'sample-3',
      //    title: 'Figma',
      //    description: 'Collaborative interface design tool.',
      //    link: 'https://figma.com',
      //    thumbnail: 'https://static.figma.com/app/icon/1/favicon.ico',
      //    tags: ['design', 'tool'],
      //    createdAt: '2024-01-03T14:00:00.000Z',
      //    category: 'Tool',
      // },
      // {
      //    id: 1,
      //    title: 'AskMark Official',
      //    description: 'Your smart bookmark manager with AI-powered Q&A.',
      //    link: 'https://askmark.app',
      //    thumbnail: '/favicon.ico',
      //    tags: ['productivity', 'ai'],
      //    createdAt: new Date().toISOString(),
      //    category: 'Productivity',
      // },
      // {
      //    id: 2,
      //    title: 'Next.js Documentation',
      //    description: 'The React framework for production.',
      //    link: 'https://nextjs.org/docs',
      //    thumbnail: '/next.svg',
      //    tags: ['docs', 'react'],
      //    createdAt: new Date().toISOString(),
      //    category: 'Development',
      // },
      // {
      //    id: 3,
      //    title: 'Vercel',
      //    description:
      //       'Develop. Preview. Ship. The platform for frontend frameworks and static sites.',
      //    link: 'https://vercel.com',
      //    thumbnail: '/vercel.svg',
      //    tags: ['hosting', 'platform'],
      //    createdAt: new Date().toISOString(),
      //    category: 'Hosting',
      // },
   ],
}

const bookmarksSlice = createSlice({
   name: 'bookmarks',
   initialState,
   reducers: {
      // addBookmark: (state, action) => {
      //    state.bookmarks.push({
      //       ...action.payload,
      //       id: Date.now(), // Add a unique ID
      //       createdAt: new Date().toISOString(),
      //    })
      // },
      addBookmark: (state, action) => {
         const newBookmarks = Array.isArray(action.payload) ? action.payload : [action.payload]
         newBookmarks.forEach((bookmark) => {
            if (!state.bookmarks.some((b) => b.id === bookmark.id)) {
               state.bookmarks.push({
                  ...bookmark,
                  createdAt: bookmark.createdAt || new Date().toISOString(),
               })
            }
         })
      },
      removeBookmark: (state, action) => {
         state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== action.payload)
      },
      updateBookmark: (state, action) => {
         const index = state.bookmarks.findIndex((bookmark) => bookmark.id === action.payload.id)
         if (index !== -1) {
            state.bookmarks[index] = {
               ...state.bookmarks[index],
               ...action.payload,
               updatedAt: new Date().toISOString(),
            }
         }
      },
      clearBookmarks: (state) => {
         state.bookmarks = []
      },
   },
})

export const { addBookmark, removeBookmark, updateBookmark, clearBookmarks } = bookmarksSlice.actions
export default bookmarksSlice.reducer
