import { useSelector, useDispatch } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import {
   Star,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
} from 'lucide-react'

function GridView() {
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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 h-[70vh] overflow-y-auto custom-scrollbar p-2'>
         {bookmarks.length === 0 && (
            <div
               className='flex flex-col items-center justify-center h-full 
               lg:w-[60vw] w-[90vw] md:w-[90vw]'
            >
               <p className='text-gray-400'>No bookmarks yet.</p>
            </div>
         )}
         {bookmarks.map((bookmark) => (
            <div
               key={bookmark.id}
               className='relative bg-gradient-to-br from-cyan-900/60 via-gray-900/70 to-black/60 border border-cyan-400 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col h-64 overflow-hidden card'
            >
               <div className='flex-1 flex flex-col items-center justify-center p-4'>
                  <img
                     src={bookmark.thumbnail || '/favicon.ico'}
                     alt='favicon'
                     className='w-14 h-14 rounded-full border-2 border-white shadow bg-white object-contain mb-2'
                     onError={(e) => (e.currentTarget.src = '/favicon.ico')}
                  />
                  <h2
                     className='text-base font-bold text-white text-center truncate w-full'
                     title={bookmark.title}
                  >
                     {bookmark.title}
                  </h2>
                  <span className='mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-700/80 text-white truncate max-w-[120px]'>
                     {bookmark.category || 'Uncategorized'}
                  </span>
                  <p className='text-xs text-gray-300 line-clamp-3 text-center mt-2 min-h-[3em]'>
                     {bookmark.description || 'No description.'}
                  </p>
               </div>
               <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-2 flex items-center justify-between gap-2'>
                  <div className='flex gap-2'>
                     <button
                        className='p-1.5 rounded-full bg-green-700/80 hover:bg-green-600 transition'
                        title='Edit'
                     >
                        <Pencil className='size-5 text-white' />
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
   )
}

export default GridView
