export function Footer() {
   return (
      <footer className='bg-white rounded-lg shadow-sm dark:bg-black/20 mt-4 mx-4 '>
         <div className='w-full max-w-7xl mx-auto px-4 py-1 '>
            <div className='sm:flex sm:items-center sm:justify-between'>
               <a
                  href='https://flowbite.com/'
                  className='flex items-center mb-6 sm:mb-0 space-x-1 rtl:space-x-reverse'
               >
                  <img src='/logo.jpg' className='size-12' alt='Askmark logo' />
                  <span className='self-center font-bold text-black text-xl whitespace-nowrap dark:text-white'>
                     AskMark
                  </span>
               </a>
               <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
                  © 2025{' '}
                  <a href='https://flowbite.com/' className='hover:underline'>
                     AskMark -{' '}
                  </a>
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
                     <a href='#' className='hover:underline me-4 md:me-6 '>
                        <span className='text-base'>Feedback</span>
                     </a>
                  </li>
                  <li>
                     <a href='#' className='hover:underline me-4 md:me-6'>
                        <span className='text-base'>Contact</span>
                     </a>
                  </li>
               </ul>
            </div>
            {/* <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700' /> */}
         </div>
      </footer>
   )
}
