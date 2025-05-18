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
         <footer className='bg-gradient-to-r from-black/20 to-white/10 rounded-lg shadow-sm mt-28 sm:mt-4 mx-4 '>
            <div className='w-full max-w-7xl mx-auto px-4 py-2 sm:py-1 '>
               <div className='flex items-center justify-between '>
                  <button
                     onClick={() => {
                        router.push('/')
                     }}
                     className='hidden sm:flex items-center mb-6 sm:mb-0 space-x-1 rtl:space-x-reverse'
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

                  <span className='block text-sm text-gray-300 sm:text-center dark:text-gray-400'>
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
                  <ul className='flex flex-wrap items-center  text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-400'>
                     <li>
                        <button
                           onClick={() => handleOpenModal('feedback')}
                           className='hover:underline me-4 md:me-6 '
                        >
                           <span className='sm:block hidden text-base'>Feedback</span>
                           <span className='sm:hidden block '>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 width='30'
                                 height='30'
                                 viewBox='0 0 48 48'
                              >
                                 <path
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='m14.597 17.362l.851 2.619h2.753l-2.227 1.618l.851 2.619l-2.228-1.618l-2.228 1.618l.851-2.619l-2.228-1.618h2.754zm9.403 0l.851 2.619h2.754l-2.228 1.618l.851 2.619L24 22.6l-2.228 1.618l.851-2.619l-2.228-1.618h2.754zm9.403 0l.851 2.619h2.754l-2.228 1.618l.851 2.619l-2.228-1.618l-2.228 1.618l.851-2.619l-2.227-1.618h2.753z'
                                 />
                                 <path
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M39.284 8.669H8.716A4.216 4.216 0 0 0 4.5 12.885v15.81a4.216 4.216 0 0 0 4.216 4.217h10.905l3.37 5.837a1.164 1.164 0 0 0 2.017 0l3.37-5.837h10.906a4.216 4.216 0 0 0 4.216-4.217v-15.81a4.216 4.216 0 0 0-4.216-4.217'
                                 />
                              </svg>
                           </span>
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => handleOpenModal('contact')}
                           className='hover:underline me-4 md:me-6'
                        >
                           <span className='sm:block hidden text-base'>Contact</span>
                           <span className='sm:hidden block '>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 width='30'
                                 height='30'
                                 viewBox='0 0 2048 2048'
                              >
                                 <path
                                    fill='currentColor'
                                    d='M1792 896h-640V768h640v128zm-256 384h-384v-128h384v128zm512-1024v1536H0V256h2048zm-128 128H128v1280h1792V384zM640 1152q-53 0-99 20t-82 55t-55 81t-20 100H256q0-52 14-101t39-93t62-80t83-62q-33-35-51-81t-19-95q0-53 20-99t55-82t81-55t100-20q53 0 99 20t82 55t55 81t20 100q0 49-18 95t-52 81q46 26 82 62t62 79t40 93t14 102H896q0-53-20-99t-55-82t-81-55t-100-20zM512 896q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50z'
                                 />
                              </svg>
                           </span>
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
               {modalContent === 'feedback' ? <ContactForm /> : <ContactDetails />}
            </Modal>
         )}
      </>
   )
}
