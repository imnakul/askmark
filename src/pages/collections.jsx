import { HoverEffect } from '../components/ui/card-hover-effect'
import { Search } from '@/components/ui/search'
import { Footer } from '@/components/ui/footer'
// import Navbar from '@/components/ui/navbar'
import {
   Navbar,
   NavBody,
   NavItems,
   MobileNav,
   NavbarLogo,
   NavbarButton,
   MobileNavHeader,
   MobileNavToggle,
   MobileNavMenu,
} from '@/components/ui/resizable-navbar'
import { useState, useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { ExpandableCardDemo } from '@/components/ui/expandable-card-demo'

const navItems = [
   {
      name: 'Features',
      link: '#features',
   },
   {
      name: 'Pricing',
      link: '#pricing',
   },
   {
      name: 'Contact',
      link: '#contact',
   },
]

function Collections() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [visible, setVisible] = useState(false)
   const ref = useRef(null)
   const [QR, setQR] = useState(false)

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

   return (
      <>
         {/* //?? NAVBAR  */}
         <div className=' w-full'>
            <Navbar visible={visible}>
               {/* Desktop Navigation */}
               <NavBody>
                  {!visible && <NavbarLogo />}
                  <Search />
                  {/* <AddModal /> */}
                  {/* <NavItems items={navItems} /> */}
                  {!visible && (
                     <div className='flex items-center gap-4'>
                        {/* <NavbarButton variant='secondary'>
                           Feedback
                        </NavbarButton>
                        <NavbarButton variant='secondary'>Contact</NavbarButton> */}
                        <NavbarButton variant='secondary'>Login</NavbarButton>
                     </div>
                  )}
                  <button onClick={() => setQR(!QR)} className=''>
                     <img
                        src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnplZnJ5ZWZmc3ZlaWg2bGU5eGZ0N2JzMDVoczk3bnNqMjJ0MXd6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif'
                        className='size-10 cursor-pointer'
                     />
                  </button>
               </NavBody>

               {/* Mobile Navigation */}
               <MobileNav>
                  <MobileNavHeader>
                     <NavbarLogo />
                     <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     />
                  </MobileNavHeader>

                  <MobileNavMenu
                     isOpen={isMobileMenuOpen}
                     onClose={() => setIsMobileMenuOpen(false)}
                  >
                     {navItems.map((item, idx) => (
                        <a
                           key={`mobile-link-${idx}`}
                           href={item.link}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className='relative text-neutral-600 dark:text-neutral-300'
                        >
                           <span className='block'>{item.name}</span>
                        </a>
                     ))}
                     <div className='flex w-full flex-col gap-4'>
                        <NavbarButton
                           onClick={() => setIsMobileMenuOpen(false)}
                           variant='primary'
                           className='w-full'
                        >
                           Login
                        </NavbarButton>
                     </div>
                  </MobileNavMenu>
               </MobileNav>
            </Navbar>
         </div>

         {/* //?? MAIN CONTENT  */}
         {/* <div className=' w-full bg-gradient-to-br from-cyan-700 via-purple-950 to-gray-700'> */}
         <div className=' w-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900'>
            <div className='max-w-7xl mx-auto px-8 pt-20 '>
               {/* <Search /> */}
               {/* <HoverEffect items={projects} /> */}
               <ExpandableCardDemo />
               {/* //?? QR MODAL */}
               {QR && (
                  <div
                     className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm'
                     onClick={() => setQR(false)}
                  >
                     <div className='fixed top-1/2 left-1/2 z-100 -translate-x-1/2 -translate-y-1/2  border border-cyan-500 bg-cyan-500/60 flex flex-col gap-4  p-2 rounded-lg items-center justify-center backdrop-blur-2xl '>
                        <a
                           href='https://www.buymeacoffee.com/imnakul'
                           target='_blank'
                        >
                           <img src='/qr.png' className='size-72' />
                        </a>
                        <span className='text-lg text-white pb-2'>
                           Scan / Click to{' '}
                           <span className='text-gradient'>
                              Give me a Boost
                           </span>
                        </span>
                     </div>
                  </div>
               )}
               <Footer />
            </div>
         </div>
      </>
   )
}

export default Collections

export const projects = [
   {
      title: 'Stripe',
      description:
         'A technology company that builds economic infrastructure for the internet.',
      link: 'https://stripe.com',
   },
   {
      title: 'Netflix',
      description:
         'A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
      link: 'https://netflix.com',
   },
   {
      title: 'Google',
      description:
         'A multinational technology company that specializes in Internet-related services and products.',
      link: 'https://google.com',
   },
   {
      title: 'Meta',
      description:
         "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: 'https://meta.com',
   },
   {
      title: 'Amazon',
      description:
         'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
      link: 'https://amazon.com',
   },
   {
      title: 'Microsoft',
      description:
         'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
      link: 'https://microsoft.com',
   },
   {
      title: 'Google',
      description:
         'A multinational technology company that specializes in Internet-related services and products.',
      link: 'https://google.com',
   },
   {
      title: 'Meta',
      description:
         "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: 'https://meta.com',
   },
   {
      title: 'Amazon',
      description:
         'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
      link: 'https://amazon.com',
   },
   {
      title: 'Microsoft',
      description:
         'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
      link: 'https://microsoft.com',
   },
   {
      title: 'Google',
      description:
         'A multinational technology company that specializes in Internet-related services and products.',
      link: 'https://google.com',
   },
   {
      title: 'Meta',
      description:
         "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: 'https://meta.com',
   },
]
