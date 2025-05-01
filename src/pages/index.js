import { Collections } from '@/pages/collections'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { motion } from 'motion/react'

function index() {
   return (
      <>
         <SmoothCursor />

         <HeroHighlight>
            <motion.h1
               initial={{
                  opacity: 0,
                  y: 20,
               }}
               animate={{
                  opacity: 1,
                  y: [20, -5, 0],
               }}
               transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
               }}
               className='text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto '
            >
               Not just saved links.{'  '}
               <br></br>
               <Highlight className='text-black dark:text-white'>
                  "Smart Bookmarks That Talk Back."
               </Highlight>
               {/* <br></br> */}
               <span className='text-2xl'>
                  {' '}
                  Bookmarks That Let You Ask Questions About the Pages You Save.
               </span>
            </motion.h1>
         </HeroHighlight>

         {/* <BackgroundBeamsWithCollision> */}
         {/* <div className='flex flex-col items-center w-screen h-screen '> */}

         <Collections />
         {/* </div> */}
         {/* </BackgroundBeamsWithCollision> */}
      </>
   )
}
export default index
