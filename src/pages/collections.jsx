import { Footer } from '@/components/ui/footer'
import {
   FileText,
   Youtube,
   Wrench,
   Funnel,
   LayoutList,
   List,
   LayoutGrid,
} from 'lucide-react'

import { useState, useRef, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import Modal from '@/components/ui/modal'
import { webExtractor } from '@/functions/webExtractor.mjs'
import Navbar from '@/components/ui/Navbar'
import ListView from '@/components/ListView'
import GridView from '@/components/GridView'
import HeadlineView from '@/components/HeadlineView'

function Collections() {
   const [visible, setVisible] = useState(false)
   const ref = useRef(null)
   const [QR, setQR] = useState(false)
   const [showDropdown, setShowDropdown] = useState(false)
   const [showbookmarkModal, setShowBookmarkModal] = useState(false)
   const [fetchedData, setFetchedData] = useState(false)
   const [webUrl, setWebUrl] = useState('')
   const dropdownRef = useRef(null)
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [link, setLink] = useState('')
   const [thumbnail, setThumbnail] = useState('')
   const [tags, setTags] = useState('')

   const [listView, setListView] = useState(true)
   const [cardView, setCardView] = useState(false)
   const [headlineView, setHeadlineView] = useState(false)

   const handleUrlSubmit = async (e) => {
      // e.preventDefault()
      // if (!webUrl) {
      //    alert('Please enter a valid URL.')
      //    return
      // }
      // if (webUrl) {
      //    webExtractor(webUrl)
      // } else {
      //    console.log('Invalid or Empty URL ')
      // }
      e.preventDefault()
      if (!webUrl) {
         alert('Please enter a valid URL.')
         return
      } else {
         const response = await fetch(
            `/api/extract?url=${encodeURIComponent(webUrl)}`
         )

         const json = await response.json()
         if (json.success) {
            console.log('Extracted Data:', json.data)
         } else {
            console.error('Error:', json.error)
         }
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

   const handleShowModal = () => {
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
         <div className="bg-[url('/2.png')] bg-cover bg-center h-full w-full">
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
                     header='Add New Bookmark'
                     modalContainerClass={'bg-black/30'}
                     closeModalOutsideClick={() => setShowBookmarkModal(false)}
                  >
                     {!fetchedData ? (
                        // <div className='flex items-center justify-center gap-4 p-2 w-full rounded-md'>
                        //    <label className='input active:outline-none hover:outline-none focus:outline-none focus-within:outline-none '>
                        //       <span className='label'>URL</span>
                        //       <input
                        //          type='text'
                        //          className=''
                        //          value={webUrl}
                        //          onChange={(e) => setWebUrl(e.target.value)}
                        //          placeholder='https://'
                        //       />
                        //    </label>
                        //    <button
                        //       onClick={handleUrlSubmit}
                        //       className='btn btn-primary rounded-md p-1.5'
                        //    >
                        //       Add
                        //    </button>
                        // </div>
                        <div
                           className='flex items-center justify-center w-full p-2 rounded-md'
                           role='form'
                        >
                           <div className='p-2 bg-gray-800'>URL</div>
                           <input
                              type='text'
                              className='p-2 border border-sky-300  w-full'
                              placeholder='https://'
                              value={webUrl}
                              onChange={(e) => setWebUrl(e.target.value)}
                           />
                           <button
                              onClick={handleUrlSubmit}
                              className='btn btn-ghost  p-1.5'
                           >
                              Add
                           </button>
                        </div>
                     ) : (
                        <div className='flex flex-col gap-4 p-4 w-full bg-black/30 rounded-md'>
                           <div className='flex items-center justify-center gap-2 w-full  '>
                              <img
                                 className='w-72 h-44 p-2 border border-sky-300 rounded-md'
                                 alt='Upload Thumbnail'
                                 value={thumbnail}
                              />
                           </div>
                           <div className='flex items-center justify-start gap-2 w-full  '>
                              Title:
                              <input
                                 type='text'
                                 className='p-2 border border-sky-300 rounded-md w-full'
                                 placeholder='Title'
                                 value={title}
                              />
                           </div>
                           <div className='flex items-center justify-start gap-2 w-full  '>
                              Link:
                              <input
                                 type='text'
                                 className='p-2 border border-sky-300 rounded-md w-full'
                                 placeholder='Url'
                                 value={link}
                              />
                           </div>
                           <div className='flex items-center justify-start gap-2 w-full  '>
                              Desc:
                              <input
                                 type='text'
                                 className='p-2 border border-sky-300 rounded-md w-full'
                                 placeholder='Description'
                                 value={description}
                              />
                           </div>
                           <div className='flex items-center justify-start gap-2 w-full  '>
                              Note:
                              <input
                                 type='text'
                                 className='p-2 border border-sky-300 rounded-md w-full'
                                 placeholder='Note'
                              />
                           </div>
                           <div className='flex items-center justify-start gap-2 w-full  '>
                              Tags:
                              <input
                                 type='text'
                                 className='p-2 border border-sky-300 rounded-md w-full'
                                 placeholder='Tags'
                                 value={tags}
                              />
                           </div>
                           <div className='flex items-center justify-center gap-2 w-full  '>
                              <button className='btn border border-sky-300 bg-sky-800 px-3 py-1 rounded-md'>
                                 Edit
                              </button>
                           </div>
                        </div>
                     )}
                  </Modal>
               )}

               {/* //? MAIN CONTAINER  */}
               <div className='w-full  bg-white/5 flex flex-col items-center justify-end p-2 gap-2'>
                  <div className='flex items-center justify-between w-full h-16  px-4'>
                     <div className='flex items-center gap-2 w-1/5 '>
                        {/* //~Search  */}

                        <input
                           placeholder='Search Bookmark'
                           className='py-2 px-3 rounded-md bg-gray-800 border-cyan-300 border w-full text-sm focus:outline-none focus:ring focus:ring-cyan-400'
                        />
                        {/* //~ Filter Dropdown */}
                        <div className='relative' ref={dropdownRef}>
                           <button
                              onClick={() => setShowDropdown(!showDropdown)}
                              className={`
                              transition-all duration-500 cursor-pointer
                              
                           `}
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
                     </div>

                     {/* //~ Add bookmark  */}
                     <form
                        className='w-full max-w-lg mx-auto'
                        onSubmit={(e) => handleUrlSubmit(e)}
                     >
                        <label
                           htmlFor='search'
                           class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                        >
                           Bookmark Url
                        </label>
                        <div class='relative'>
                           <div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                              {/* <BookmarkPlus className={`size-5 `} /> */}
                              <img
                                 src='/add.png'
                                 alt='logo'
                                 className='size-5'
                              />
                           </div>
                           <input
                              type='url'
                              id='search'
                              class='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-cyan-400  focus:outline-none'
                              placeholder='https://example.com'
                              value={webUrl}
                              onChange={(e) => setWebUrl(e.target.value)}
                              autoComplete='off'
                           />
                           <button
                              type='submit'
                              class='text-white absolute end-2.5 bottom-2.5 bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer hover:scale-95 transition-all duration-200'
                           >
                              Add
                           </button>
                        </div>
                     </form>

                     {/* //~View Modes  */}
                     <div
                        className='inline-flex rounded-md justify-center items-center '
                        role='group'
                     >
                        <button
                           type='button'
                           className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white cursor-pointer'
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
                           className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white cursor-pointer '
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
                           className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-2 focus:ring-cyan-700 focus:text-cyan-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-cyan-500 dark:focus:text-white cursor-pointer'
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
                        {listView && <ListView />}
                        {cardView && <GridView />}
                        {headlineView && <HeadlineView />}
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
