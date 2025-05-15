import { Footer } from '@/components/ui/footer'
import {
   FileText,
   Youtube,
   Wrench,
   Funnel,
   LayoutList,
   List,
   LayoutGrid,
   CircleDashed,
   SortAsc,
} from 'lucide-react'

import { useState, useRef, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import Modal from '@/components/ui/modal'
import { webExtractor } from '@/functions/webExtractor.mjs'
import Navbar from '@/components/ui/Navbar'
import ListView from '@/components/ListView'
import GridView from '@/components/GridView'
import HeadlineView from '@/components/HeadlineView'
import { useDispatch, useSelector } from 'react-redux'
import { addBookmark } from '@/store/slices/bookmarksSlice'

function Collections() {
   const dispatch = useDispatch()
   const bookmarks = useSelector((state) => state.bookmarks.bookmarks)

   const [visible, setVisible] = useState(false)
   const ref = useRef(null)
   const [QR, setQR] = useState(false)
   const [showDropdown, setShowDropdown] = useState(false)
   const [showbookmarkModal, setShowBookmarkModal] = useState(false)
   const [webUrl, setWebUrl] = useState('')
   const dropdownRef = useRef(null)

   const [listView, setListView] = useState(true)
   const [cardView, setCardView] = useState(false)
   const [headlineView, setHeadlineView] = useState(false)
   const [loading, setLoading] = useState(false)

   const [sortDropdown, setSortDropdown] = useState(false)
   const [sortOption, setSortOption] = useState('Newest')
   const [search, setSearch] = useState('')
   const [currentBookmark, setCurrentBookmark] = useState({})

   const getSortedBookmarks = () => {
      let filtered = bookmarks
      if (search.trim()) {
         filtered = filtered.filter(
            (b) =>
               b.title &&
               b.title.toLowerCase().includes(search.trim().toLowerCase())
         )
      }
      let sorted = [...filtered]
      switch (sortOption) {
         case 'Newest':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            break
         case 'Oldest':
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            break
         case 'A-Z':
            sorted.sort((a, b) => a.title.localeCompare(b.title))
            break
         case 'Z-A':
            sorted.sort((a, b) => b.title.localeCompare(a.title))
            break
         case 'Favorites':
            sorted.sort((a, b) =>
               b.favorite === a.favorite ? 0 : b.favorite ? 1 : -1
            )
            break
         default:
            break
      }
      return sorted
   }

   const handleUrlSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)

      if (!webUrl) {
         alert('Please enter a valid URL.')
         return
      }

      try {
         const response = await fetch(
            `/api/extract?url=${encodeURIComponent(webUrl)}`
         )

         const json = await response.json()
         if (json.success) {
            console.log('Extracted Data:', json.data)
            const {
               category,
               shortSummary,
               tags,
               suggestedTitle,
               topicArea,
               tone,
               suggestedAction,
            } = json.data.aiAnalysis
            // Add the bookmark to Redux store
            dispatch(
               addBookmark({
                  title: json.data.title || 'Untitled',
                  description: json.data.metaDescription || '',
                  link: webUrl,
                  thumbnail: json.data.favicon || '',
                  tags: [...tags], // Can be updated later
                  createdAt: new Date().toISOString(),
                  category: category,
                  shortSummary: shortSummary,
                  suggestedTitle: suggestedTitle,
                  topicArea: topicArea,
                  tone: tone,
                  suggestedAction: suggestedAction,
               })
            )

            // Clear the input
            setWebUrl('')
            // Show success message or notification
         } else {
            console.error('Error:', json.error)
            // Show error message
         }
      } catch (error) {
         console.error('Error extracting data:', error)
         // Show error message
      } finally {
         setLoading(false)
      }
   }

   // Handle click outside to close dropdown
   useEffect(() => {
      function handleClickOutside(event) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setShowDropdown(false)
         }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   const { scrollY } = useScroll({
      target: ref,
      offset: ['start start', 'end start'],
   })

   useMotionValueEvent(scrollY, 'change', (latest) => {
      if (latest > 100) {
         setVisible(true)
      } else {
         setVisible(false)
      }
   })

   const handleShowModal = (bookmark) => {
      console.log('bookmark', bookmark)
      setCurrentBookmark(bookmark)
      setShowBookmarkModal(!showbookmarkModal)
   }

   const [openDropdowns, setOpenDropdowns] = useState({
      'Design Inspiration': false,
      Movies: false,
   })

   const toggleDropdown = (key) => {
      setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
   }

   return (
      <>
         <div className="bg-[url('/3.jpg')] bg-cover bg-center h-full w-full">
            {/* //? Navbar  */}
            <Navbar QR={QR} setQR={setQR} />

            <div className='max-w-7xl mx-auto pt-4 '>
               {/* //? QR MODAL */}
               {QR && (
                  <Modal
                     showModal={QR}
                     setShowModal={setQR}
                     modalContainerClass={
                        'w-[80vw] sm:w-full sm:max-w-sm sm:p-10'
                     }
                     closeModalOutsideClick={() => setQR(false)}
                     header='Scan / Click to Give me a Boost'
                  >
                     <div className='flex items-center justify-center w-full p-2'>
                        <a
                           href='https://www.buymeacoffee.com/imnakul'
                           target='_blank'
                        >
                           <img src='/qr.png' className='size-72' />
                        </a>
                     </div>
                  </Modal>
               )}

               {/* //? Bookmarks Modal */}
               {showbookmarkModal && (
                  <Modal
                     showModal={showbookmarkModal}
                     setShowModal={setShowBookmarkModal}
                     header={
                        currentBookmark?.title
                           ? `Bookmark Details`
                           : 'Add New Bookmark'
                     }
                     modalContainerClass={
                        'bg-black/30 w-[99vw] sm:w-full sm:max-w-4xl rounded-2xl shadow-2xl'
                     }
                     closeModalOutsideClick={() => setShowBookmarkModal(false)}
                  >
                     {currentBookmark && (
                        <div className='flex flex-col md:flex-row gap-8 p-4 min-w-[340px] max-w-4xl mx-auto items-stretch'>
                           {/* Left: Details */}
                           <div className='flex-1 flex flex-col gap-4 relative'>
                              {/* Action Buttons at Top Right, small and inline */}
                              <div className='absolute right-0 top-0 flex flex-row gap-2 z-10'>
                                 <button className='px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-800 text-white font-medium text-sm shadow-sm transition'>
                                    Edit
                                 </button>
                                 <button className='px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-sm transition'>
                                    Delete
                                 </button>
                                 <button className='px-3 py-1 rounded bg-cyan-900 hover:bg-cyan-800 text-cyan-200 font-medium text-sm shadow-sm transition'>
                                    Ask
                                 </button>
                              </div>
                              {/* Top: Icon, Title, Category */}
                              <div className='flex flex-col items-center w-full pt-2 pb-1'>
                                 <img
                                    src={
                                       currentBookmark.thumbnail ||
                                       '/favicon.ico'
                                    }
                                    alt='favicon'
                                    className='w-16 h-16 rounded-lg border-2 border-cyan-400 bg-white object-contain shadow mb-2'
                                    onError={(e) =>
                                       (e.currentTarget.src = '/favicon.ico')
                                    }
                                 />
                                 <h2
                                    className='text-2xl font-bold text-white text-center mb-1 truncate max-w-full'
                                    title={currentBookmark.title}
                                 >
                                    {currentBookmark.title || 'Untitled'}
                                 </h2>
                                 <span className='text-xs px-3 py-1 rounded bg-cyan-700/80 text-white font-semibold tracking-wide mb-2'>
                                    {currentBookmark.category ||
                                       'Uncategorized'}
                                 </span>
                              </div>
                              {/* Details Section */}
                              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-base'>
                                 {/* Link */}
                                 {currentBookmark.link && (
                                    <div className='flex flex-col items-center md:items-start'>
                                       <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider'>
                                          Link
                                       </span>
                                       <a
                                          href={currentBookmark.link}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='text-cyan-200 underline break-all text-center md:text-left font-medium hover:text-cyan-400 transition-all'
                                       >
                                          {currentBookmark.link}
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
                                 {currentBookmark.suggestedAction && (
                                    <div className='flex flex-col items-center md:items-start'>
                                       <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider'>
                                          Suggested Action
                                       </span>
                                       <span className='text-cyan-100 font-medium text-center md:text-left'>
                                          {currentBookmark.suggestedAction}
                                       </span>
                                    </div>
                                 )}
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
                              {currentBookmark.tags &&
                                 currentBookmark.tags.length > 0 && (
                                    <div className='w-full flex flex-col items-center mt-2'>
                                       <span className='font-semibold text-cyan-300 uppercase text-xs tracking-wider mb-1'>
                                          Tags
                                       </span>
                                       <div className='flex flex-wrap gap-2 justify-center'>
                                          {currentBookmark.tags.map(
                                             (tag, idx) => (
                                                <span
                                                   key={idx}
                                                   className='bg-cyan-800/80 text-cyan-100 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-700/60'
                                                >
                                                   {tag}
                                                </span>
                                             )
                                          )}
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
                                       ? new Date(
                                            currentBookmark.createdAt
                                         ).toLocaleString()
                                       : 'N/A'}
                                 </span>
                              </div>
                           </div>
                           {/* Right: AI Chat Column, always visible and wider */}
                           <div className='flex flex-col w-full max-w-sm min-w-[320px] border-l border-cyan-900/40 pl-6'>
                              <div className='text-cyan-400 text-lg font-semibold mb-2 text-center'>
                                 AI Chat
                              </div>
                              <div className='flex-1 flex flex-col justify-center items-center text-cyan-300 opacity-80 min-h-[300px]'>
                                 AI Chat coming soon...
                              </div>
                           </div>
                        </div>
                     )}
                  </Modal>
               )}

               {/* //? MAIN CONTAINER  */}
               <div className='w-full bg-white/5 flex flex-col items-center justify-end p-2 gap-2'>
                  {/* //?? TOPBAR  */}
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full h-auto min-h-16 gap-2 px-2 sm:px-4 py-2 bg-white/5 rounded-md shadow-sm'>
                     <div className='flex items-center gap-2 w-full sm:w-1/5'>
                        {/* //~Search  */}
                        <input
                           placeholder='Search Bookmark'
                           className='py-2 px-3 rounded-md bg-gray-800 border-cyan-300 border w-full text-sm focus:outline-none focus:ring focus:ring-cyan-400'
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* //~ Filter Dropdown */}
                        <div className='relative' ref={dropdownRef}>
                           <button
                              onClick={() => setShowDropdown(!showDropdown)}
                              className={`transition-all duration-500 cursor-pointer ml-1`}
                           >
                              <Funnel
                                 className={`size-5 transition-transform duration-200 text-cyan-300 hover:text-cyan-600  ${
                                    !showDropdown ? 'rotate-360' : ''
                                 }`}
                              />
                           </button>
                           {showDropdown && (
                              <div className='absolute right-1 top-8 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right'>
                                 <button className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'>
                                    <FileText className='size-5' />
                                    <span className='space-grotesk  text-sm text-gray-700 dark:text-gray-300'>
                                       Document
                                    </span>
                                 </button>

                                 <button className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'>
                                    <Youtube className='size-5' />
                                    <span className='space-grotesk text-sm text-gray-700 dark:text-gray-300'>
                                       Video
                                    </span>
                                 </button>

                                 <button className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150'>
                                    <Wrench className='size-5' />
                                    <span className='space-grotesk text-sm text-gray-700 dark:text-gray-300'>
                                       Tool
                                    </span>
                                 </button>
                              </div>
                           )}
                        </div>
                        {/* //~ Sort Dropdown */}
                        <div className='relative'>
                           <button
                              onClick={() => setSortDropdown(!sortDropdown)}
                              className='transition-all duration-500 cursor-pointer ml-1'
                              title='Sort bookmarks'
                           >
                              <SortAsc className='size-5 text-cyan-300 hover:text-cyan-600' />
                           </button>
                           {sortDropdown && (
                              <div className='absolute right-0 top-8 mt-2 w-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right'>
                                 {['Newest', 'Oldest', 'A-Z', 'Z-A'].map(
                                    (option) => (
                                       <button
                                          key={option}
                                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-3 transition-colors duration-150 ${
                                             sortOption === option
                                                ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 font-semibold'
                                                : 'text-gray-700 dark:text-gray-300'
                                          }`}
                                          onClick={() => {
                                             setSortOption(option)
                                             setSortDropdown(false)
                                          }}
                                       >
                                          {option}
                                       </button>
                                    )
                                 )}
                              </div>
                           )}
                        </div>
                     </div>

                     {/* //~ Add bookmark  */}
                     <form
                        className='w-full max-w-lg mx-auto'
                        onSubmit={(e) => handleUrlSubmit(e)}
                     >
                        <label
                           htmlFor='search'
                           className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                        >
                           Bookmark Url
                        </label>
                        <div className='relative'>
                           <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                              {/* <BookmarkPlus className={`size-5 `} /> */}
                              <img
                                 src='/add.png'
                                 alt='logo'
                                 className='size-7 '
                              />
                           </div>
                           <input
                              type='url'
                              id='search'
                              className='block w-full p-3 ps-13 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-cyan-400  focus:outline-none'
                              placeholder='https://example.com'
                              value={webUrl}
                              onChange={(e) => setWebUrl(e.target.value)}
                              autoComplete='off'
                           />
                           <button
                              type='submit'
                              className='text-white absolute end-2.5 bottom-[7px] bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer hover:scale-95 transition-all duration-200'
                           >
                              Add
                           </button>
                        </div>
                     </form>

                     {/* //~View Modes  */}
                     <div
                        className='inline-flex rounded-md justify-center items-center w-full sm:w-auto mt-2 sm:mt-0'
                        role='group'
                     >
                        <button
                           type='button'
                           className={`px-4 py-2 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 transition-all duration-150
                              rounded-s-lg
                              ${
                                 listView
                                    ? 'bg-cyan-600 text-white shadow font-bold scale-105'
                                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-cyan-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                              }`}
                           onClick={() => {
                              setListView(true)
                              setCardView(false)
                              setHeadlineView(false)
                           }}
                        >
                           <span className='flex items-center gap-2'>
                              Detailed <LayoutList className='size-4' />
                           </span>
                        </button>
                        <button
                           type='button'
                           className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 transition-all duration-150
                              ${
                                 cardView
                                    ? 'bg-cyan-600 text-white shadow font-bold scale-105'
                                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-cyan-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                              }`}
                           onClick={() => {
                              setCardView(true)
                              setListView(false)
                              setHeadlineView(false)
                           }}
                        >
                           <span className='flex items-center gap-2'>
                              Cards <LayoutGrid className='size-4' />
                           </span>
                        </button>
                        <button
                           type='button'
                           className={`px-4 py-2 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 transition-all duration-150
                              rounded-e-lg
                              ${
                                 headlineView
                                    ? 'bg-cyan-600 text-white shadow font-bold scale-105'
                                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-cyan-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                              }`}
                           onClick={() => {
                              setHeadlineView(true)
                              setCardView(false)
                              setListView(false)
                           }}
                        >
                           <span className='flex items-center gap-2'>
                              Headlines <List className='size-4' />
                           </span>
                        </button>
                     </div>
                  </div>
                  {/* //~ Sidebar  */}
                  <div className='flex items-center justify-center w-full h-[58vh] md:h-[76vh] lg:h-[73vh] gap-2 '>
                     {/* <div className='hidden lg:block w-1/6 h-full items-center border border-teal-400 p-4 bg-white/10 rounded-md'>
                        Collections
                        <ul className='mt-2 border-pink-300 border w-full h-[90%] overflow-y-hidden space-y-2 p-2 rounded-md'>
                           <li>Collection 1</li>
                           <li>Collection 2</li>
                           <li>Collection 2</li>
                           <li>Collection 2</li>
                           <li>Collection 2</li>
                           <li>Collection 2</li>
                        </ul>
                     </div> */}
                     <div className='hidden lg:block w-1/6 h-full items-center border border-teal-400 p-4 bg-white/10 rounded-md overflow-y-auto border-r text-sm space-y-6'>
                        {/* Section: General */}
                        <div className='space-y-2 '>
                           <div className='text-gray-300 cursor-pointer text-base'>
                              All bookmarks
                           </div>
                           <div className='text-gray-300 ml-4 cursor-pointer'>
                              Unsorted
                           </div>
                           <div className='text-gray-300 ml-4 cursor-pointer'>
                              Trash
                           </div>
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
                                       <span className='text-gray-400'>
                                          {filter.count}
                                       </span>
                                    </li>
                                 )
                              })}
                           </ul>
                        </div>
                     </div>

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
                              bookmarks={getSortedBookmarks()}
                           />
                        )}
                        {cardView && !loading && (
                           <GridView bookmarks={getSortedBookmarks()} />
                        )}
                        {headlineView && !loading && (
                           <HeadlineView bookmarks={getSortedBookmarks()} />
                        )}
                     </div>
                  </div>
               </div>

               {/* //? Footer */}
               <Footer />
            </div>
         </div>
      </>
   )
}

export default Collections

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
