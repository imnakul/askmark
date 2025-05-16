import {
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
   Copy,
} from 'lucide-react'

function CurrentBookmark({ currentBookmark }) {
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
            <div className='w-full  gap-x-8 gap-y-3 text-base bg-black/30 px-4 py-2 rounded-lg flex items0-center justify-between'>
               {/* Link */}
               {currentBookmark.link && (
                  <div className='flex items-center gap-4 justify-start md:items-start'>
                     <button
                        className='group bg-white/10 border border-cyan-200/30 shadow-md hover:bg-cyan-600/30 hover:border-cyan-400/70 active:scale-95 transition-all duration-150 rounded-lg p-1.5 flex items-center justify-center backdrop-blur-lg ring-1 ring-cyan-200/30 hover:ring-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 min-w-0'
                        title='Ask'
                     >
                        <Copy className='size-4 text-cyan-300 group-hover:text-white transition drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]' />
                     </button>
                     <a
                        href={currentBookmark.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-cyan-200 underline break-all text-center md:text-left font-medium hover:text-cyan-400 transition-all'
                     >
                        Link{' '}
                        {/* <ExternalLink className='inline-block size-3 ml-1 ' /> */}
                     </a>
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
         <div className='flex flex-col max-w-sm min-w-[320px] border-l border-cyan-900/40 pl-6 w-1/3'>
            <div className='text-cyan-400 text-lg font-semibold mb-2 text-center'>
               AI Chat
            </div>
            <div className='flex-1 flex flex-col justify-center items-center text-cyan-300 opacity-80 min-h-[300px] border border-cyan-500 rounded-lg p-2'>
               AI Chat coming soon...
            </div>
         </div>
      </div>
   )
}
export default CurrentBookmark
