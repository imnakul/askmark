import { Footer } from '@/components/ui/footer'
import { FileText, Youtube, Wrench, Funnel, LayoutList, List, LayoutGrid, CircleDashed, SortAsc } from 'lucide-react'

import { useState, useRef, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import Modal from '@/components/ui/modal'
import { webExtractor } from '@/functions/webExtractor.mjs'
import Navbar from '@/components/ui/Navbar'

import { useDispatch, useSelector } from 'react-redux'
import { addBookmark } from '@/store/slices/bookmarksSlice'
import CurrentBookmark from '@/components/CurrentBookmark'
import { db } from '@/lib/firebase'
import { collection, setDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import MainContainer from '@/components/MainContainer'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

function Collections() {
   const dispatch = useDispatch()
   const bookmarks = useSelector((state) => state.bookmarks.bookmarks)
   const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
   const userId = useSelector((state) => state.auth.user?.uid)

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
         filtered = filtered.filter((b) => b.title && b.title.toLowerCase().includes(search.trim().toLowerCase()))
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
            sorted.sort((a, b) => (b.favorite === a.favorite ? 0 : b.favorite ? 1 : -1))
            break
         default:
            break
      }
      return sorted
   }

   const handleUrlSubmit = async (e) => {
      e.preventDefault()

      if (!webUrl) {
         return alert('Please enter a valid URL.')
      } else {
         setLoading(true)
         try {
            const response = await fetch(`/api/extract?url=${encodeURIComponent(webUrl)}`)

            const json = await response.json()
            if (json.success) {
               console.log('Extracted Data:', json.data)
               const { category, shortSummary, tags, suggestedTitle, topicArea, tone, suggestedAction } =
                  json.data.aiAnalysis
               // Add the bookmark to Redux store

               const newBookmark = {
                  id: uuidv4(),
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
               }

               dispatch(addBookmark(newBookmark))
               if (isLoggedIn && userId) {
                  try {
                     await setDoc(doc(db, 'users', userId, 'bookmarks', String(newBookmark.id)), newBookmark, {
                        merge: true,
                     }) // Sync to Firestore
                     toast.success('Bookmarks synced!')
                  } catch (error) {
                     console.error('Error syncing to Firestore:', error)
                     toast.error('Error syncing to Firestore')
                  }
               }

               // Clear the input
               setWebUrl('')
               toast.success('Bookmark added!')
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
   }

   // Handle click outside to close dropdown
   useEffect(() => {
      function handleClickOutside(event) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
      // console.log('bookmark', bookmark)
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

   const handleManualSync = async () => {
      setLoading(true)
      try {
         if (!userId) return

         // Step 1: Push local bookmarks to Firestore
         await Promise.all(
            bookmarks.map((bm) =>
               setDoc(doc(db, 'users', userId, 'bookmarks', String(bm.id)), bm, {
                  merge: true,
               })
            )
         )
         // toast.success('Local data pushed to Firestore!')

         // Step 2: Fetch all bookmarks from Firestore
         const bookmarksRef = collection(db, 'users', userId, 'bookmarks')
         const snapshot = await getDocs(bookmarksRef)
         const firestoreBookmarks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }))

         // Update Redux with the latest bookmarks from Firestore
         dispatch(addBookmark(firestoreBookmarks))
         toast.success('Data synced successfully!')
      } catch (err) {
         console.error('Error during manual sync:', err)
         toast.error('Error during manual sync. Please try again.')
      } finally {
         setLoading(false)
      }
   }

   // ?? REALTIME LISTNER from firestore
   useEffect(() => {
      if (!isLoggedIn || !userId) return

      const bookmarksRef = collection(db, 'users', userId, 'bookmarks')

      const unsubscribe = onSnapshot(bookmarksRef, (snapshot) => {
         const updatedBookmarks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }))

         // Update Redux with the latest bookmarks from Firestore
         dispatch(addBookmark(updatedBookmarks))
      })

      return () => unsubscribe() // Cleanup listener on unmount
   }, [isLoggedIn, userId, dispatch])

   // useEffect(() => {
   //    console.log('isLoggedIn:', isLoggedIn, 'userId:', userId)

   //    if (!isLoggedIn || !userId) return
   //    const syncBookmarks = async () => {
   //       console.log('syncBookmarks running')
   //       try {
   //          // 1. Get all existing docs in Firestore
   //          const bookmarksRef = collection(db, 'users', userId, 'bookmarks')
   //          console.log(bookmarksRef)
   //          const snapshot = await getDocs(bookmarksRef)
   //          const firestoreIds = snapshot.docs.map((doc) => doc.id)

   //          // 2. Prepare current Redux IDs
   //          const reduxIds = bookmarks.map((bm) => bm.id)

   //          // 3. Add/update all bookmarks from Redux
   //          await Promise.all(
   //             bookmarks.map((bm) =>
   //                setDoc(
   //                   doc(db, 'users', userId, 'bookmarks', String(bm.id)),
   //                   bm,
   //                   {
   //                      merge: true,
   //                   }
   //                )
   //             )
   //          )
   //          toast.success('Bookmarks synced!')
   //       } catch (err) {
   //          console.error('Error syncing bookmarks to Firestore:', err)
   //          toast.error('Error syncing bookmarks to Firestore')
   //       }
   //    }
   //    syncBookmarks()
   // }, [bookmarks, isLoggedIn, userId])
   // Firestore sync: push bookmarks to Firestore on every change
   // useEffect(() => {
   //    if (!bookmarks || bookmarks.length === 0) return
   //    const userId = JSON.parse(localStorage.getItem('persist:root'))?.auth
   //       ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)
   //            .user?.uid
   //       : null
   //    if (!userId) return
   //    const pushToFirestore = async () => {
   //       try {
   //          // Store all bookmarks under users/{userId}/bookmarks/{bookmarkId}
   //          const batch = bookmarks.map(async (bm) => {
   //             const safeId = encodeURIComponent(bm.link)
   //             await setDoc(doc(db, 'users', userId, 'bookmarks', safeId), bm, {
   //                merge: true,
   //             })
   //          })
   //          await Promise.all(batch)
   //       } catch (err) {
   //          // Optionally handle error
   //          console.error('Error syncing bookmarks to Firestore:', err)
   //       }
   //    }
   //    pushToFirestore()
   // }, [bookmarks])

   return (
      <>
         <div className="bg-[url('/3.jpg')] bg-cover bg-center h-full w-full">
            {/* //? Navbar  */}
            <Navbar
               QR={QR}
               setQR={setQR}
            />

            <div className='max-w-7xl mx-auto pt-4 '>
               {/* //? QR MODAL */}
               {QR && (
                  <Modal
                     showModal={QR}
                     setShowModal={setQR}
                     modalContainerClass={'w-[80vw] sm:w-full sm:max-w-sm sm:p-10'}
                     closeModalOutsideClick={() => setQR(false)}
                     header='Scan / Click to Give me a Boost'
                  >
                     <div className='flex items-center justify-center w-full p-2'>
                        <a
                           href='https://www.buymeacoffee.com/imnakul'
                           target='_blank'
                        >
                           <img
                              src='/qr.png'
                              className='size-72'
                           />
                        </a>
                     </div>
                  </Modal>
               )}

               {/* //? Bookmarks Modal */}
               {showbookmarkModal && (
                  <Modal
                     showModal={showbookmarkModal}
                     setShowModal={setShowBookmarkModal}
                     // header={
                     //    currentBookmark?.title
                     //       ? `Bookmark Details`
                     //       : 'Add New Bookmark'
                     // }
                     modalContainerClass='bg-gradient-to-tr from-black/70 via-blue-700/30 to-black/70 w-[99vw] sm:w-full sm:max-w-6xl rounded-2xl shadow-2xl'
                     closeModalOutsideClick={() => setShowBookmarkModal(false)}
                  >
                     {currentBookmark && (
                        <CurrentBookmark
                           currentBookmark={currentBookmark}
                           setShowBookmarkModal={setShowBookmarkModal}
                           showbookmarkModal={showbookmarkModal}
                        />
                     )}
                  </Modal>
               )}

               {/* //? MAIN CONTAINER  */}
               <div className='w-full bg-white/5 flex flex-col items-center justify-end p-2 gap-2 '>
                  {/* //?? Main Bookmark Containter  */}
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full h-auto min-h-16 gap-2 px-2 sm:px-4 py-2 bg-white/5 rounded-md shadow-sm'>
                     <div className='flex items-center gap-3 w-full sm:w-1/5'>
                        {/* //~Search  */}
                        <input
                           placeholder='Search Bookmark'
                           className='py-2 px-3 rounded-md bg-gray-800 border-cyan-300 border w-full text-sm focus:outline-none focus:ring focus:ring-cyan-400'
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* //~ Filter Dropdown */}
                        <div
                           className='relative'
                           ref={dropdownRef}
                        >
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
                                    <span className='space-grotesk text-sm text-gray-700 dark:text-gray-300'>Tool</span>
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
                                 {['Newest', 'Oldest', 'A-Z', 'Z-A'].map((option) => (
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
                                 ))}
                              </div>
                           )}
                        </div>
                        <div className='relative'>
                           {isLoggedIn ? (
                              <button
                                 onClick={handleManualSync}
                                 title='Manual Sync with Firestore'
                                 className=' cursor-pointer size-5 text-cyan-300 hover:text-cyan-600'
                              >
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                 >
                                    <path
                                       fill='currentColor'
                                       d='M13.03 18c.05.7.21 1.38.47 2h-7c-1.5 0-2.81-.5-3.89-1.57C1.54 17.38 1 16.09 1 14.58c0-1.3.39-2.46 1.17-3.48S4 9.43 5.25 9.15c.42-1.53 1.25-2.77 2.5-3.72S10.42 4 12 4c1.95 0 3.6.68 4.96 2.04C18.32 7.4 19 9.05 19 11h.1c-.74.07-1.45.23-2.1.5V11c0-1.38-.5-2.56-1.46-3.54C14.56 6.5 13.38 6 12 6s-2.56.5-3.54 1.46C7.5 8.44 7 9.62 7 11h-.5c-.97 0-1.79.34-2.47 1.03c-.69.68-1.03 1.5-1.03 2.47s.34 1.79 1.03 2.5c.68.66 1.5 1 2.47 1h6.53M19 13.5V12l-2.25 2.25L19 16.5V15a2.5 2.5 0 0 1 2.5 2.5c0 .4-.09.78-.26 1.12l1.09 1.09c.42-.63.67-1.39.67-2.21c0-2.21-1.79-4-4-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5c0-.4.09-.78.26-1.12l-1.09-1.09c-.42.63-.67 1.39-.67 2.21c0 2.21 1.79 4 4 4V23l2.25-2.25L19 18.5V20Z'
                                    />
                                 </svg>
                              </button>
                           ) : (
                              <button
                                 onClick={handleManualSync}
                                 title='Cloud Sync - Unavailable'
                                 className=' cursor-pointer size-5 text-red-400 hover:text-red-600'
                              >
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                 >
                                    <g
                                       fill='none'
                                       stroke='currentColor'
                                       stroke-linejoin='round'
                                       stroke-width='1.5'
                                    >
                                       <path d='M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z' />
                                       <path
                                          stroke-linecap='round'
                                          d='m10 11l4 4m-4 0l4-4'
                                       />
                                    </g>
                                 </svg>
                              </button>
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
                              className='text-white absolute end-2.5 bottom-[7px] bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer hover:scale-95 transition-all duration-200 disabled:cursor-not-allowed '
                              disabled={loading}
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
                  {/* //~ Main Container + Sidebar  */}
                  <MainContainer
                     handleShowModal={handleShowModal}
                     sortedBookmarks={getSortedBookmarks()}
                     loading={loading}
                     listView={listView}
                     cardView={cardView}
                     headlineView={headlineView}
                  />
               </div>

               {/* //? Footer */}
               <Footer />
            </div>
         </div>
      </>
   )
}

export default Collections
