import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { motion } from 'motion/react'
import { useRouter } from 'next/router'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams'

function Index() {
   const router = useRouter()
   return (
      <>
         {/* //?? Desktop Screen  */}
         <HeroHighlight containerClassName='lg:flex hidden bg-gradient-to-tr from-[#0a0f1c] via-[#101a2b] to-[#1a2236] min-h-screen'>
            {/* //~ Large Screen  */}
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: [20, -5, 0] }}
               transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
               className='text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-200 dark:text-white max-w-4xl leading-snug lg:leading-snug text-center mx-auto drop-shadow-lg '
            >
               Not just saved links.
               <br />
               <Highlight className='text-cyan-200 dark:text-cyan-100'>
                  &quot;Smart Bookmarks That Talk Back.&quot;
               </Highlight>
               <span className='block text-2xl mt-2 text-cyan-100'>
                  Bookmarks That Let You Ask Questions About the Pages You Save.
               </span>
            </motion.h1>

            {/* //~ Features */}
            <div className='mt-16 flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl mx-auto'>
               {[
                  {
                     title: 'Smart Bookmarks Collection',
                     desc: 'Organize, tag, and search your bookmarks with AI-powered insights and summaries.',
                     icon: '🧠',
                  },
                  {
                     title: 'Bookmarks That Talk Back',
                     desc: 'Chat with your saved links. Get instant answers about any data in your bookmarks.',
                     icon: '💬',
                  },
                  {
                     title: 'Ask Anything About Your URLs',
                     desc: 'Use AI to extract, summarize, and answer questions about any page you save.',
                     icon: '🔗',
                  },
               ].map((f, i) => (
                  <motion.div
                     key={f.title}
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        delay: 0.5 + i * 0.2,
                        duration: 0.7,
                        type: 'spring',
                     }}
                     className='bg-white/80 dark:bg-slate-900/80 border border-cyan-400/20 rounded-2xl shadow-xl p-6 w-80 flex flex-col items-center text-center backdrop-blur-md hover:scale-105 transition-transform duration-300'
                  >
                     <span className='text-4xl mb-2'>{f.icon}</span>
                     <h3 className='font-bold text-lg mb-1 text-cyan-700 dark:text-cyan-300'>
                        {f.title}
                     </h3>
                     <p className='text-gray-700 dark:text-gray-200 text-base'>
                        {f.desc}
                     </p>
                  </motion.div>
               ))}
            </div>

            {/* //~ CTA */}
            <div className='flex flex-col sm:flex-row items-center justify-center pt-8 w-full gap-6 mt-4'>
               <button
                  onClick={() => router.push('/login')}
                  className='relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-lg rounded-xl shadow-lg group bg-gradient-to-tr from-cyan-600 via-blue-700 to-purple-800 text-white transition-all duration-300 hover:scale-105 hover:from-cyan-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer'
               >
                  <span className='relative z-10'>Get Started</span>
                  <span className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl '></span>
               </button>
               <button
                  onClick={() => router.push('/collections')}
                  className='inline-flex items-center px-8 py-3 rounded-xl border-2 border-cyan-400 text-cyan-200 dark:text-cyan-100 font-bold text-lg bg-white/10 dark:bg-slate-900/40 shadow-md hover:bg-cyan-900/30 dark:hover:bg-slate-800/60 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer'
               >
                  Demo
               </button>
            </div>

            {/* //~ Coffee */}
            <a
               href='https://www.buymeacoffee.com/imnakul'
               target='_blank'
               className='fixed bottom-10 right-10 z-50'
            >
               <img
                  src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnplZnJ5ZWZmc3ZlaWg2bGU5eGZ0N2JzMDVoczk3bnNqMjJ0MXd6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif'
                  width={64}
                  height={64}
                  alt='Buy me a coffee QR code'
                  className='size-16 cursor-pointer drop-shadow-xl'
                  priority
               />
            </a>
         </HeroHighlight>

         {/* //?? md Screen Size   */}
         <HeroHighlight containerClassName='lg:hidden md:flex hidden bg-gradient-to-tr from-[#0a0f1c] via-[#101a2b] to-[#1a2236] min-h-screen'>
            {/* //~ Large Screen  */}
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: [20, -5, 0] }}
               transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
               className=' text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-200 dark:text-white max-w-4xl md:leading-snug text-center mx-auto drop-shadow-lg'
            >
               Not just saved links.
               <br />
               <Highlight className='text-cyan-200 dark:text-cyan-100'>
                  &quot;Smart Bookmarks That Talk Back.&quot;
               </Highlight>
               <span className='block text-2xl mt-2 text-cyan-100'>
                  Bookmarks That Let You Ask Questions About the Pages You Save.
               </span>
            </motion.h1>

            {/* //~ Features */}
            <div className='md:mt-16 flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl mx-auto'>
               {[
                  {
                     title: 'Smart Bookmarks Collection',
                     desc: 'Organize, tag, and search your bookmarks with AI-powered insights and summaries.',
                     icon: '🧠',
                  },
                  {
                     title: 'Bookmarks That Talk Back',
                     desc: 'Chat with your saved links. Get instant answers about any data in your bookmarks.',
                     icon: '💬',
                  },
                  {
                     title: 'Ask Anything About Your URLs',
                     desc: 'Use AI to extract, summarize, and answer questions about any page you save.',
                     icon: '🔗',
                  },
               ].map((f, i) => (
                  <motion.div
                     key={f.title}
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        delay: 0.5 + i * 0.2,
                        duration: 0.7,
                        type: 'spring',
                     }}
                     className='bg-white/80 dark:bg-slate-900/80 border border-cyan-400/20 rounded-2xl shadow-xl p-6 w-56 flex flex-col items-center text-center backdrop-blur-md hover:scale-105 transition-transform duration-300'
                  >
                     <span className='text-4xl mb-2'>{f.icon}</span>
                     <h3 className='font-bold text-lg mb-1 text-cyan-700 dark:text-cyan-300'>
                        {f.title}
                     </h3>
                     <p className='text-gray-700 dark:text-gray-200 text-base'>
                        {f.desc}
                     </p>
                  </motion.div>
               ))}
            </div>

            {/* //~ CTA */}
            <div className='flex flex-col sm:flex-row items-center justify-center pt-8 w-full gap-6 mt-4'>
               <button
                  onClick={() => router.push('/login')}
                  className='relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-lg rounded-xl shadow-lg group bg-gradient-to-tr from-cyan-600 via-blue-700 to-purple-800 text-white transition-all duration-300 hover:scale-105 hover:from-cyan-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer'
               >
                  <span className='relative z-10'>Get Started</span>
                  <span className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl '></span>
               </button>
               <button
                  onClick={() => router.push('/collections')}
                  className='inline-flex items-center px-8 py-3 rounded-xl border-2 border-cyan-400 text-cyan-200 dark:text-cyan-100 font-bold text-lg bg-white/10 dark:bg-slate-900/40 shadow-md hover:bg-cyan-900/30 dark:hover:bg-slate-800/60 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer'
               >
                  Demo
               </button>
            </div>

            {/* //~ Coffee */}
            <a
               href='https://www.buymeacoffee.com/imnakul'
               target='_blank'
               className='fixed bottom-10 right-10 z-50'
            >
               <img
                  src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnplZnJ5ZWZmc3ZlaWg2bGU5eGZ0N2JzMDVoczk3bnNqMjJ0MXd6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif'
                  width={64}
                  height={64}
                  alt='Buy me a coffee QR code'
                  className='size-16 cursor-pointer drop-shadow-xl'
                  priority
               />
            </a>
         </HeroHighlight>

         {/* //?? Small Screen  */}
         <div className='sm:hidden flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-cyan-700 to-blue-950 '>
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: [20, -5, 0] }}
               transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
               className=' text-xl px-0.5 font-bold text-neutral-200 dark:text-white max-w-4xl leading-snug text-center mx-auto drop-shadow-lg '
            >
               Not just saved links.
               <br />
               <Highlight className='text-2xl text-cyan-200 dark:text-cyan-100'>
                  &quot;Smart Bookmarks That Talk Back.&quot;
               </Highlight>
               <span className='block text-xl mt-2 text-cyan-100'>
                  Bookmarks That Let You Ask Questions About the Pages You Save.
               </span>
            </motion.h1>
            <div className='flex items-center justify-center pt-4 w-full gap-6 mt-4'>
               <button
                  onClick={() => router.push('/login')}
                  className='relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-lg rounded-xl shadow-lg group bg-gradient-to-tr from-cyan-600 via-blue-700 to-purple-800 text-white transition-all duration-300 hover:scale-105 hover:from-cyan-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer'
               >
                  <span className='relative z-10'>Get Started</span>
                  <span className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl '></span>
               </button>
               <button
                  onClick={() => router.push('/collections')}
                  className='inline-flex items-center px-8 py-3 rounded-xl border-2 border-cyan-400 text-cyan-200 dark:text-cyan-100 font-bold text-lg bg-white/10 dark:bg-slate-900/40 shadow-md hover:bg-cyan-900/30 dark:hover:bg-slate-800/60 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer'
               >
                  Demo
               </button>
            </div>

            <div className='my-8 flex flex-col gap-4 items-center justify-center w-full max-w-2xl '>
               {[
                  {
                     title: 'Smart Bookmarks Collection',
                     desc: 'Organize, tag, and search your bookmarks with AI-powered insights and summaries.',
                     icon: '🧠',
                  },
                  {
                     title: 'Bookmarks That Talk Back',
                     desc: 'Chat with your saved links. Get instant answers about any data in your bookmarks.',
                     icon: '💬',
                  },
                  {
                     title: 'Ask Anything About Your URLs',
                     desc: 'Use AI to extract, summarize, and answer questions about any page you save.',
                     icon: '🔗',
                  },
               ].map((f, i) => (
                  <motion.div
                     key={f.title}
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        delay: 0.5 + i * 0.2,
                        duration: 0.7,
                        type: 'spring',
                     }}
                     className='bg-white/80 dark:bg-slate-900/80 border border-cyan-400 rounded-2xl shadow-xl p-2 
                     w-88 flex flex-col items-center text-center backdrop-blur-md hover:scale-105 transition-transform duration-300'
                  >
                     <span className='text-3xl mb-2'>{f.icon}</span>
                     <h3 className='font-bold text-lg mb-1 text-cyan-700 dark:text-cyan-300'>
                        {f.title}
                     </h3>
                     <p className='text-gray-700 dark:text-gray-200 text-base'>
                        {f.desc}
                     </p>
                  </motion.div>
               ))}
            </div>
         </div>
      </>
   )
}
export default Index
