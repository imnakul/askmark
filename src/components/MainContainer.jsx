import ListView from '@/components/ListView'
import GridView from '@/components/GridView'
import HeadlineView from '@/components/HeadlineView'
import { CircleDashed } from 'lucide-react'

function MainContainer({
   handleShowModal,
   sortedBookmarks,
   loading,
   listView,
   cardView,
   headlineView,
}) {
   return (
      <div className='flex items-center justify-center w-full h-[58vh] md:h-[76vh] lg:h-[73vh] gap-2 '>
         <div className='hidden lg:block w-1/6 h-full items-center border border-teal-400 p-4 bg-white/10 rounded-md overflow-y-auto border-r text-sm space-y-6'>
            {/* Section: General */}
            <div className='space-y-2 '>
               <div className='text-gray-300 cursor-pointer text-base'>
                  All bookmarks
               </div>
               <div className='text-gray-300 ml-4 cursor-pointer'>Unsorted</div>
               <div className='text-gray-300 ml-4 cursor-pointer'>Trash</div>
            </div>

            {/* Section: Collections */}
            <div>
               <div className='flex justify-between items-center uppercase text-xs text-gray-400 mb-2'>
                  <span>Collections</span>
                  <button className='text-teal-500 hover:text-teal-700 text-base leading-none'>
                     ＋
                  </button>
               </div>
               <ul className='space-y-2'>
                  {/* Dropdown: Design Inspiration */}
                  {folders.map((folder) => (
                     <li className='flex items-center gap-2 '>
                        <span>{folder.icon}</span> {folder.title}
                        <span className='ml-auto text-gray-400'>
                           {folder.count}
                        </span>
                     </li>
                  ))}
                  {/* <li>
                                 <div
                                    className='flex items-center gap-2  cursor-pointer'
                                    onClick={() =>
                                       toggleDropdown('Design Inspiration')
                                    }
                                 >
                                    <span>🎨</span> Design Inspiration
                                    <span className='ml-auto '>
                                       {openDropdowns['Design Inspiration']
                                          ? '−'
                                          : '+'}
                                    </span>
                                 </div>
                                 {openDropdowns['Design Inspiration'] && (
                                    <ul className='ml-6 mt-1 space-y-1'>
                                       <li className='text-gray-600'>
                                          UI Ideas
                                       </li>
                                       <li className='text-gray-600'>
                                          Color Schemes
                                       </li>
                                    </ul>
                                 )}
                              </li> */}
               </ul>
            </div>

            {/* Section: Filters */}
            <div>
               <div className='uppercase text-xs text-gray-400 mb-2'>
                  Filters
               </div>
               <ul className='space-y-2'>
                  {filters.map((filter) => {
                     return (
                        <li className='flex justify-between'>
                           <span>
                              {filter.icon} {filter.title}
                           </span>
                           <span className='text-gray-400'>{filter.count}</span>
                        </li>
                     )
                  })}
               </ul>
            </div>
         </div>

         {/* //?? MAIN CONTAINER WITH VIEWS RENDERING  */}
         <div className='w-full lg:w-5/6 h-full items-center p-2  '>
            {loading && (
               <div className='flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8'>
                  <CircleDashed className='text-cyan-400 font-bold text-4xl sm:text-5xl lg:text-6xl animate-spin mb-4' />
                  <p className='text-xl sm:text-2xl font-semibold text-cyan-500 mb-4 text-center'>
                     Adding bookmark...
                  </p>
               </div>
            )}
            {listView && !loading && (
               <ListView
                  handleShowModal={handleShowModal}
                  bookmarks={sortedBookmarks}
               />
            )}
            {cardView && !loading && (
               <GridView
                  handleShowModal={handleShowModal}
                  bookmarks={sortedBookmarks}
               />
            )}
            {headlineView && !loading && (
               <HeadlineView
                  handleShowModal={handleShowModal}
                  bookmarks={sortedBookmarks}
               />
            )}
         </div>
      </div>
   )
}

export default MainContainer

const folders = [
   { title: 'Interior', icon: '🛋️', count: 11 },
   { title: 'Interface', icon: '💎', count: 9 },
   { title: 'Icons', icon: '📁', count: 5 },
   { title: 'Apps', icon: '📱', count: 5 },
   { title: 'Buy', icon: '🛒', count: 7 },
   { title: 'Movies', icon: '🎬', count: 7 },
   { title: 'Plan next trip', icon: '📝', count: 7 },
]

const filters = [
   { title: '🖼️ Images', count: 14 },
   { title: '📄 Articles', count: 12 },
   { title: '🎥 Video', count: 4 },
   { title: '❌ Broken', count: 2 },
   { title: '🚫 Without tags', count: 51 },
]
