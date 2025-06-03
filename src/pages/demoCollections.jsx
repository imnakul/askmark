import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBookmark, clearBookmarks } from '@/store/slices/bookmarksSlice'
import { v4 as uuidv4 } from 'uuid'
import Navbar from '@/components/ui/Navbar'
import Modal from '@/components/ui/modal'
import CurrentBookmark from '@/components/CurrentBookmark'
import MainContainer from '@/components/MainContainer'
import { Footer } from '@/components/ui/footer'
import { FileText, Youtube, Wrench, Funnel, LayoutList, List, LayoutGrid, SortAsc } from 'lucide-react'
import { toast } from 'sonner'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/router'

function DemoCollections() {
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
   const [dropdownOpen, setDropdownOpen] = useState(false)
   const router = useRouter()

   // Load bookmarks from localStorage on mount
   // useEffect(() => {
   //    const localDemoBookmarks = JSON.parse(localStorage.getItem('demoBookmarks')) || []
   //    if (bookmarks.length === 0 && localDemoBookmarks.length > 0) {
   //       dispatch(addBookmark(localDemoBookmarks))
   //    }
   // }, [dispatch, bookmarks.length])

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
      }
      setLoading(true)
      try {
         const response = await fetch(`/api/extract?url=${encodeURIComponent(webUrl)}`)
         const json = await response.json()
         if (json.success) {
            const { category, shortSummary, tags, suggestedTitle, topicArea, tone, suggestedAction } =
               json.data.aiAnalysis
            const newBookmark = {
               id: uuidv4(),
               title: json.data.title || 'Untitled',
               description: json.data.metaDescription || '',
               link: webUrl,
               thumbnail: json.data.favicon || '',
               tags: [...tags],
               createdAt: new Date().toISOString(),
               category: category,
               shortSummary: shortSummary,
               suggestedTitle: suggestedTitle,
               topicArea: topicArea,
               tone: tone,
               suggestedAction: suggestedAction,
            }
            dispatch(addBookmark(newBookmark))

            // Save to local storage for demo mode
            // const currentDemoBookmarks = JSON.parse(localStorage.getItem('demoBookmarks')) || []
            // localStorage.setItem('demoBookmarks', JSON.stringify([...currentDemoBookmarks, newBookmark]))
            setWebUrl('')
            toast.success('Bookmark added to demo session!')
         } else {
            toast.error(json.error || 'Failed to extract data.')
         }
      } catch (error) {
         console.error('Error extracting data:', error)
         toast.error('Error extracting data.')
      } finally {
         setLoading(false)
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

   const handleShowModal = (bookmark) => {
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

   const handleGoogleLogin = async () => {
      dispatch(loginStart())
      try {
         const result = await signInWithPopup(auth, provider)
         const user = result.user
         dispatch(
            loginSuccess({
               uid: user.uid,
               displayName: user.displayName,
               email: user.email,
               photoURL: user.photoURL,
            })
         )
         // Fetch bookmarks from Firestore
         const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks')
         const snapshot = await getDocs(bookmarksRef)
         dispatch(clearBookmarks())
         snapshot.forEach((docSnap) => {
            dispatch(addBookmark({ ...docSnap.data(), id: docSnap.id }))
         })
         router.push('/collections')
         setDropdownOpen(false)
         console.log('Login successful, bookmarks fetched!')
         toast.success('Login successful! Bookmarks synced.')
      } catch (error) {
         dispatch(loginFailure(error.message))
         console.error('Login failed:', error)
      }
   }

   return (
      <>
         <div className="bg-[url('/3.jpg')] bg-cover bg-center h-full w-full">
            <Navbar
               QR={QR}
               setQR={setQR}
            />
            <div className='max-w-7xl mx-auto pt-4 '>
               {/* Demo Mode Banner */}

               <div className='w-full bg-yellow-400 text-black text-center py-2 font-bold rounded mb-2 flex items-center justify-between px-16'>
                  DEMO MODE: Bookmarks are not saved to the cloud. Log in to sync your bookmarks!
                  <button
                     className='flex items-center justify-center gap-2 p-2 rounded-md bg-gradient-to-tr from-cyan-900 to-blue-900 text-white font-bold hover:from-cyan-800 hover:to-blue-600 transition-all duration-200 cursor-pointer w-32'
                     onClick={handleGoogleLogin}
                     disabled={loading}
                  >
                     <span className=' text-sm'> Google Sign-In</span>
                  </button>
               </div>
               {/* QR MODAL */}
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
               {/* Bookmarks Modal */}
               {showbookmarkModal && (
                  <Modal
                     showModal={showbookmarkModal}
                     setShowModal={setShowBookmarkModal}
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
               {/* Main Container + Sidebar */}
               <div className='w-full bg-white/5 flex flex-col items-center justify-end p-2 gap-2 '>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full h-auto min-h-16 gap-2 px-2 sm:px-4 py-2 bg-white/5 rounded-md shadow-sm'>
                     <div className='flex items-center gap-3 w-full sm:w-1/5'>
                        {/* Search */}
                        <input
                           placeholder='Search Bookmark'
                           className='py-2 px-3 rounded-md bg-gray-800 border-cyan-300 border w-full text-sm focus:outline-none focus:ring focus:ring-cyan-400'
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* Filter Dropdown */}
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
                        {/* Sort Dropdown */}
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
                     </div>
                     {/* Add bookmark */}
                     <form
                        className='w-full max-w-lg mx-auto'
                        onSubmit={handleUrlSubmit}
                     >
                        <label
                           htmlFor='search'
                           className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                        >
                           Bookmark Url
                        </label>
                        <div className='relative'>
                           <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
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
                     {/* View Modes */}
                     <div
                        className='inline-flex rounded-md justify-center items-center w-full sm:w-auto mt-2 sm:mt-0'
                        role='group'
                     >
                        <button
                           type='button'
                           className={`px-4 py-2 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 transition-all duration-150 rounded-s-lg ${
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
                           className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 transition-all duration-150 ${
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
                           className={`px-4 py-2 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 transition-all duration-150 rounded-e-lg ${
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
                  <MainContainer
                     handleShowModal={handleShowModal}
                     sortedBookmarks={getSortedBookmarks()}
                     loading={loading}
                     listView={listView}
                     cardView={cardView}
                     headlineView={headlineView}
                  />
               </div>
               <Footer />
            </div>
         </div>
      </>
   )
}

export default DemoCollections
