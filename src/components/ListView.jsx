import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import {
   Star,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
} from 'lucide-react'

function ListView() {
   const dispatch = useDispatch()
   const bookmarks = useSelector((state) => state.bookmarks.bookmarks)

   const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this bookmark?')) {
         dispatch(removeBookmark(id))
      }
   }

   return (
      <>
         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 h-[70vh] overflow-y-auto space-y-2 p-2'>
            {bookmarks.map((bookmark) => (
               <div
                  key={bookmark.id}
                  className={`card w-88 md:w-60 lg:w-78 relative bg-black/30 border border-teal-400 card-md shadow-sm rounded-md transition duration-200 hover:scale-105 h-44 `}
               >
                  <div className='card-body px-3 py-3'>
                     <div className='flex items-center justify-start gap-4'>
                        <img
                           type='icon'
                           src={bookmark.thumbnail}
                           alt='favicon'
                           className='size-8'
                        />
                        <h2 className='card-title w-56 text-base '>
                           {bookmark.title}
                        </h2>
                     </div>
                     {/* <div className='absolute top-3 right-3'>
                        <button
                           title='Ask a question'
                           className='cursor-pointer'
                        >
                           <MessageCircleQuestion className='size-7 text-cyan-300 hover:animate-spin' />
                        </button>
                     </div> */}
                     <p>{bookmark.description}</p>
                     <div className='flex items-center justify-between mt-2'>
                        <div className='badge badge-outline badge-sm '>
                           {bookmark.tags?.join(', ') || 'No tags'}
                        </div>
                        <div className='justify-end card-actions w-full gap-1'>
                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Edit'
                           >
                              <Pencil className='size-5 text-green-400 p-0.5' />
                           </button>
                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Delete'
                              onClick={() => handleDelete(bookmark.id)}
                           >
                              <Trash className='size-5 text-red-400 p-0.5' />
                           </button>
                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Favorite'
                           >
                              <Star className='size-5 text-teal-400 p-0.5' />
                           </button>
                           <a
                              href={bookmark.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Open'
                           >
                              <ExternalLink className='size-5 text-blue-400 p-0.5' />
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}

export default ListView
