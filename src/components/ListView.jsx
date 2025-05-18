// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import { InfoIcon, ExternalLink, MessageCircleQuestion, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

function ListView({ handleShowModal, bookmarks }) {
   const dispatch = useDispatch()
   const userId = useSelector((state) => state.auth.user?.uid)
   const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)

   const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this bookmark?')) {
         dispatch(removeBookmark(id))
         if (isLoggedIn) {
            await deleteDoc(doc(db, 'users', userId, 'bookmarks', String(id)))
         }
         toast.success('Bookmark deleted!')
      }
   }

   return (
      <>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 h-[70vh] overflow-y-auto custom-scrollbar p-2'>
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
                  <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-1 flex items-center justify-between gap-2 pb-4'>
                     <div className='flex gap-2'>
                        <button
                           className='group bg-white/10 border border-cyan-300/30 shadow-md hover:bg-cyan-400/30 hover:border-cyan-300/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-cyan-200/30 hover:ring-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 min-w-0'
                           title='More Info'
                           onClick={() => handleShowModal(bookmark)}
                        >
                           <InfoIcon className='size-4 text-cyan-200 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]' />
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
                     </div>
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
      </>
   )
}

export default ListView
