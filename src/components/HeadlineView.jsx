import { useDispatch } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import {
   Star,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
} from 'lucide-react'

function HeadlineView({ bookmarks }) {
   const dispatch = useDispatch()

   const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this bookmark?')) {
         dispatch(removeBookmark(id))
      }
   }

   return (
      <div className='flex flex-col gap-4 h-[70vh] overflow-y-auto custom-scrollbar p-2'>
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
                     className='group bg-white/10 border border-cyan-300/30 shadow-md hover:bg-cyan-400/30 hover:border-cyan-300/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-cyan-200/30 hover:ring-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 min-w-0'
                     title='Edit'
                  >
                     <Pencil className='size-4 text-cyan-200 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]' />
                  </button>
                  <button
                     className='group bg-white/10 border border-red-300/30 shadow-md hover:bg-red-500/30 hover:border-red-400/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-red-200/30 hover:ring-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400/60 min-w-0'
                     title='Delete'
                     onClick={() => handleDelete(bookmark.id)}
                  >
                     <Trash className='size-4 text-red-300 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]' />
                  </button>
                  <button
                     className='group bg-white/10 border border-cyan-200/30 shadow-md hover:bg-cyan-600/30 hover:border-cyan-400/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-cyan-200/30 hover:ring-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 min-w-0'
                     title='Ask'
                  >
                     <MessageCircleQuestion className='size-4 text-cyan-300 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]' />
                  </button>
                  <a
                     href={bookmark.link}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='group bg-white/10 border border-blue-300/30 shadow-md hover:bg-blue-600/30 hover:border-blue-400/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-blue-200/30 hover:ring-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 min-w-0'
                     title='Open'
                  >
                     <ExternalLink className='size-4 text-blue-300 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]' />
                  </a>
               </div>
            </div>
         ))}
      </div>
   )
}

export default HeadlineView
