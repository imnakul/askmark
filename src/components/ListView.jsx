import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import {
   InfoIcon,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
   Info,
} from 'lucide-react'

function ListView() {
   const dispatch = useDispatch()
   const bookmarks = useSelector((state) =>
      Array.isArray(state.bookmarks?.bookmarks) ? state.bookmarks.bookmarks : []
   )

   const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this bookmark?')) {
         dispatch(removeBookmark(id))
      }
   }

   return (
      <>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 h-[70vh] overflow-y-auto custom-scrollbar p-2'>
            {bookmarks.map((bookmark) => (
               <div
                  key={bookmark.id}
                  className='relative bg-gradient-to-br from-black/60 via-gray-900/70 to-cyan-900/60 border border-cyan-400 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-52 overflow-hidden card'
               >
                  {/* Favicon and Category */}
                  <div className='flex items-center justify-between px-4 pt-4'>
                     <img
                        src={bookmark.thumbnail || '/favicon.ico'}
                        alt='favicon'
                        className='w-10 h-10 rounded-full border-2 border-white shadow-md bg-white object-contain'
                        onError={(e) => (e.currentTarget.src = '/favicon.ico')}
                     />
                     <span
                        className='px-3 py-1 rounded-full text-xs font-semibold bg-cyan-700/80 text-white ml-2 truncate 
                     max-w-[150px]'
                     >
                        {bookmark.category || 'Uncategorized'}
                     </span>
                  </div>
                  {/* Title */}
                  <div className='flex-1 flex flex-col justify-top px-4 my-4'>
                     <h2
                        className='text-lg font-bold text-white truncate mb-1'
                        title={bookmark.title}
                     >
                        {bookmark.title}
                     </h2>
                     <p className='text-xs text-gray-300 line-clamp-2 mb-2 min-h-[2.5em]'>
                        {bookmark.description || 'No description.'}
                     </p>
                  </div>
                  {/* Action Buttons */}
                  <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-2 flex items-center justify-between gap-2 pb-4'>
                     <div className='flex gap-2'>
                        <button
                           className='p-1.5 rounded-full bg-green-700/80 hover:bg-green-600 transition'
                           title='Edit'
                        >
                           <InfoIcon className='size-5 text-white' />
                        </button>
                        <button
                           className='p-1.5 rounded-full bg-red-700/80 hover:bg-red-600 transition'
                           title='Delete'
                           onClick={() => handleDelete(bookmark.id)}
                        >
                           <Trash className='size-5 text-white' />
                        </button>
                        {/* <button
                           className='p-1.5 rounded-full bg-yellow-600/80 hover:bg-yellow-500 transition'
                           title='Favorite'
                        >
                           <Star className='size-5 text-white' />
                        </button> */}
                        <button
                           className='p-1.5 rounded-full bg-cyan-700/80 hover:bg-cyan-600 transition'
                           title='Ask'
                        >
                           <MessageCircleQuestion className='size-5 text-white' />
                        </button>
                     </div>
                     <a
                        href={bookmark.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-1.5 rounded-full bg-blue-700/80 hover:bg-blue-600 transition'
                        title='Open'
                     >
                        <ExternalLink className='size-5 text-white' />
                     </a>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}

export default ListView
