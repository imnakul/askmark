import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/moving-border'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Index() {
   const router = useRouter()
   return (
      <>
         {/* <BackgroundBeamsWithCollision> */}
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
                  &quot;Smart Bookmarks That Talk Back.&quot;
               </Highlight>
               {/* <br></br> */}
               <span className='text-2xl'>
                  {' '}
                  Bookmarks That Let You Ask Questions About the Pages You Save.
               </span>
            </motion.h1>
            <div className='flex items-center justify-center pt-2 w-full '>
               <Button
                  onClick={() => {
                     router.push('/collections')
                  }}
                  borderRadius='1.2rem'
                  className='bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-bold text-base cursor-pointer'
               >
                  Get Started
               </Button>
            </div>
            <a
               href='https://www.buymeacoffee.com/imnakul'
               target='_blank'
               className='fixed bottom-10 right-10'
            >
               <Image
                  src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnplZnJ5ZWZmc3ZlaWg2bGU5eGZ0N2JzMDVoczk3bnNqMjJ0MXd6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif'
                  width={64}
                  height={64}
                  alt='Buy me a coffee QR code'
                  className='size-16 cursor-pointer'
                  priority
               />
            </a>
         </HeroHighlight>
         {/* </BackgroundBeamsWithCollision> */}
      </>
   )
}
export default Index
