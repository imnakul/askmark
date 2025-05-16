import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ContactDetails from '@/components/contact'
import ContactForm from '@/components/feedback'
import Modal from '@/components/ui/modal'

export function Footer() {
   const router = useRouter()
   const [showModal, setShowModal] = useState(false)
   const [modalContent, setModalContent] = useState(null)

   const handleOpenModal = (content) => {
      setModalContent(content)
      setShowModal(true)
   }

   return (
      <>
         <footer className='bg-gradient-to-r from-black/20 to-white/10 rounded-lg shadow-sm  mt-4 mx-4 '>
            <div className='w-full max-w-7xl mx-auto px-4 py-1 '>
               <div className='sm:flex sm:items-center sm:justify-between'>
                  <button
                     onClick={() => {
                        router.push('/')
                     }}
                     className='flex items-center mb-6 sm:mb-0 space-x-1 rtl:space-x-reverse'
                  >
                     <img
                        src='/logo4.png'
                        className='size-12'
                        alt='Askmark logo'
                     />
                     <span className='self-center font-bold text-black text-xl whitespace-nowrap dark:text-white'>
                        AskMark
                     </span>
                  </button>
                  <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
                     © 2025{' '}
                     <button
                        onClick={() => {
                           router.push('/')
                        }}
                        className='hover:underline'
                     >
                        AskMark -{' '}
                     </button>
                     All Rights Reserved.
                  </span>
                  <ul className='flex flex-wrap items-center mb-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
                     {/* <li>
                     <a href='#' className='hover:underline me-4 md:me-6'>
                        About
                     </a>
                  </li> */}
                     {/* <li>
                     <a href='#' className='hover:underline me-4 md:me-6'>
                        Privacy Policy
                     </a>
                  </li> */}
                     <li>
                        <button
                           onClick={() => handleOpenModal('feedback')}
                           className='hover:underline me-4 md:me-6 '
                        >
                           <span className='text-base'>Feedback</span>
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => handleOpenModal('contact')}
                           className='hover:underline me-4 md:me-6'
                        >
                           <span className='text-base'>Contact</span>
                        </button>
                     </li>
                  </ul>
               </div>
               {/* <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700' /> */}
            </div>
         </footer>

         {showModal && (
            <Modal
               showModal={showModal}
               setShowModal={setShowModal}
               header={modalContent === 'feedback' ? 'Feedback' : 'Contact'}
            >
               {modalContent === 'feedback' ? (
                  <ContactForm />
               ) : (
                  <ContactDetails />
               )}
            </Modal>
         )}
      </>
   )
}
