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
import CurrentBookmark from '@/components/CurrentBookmark'
import { db } from '@/lib/firebase'
import { collection, setDoc, doc } from 'firebase/firestore'

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

   // Firestore sync: push bookmarks to Firestore on every change
   useEffect(() => {
      if (!bookmarks || bookmarks.length === 0) return
      const userId = JSON.parse(localStorage.getItem('persist:root'))?.auth
         ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)
              .user?.uid
         : null
      if (!userId) return
      const pushToFirestore = async () => {
         try {
            // Store all bookmarks under users/{userId}/bookmarks/{bookmarkId}
            const batch = bookmarks.map(async (bm) => {
               const safeId = encodeURIComponent(bm.link)
               await setDoc(doc(db, 'users', userId, 'bookmarks', safeId), bm, {
                  merge: true,
               })
            })
            await Promise.all(batch)
         } catch (err) {
            // Optionally handle error
            console.error('Error syncing bookmarks to Firestore:', err)
         }
      }
      pushToFirestore()
   }, [bookmarks])

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
                     modalContainerClass='bg-gradient-to-tr from-black/70 via-blue-700/30 to-black/70 w-[99vw] sm:w-full sm:max-w-6xl rounded-2xl shadow-2xl'
                     closeModalOutsideClick={() => setShowBookmarkModal(false)}
                  >
                     {currentBookmark && (
                        <CurrentBookmark currentBookmark={currentBookmark} />
                     )}
                  </Modal>
               )}

               {/* //? MAIN CONTAINER  */}
               <div className='w-full bg-white/5 flex flex-col items-center justify-end p-2 gap-2 '>
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
                           <GridView
                              handleShowModal={handleShowModal}
                              bookmarks={getSortedBookmarks()}
                           />
                        )}
                        {headlineView && !loading && (
                           <HeadlineView
                              handleShowModal={handleShowModal}
                              bookmarks={getSortedBookmarks()}
                           />
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
