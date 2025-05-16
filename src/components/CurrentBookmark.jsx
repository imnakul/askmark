import {
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
   Copy,
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeBookmark } from '@/store/slices/bookmarksSlice'
import { db } from '@/lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

function CurrentBookmark({ currentBookmark }) {
   const dispatch = useDispatch()
   const handleDelete = async (idOrLink) => {
      if (!window.confirm('Are you sure you want to delete this bookmark?'))
         return
      dispatch(removeBookmark(idOrLink))
      // Remove from Firestore as well
      // try {
      //    const userId = JSON.parse(localStorage.getItem('persist:root'))?.auth
      //       ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)
      //            .user?.uid
      //       : null
      //    if (!userId) return
      //    // Try both id and link as doc id (for compatibility)
      //    await deleteDoc(
      //       doc(
      //          db,
      //          'users',
      //          userId,
      //          'bookmarks',
      //          encodeURIComponent(currentBookmark.link)
      //       )
      //    )
      //    // Optionally: await deleteDoc(doc(db, 'users', userId, 'bookmarks', String(idOrLink)))
      // } catch (err) {
      //    // Optionally handle error
      //    console.error('Error deleting bookmark from Firestore:', err)
      // }
   }

   return (
      <div className='flex flex-col md:flex-row gap-8 p-4 min-w-[340px] max-w-6xl mx-auto items-stretch'>
         {/*//?? Left: Details */}
         <div className='flex-1 flex flex-col gap-4 relative w-2/3'>
            {/* Action Buttons at Top Right, small and inline */}
            <div className='absolute right-0 top-0 flex flex-row gap-2 z-10'>
               <button
                  className='group bg-white/10 border border-cyan-300/30 shadow-md hover:bg-cyan-400/30 hover:border-cyan-300/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-cyan-200/30 hover:ring-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 min-w-0'
                  title='More Info'
               >
                  <Pencil className='size-4 text-cyan-200 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]' />
               </button>
               <button
                  className='group bg-white/10 border border-red-300/30 shadow-md hover:bg-red-500/30 hover:border-red-400/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-red-200/30 hover:ring-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400/60 min-w-0'
                  title='Delete'
                  onClick={() =>
                     handleDelete(currentBookmark.id || currentBookmark.link)
                  }
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
            {/* Top: Icon, Title, Category */}
            <div className='flex flex-col items-center w-full pt-2 pb-1'>
               <img
                  src={currentBookmark.thumbnail || '/favicon.ico'}
                  alt='favicon'
                  className='w-16 h-16 rounded-lg border-2 border-cyan-400 bg-white object-contain shadow mb-2'
                  onError={(e) => (e.currentTarget.src = '/favicon.ico')}
               />
               <h2
                  className='text-2xl font-bold text-white text-center mb-1 truncate max-w-full'
                  title={currentBookmark.title}
               >
                  {currentBookmark.title || 'Untitled'}
               </h2>
               <span className='text-xs px-3 py-1 rounded bg-cyan-700/80 text-white font-semibold tracking-wide mb-2'>
                  {currentBookmark.category || 'Uncategorized'}
               </span>
            </div>
            {/* Details Section */}
            <div className='w-full gap-x-8 gap-y-3 text-base bg-black/30 px-4 py-2 rounded-lg flex flex-wrap items-center justify-between'>
               {/* Link */}
               {currentBookmark.link && (
                  <div className='flex items-center gap-2 '>
                     <a
                        href={currentBookmark.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 bg-cyan-900/60 hover:bg-cyan-800/80 border border-cyan-400/30 px-3 py-1 rounded-full text-cyan-200 font-medium shadow transition-all duration-150 max-w-[220px] truncate'
                        title={currentBookmark.link}
                     >
                        <ExternalLink className='size-4 text-cyan-300' />
                        <span className='truncate'>
                           {currentBookmark.link
                              .replace(/^https?:\/\//, '')
                              .slice(0, 32)}
                           {currentBookmark.link.length > 32 ? '…' : ''}
                        </span>
                     </a>
                     <button
                        className='group bg-cyan-900/60 hover:bg-cyan-800/80 border border-cyan-400/30 px-2 py-1 rounded-full flex items-center justify-center transition-all duration-150 ml-1'
                        title='Copy link to clipboard'
                        onClick={() =>
                           navigator.clipboard.writeText(currentBookmark.link)
                        }
                     >
                        <Copy className='size-4 text-cyan-300 group-hover:text-white' />
                     </button>
                  </div>
               )}
               {/* Topic Area */}
               {currentBookmark.topicArea && (
                  <div className='flex flex-col items-center md:items-start'>
                     <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider'>
                        Topic Area
                     </span>
                     <span className='text-cyan-100 font-medium text-center md:text-left'>
                        {currentBookmark.topicArea}
                     </span>
                  </div>
               )}
               {/* Tone */}
               {currentBookmark.tone && (
                  <div className='flex flex-col items-center md:items-start'>
                     <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider'>
                        Tone
                     </span>
                     <span className='text-cyan-100 font-medium text-center md:text-left'>
                        {currentBookmark.tone}
                     </span>
                  </div>
               )}
               {/* Suggested Action */}
               {/* {currentBookmark.suggestedAction && (
                  <div className='flex flex-col items-center md:items-start'>
                     <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider'>
                        Suggested Action
                     </span>
                     <span className='text-cyan-100 font-medium text-center md:text-left'>
                        {currentBookmark.suggestedAction}
                     </span>
                  </div>
               )} */}
            </div>
            {/* Summary Section */}
            {currentBookmark.shortSummary && (
               <div className='w-full flex flex-col items-center mt-2'>
                  <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider mb-1'>
                     Summary
                  </span>
                  <span className='text-white text-center leading-relaxed max-w-2xl bg-cyan-900/30 rounded-lg px-4 py-2'>
                     {currentBookmark.shortSummary}
                  </span>
               </div>
            )}
            {/* Description Section */}
            {currentBookmark.description &&
               currentBookmark.description.trim() && (
                  <div className='w-full flex flex-col items-center mt-2'>
                     <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider mb-1'>
                        Description
                     </span>
                     <span className='text-white text-center leading-relaxed max-w-2xl bg-cyan-900/30 rounded-lg px-4 py-2'>
                        {currentBookmark.description}
                     </span>
                  </div>
               )}
            {/* Tags Section */}
            {currentBookmark.tags && currentBookmark.tags.length > 0 && (
               <div className='w-full flex flex-col items-center mt-2'>
                  <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider mb-1'>
                     Tags
                  </span>
                  <div className='flex flex-wrap gap-2 justify-center'>
                     {currentBookmark.tags.map((tag, idx) => (
                        <span
                           key={idx}
                           className='bg-cyan-800/80 text-cyan-100 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-700/60'
                        >
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>
            )}
            {/* Created At */}
            <div className='w-full flex flex-col items-center mt-2'>
               <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider mb-1'>
                  Created At
               </span>
               <span className='text-cyan-100 text-center'>
                  {currentBookmark.createdAt
                     ? new Date(currentBookmark.createdAt).toLocaleString()
                     : 'N/A'}
               </span>
            </div>
         </div>
         {/*//?? Right: AI Chat Column, always visible and wider */}
         <div className='flex flex-col max-w-md min-w-[340px] border-l border-cyan-900/40 pl-6 w-1/3'>
            <div className='text-cyan-400 text-lg font-semibold mb-2 text-center'>
               AI Chat
            </div>
            <div className='flex-1 flex flex-col justify-between items-stretch text-cyan-300 opacity-90 min-h-[340px] border border-cyan-500 rounded-xl p-3 bg-black/40'>
               {/* Chat messages area */}
               <div className='flex-1 flex flex-col gap-2 overflow-y-auto mb-2'>
                  {/* Example chat bubble */}
                  <div className='self-start bg-cyan-800/60 text-white px-3 py-2 rounded-lg max-w-[80%]'>
                     AI Chat coming soon...
                  </div>
                  {/* User/AI messages will go here */}
               </div>
               {/* Chat input area */}
               <form className='flex gap-2 mt-2'>
                  <input
                     type='text'
                     className='flex-1 rounded-lg px-3 py-2 bg-cyan-950/60 text-cyan-100 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm'
                     placeholder='Type your question...'
                     disabled
                  />
                  <button
                     type='submit'
                     className='rounded-lg px-4 py-2 bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition disabled:opacity-60'
                     disabled
                  >
                     Send
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}
export default CurrentBookmark
// Suggestion: For best readability, consider using a slightly more opaque modal background, e.g. bg-black/70 or bg-slate-900/80, instead of bg-black/30, to increase contrast and reduce distraction from the page behind.
