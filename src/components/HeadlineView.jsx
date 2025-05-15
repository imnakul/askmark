import { useSelector, useDispatch } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import {
   Star,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
} from 'lucide-react'

function HeadlineView() {
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
      <div className='flex flex-col gap-4 h-[70vh] overflow-y-auto custom-scrollbar p-2'>
         {bookmarks.map((bookmark) => (
            <div
               key={bookmark.id}
               className='flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-black/70 via-gray-900/70 to-cyan-900/60 border border-cyan-400 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 px-4 py-3 group card'
            >
               {/* //~ Bookmark Content */}
               <div className='flex items-center gap-4 w-full md:w-4/5'>
                  <img
                     src={bookmark.thumbnail || '/favicon.ico'}
                     alt='favicon'
                     className='w-8 h-8 rounded-full border-2 border-white shadow bg-white object-contain'
                     onError={(e) => (e.currentTarget.src = '/favicon.ico')}
                  />
                  <div className='flex-1 min-w-0'>
                     <h2
                        className='text-base font-bold text-white truncate'
                        title={bookmark.title}
                     >
                        {bookmark.title}
                     </h2>
                     <p className='text-xs text-gray-300 line-clamp-2 min-h-[2em]'>
                        {bookmark.description || 'No description.'}
                     </p>
                  </div>
                  <span
                     className='ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-700/80 text-white truncate 
                  max-w-[150px]'
                  >
                     {bookmark.category || 'Uncategorized'}
                  </span>
               </div>
               {/* //~Bookmark Actions  */}
               <div className='flex gap-2 mt-2 md:mt-0 md:w-1/5 justify-end'>
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

export default HeadlineView
