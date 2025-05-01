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
         <div className='relative w-full'>
            <Navbar visible={visible}>
               {/* Desktop Navigation */}
               <NavBody>
                  {!visible && <NavbarLogo />}
                  <Search />
                  <AddModal />
                  {/* <NavItems items={navItems} /> */}
                  {!visible && (
                     <div className='flex items-center gap-4'>
                        <NavbarButton variant='secondary'>
                           Feedback
                        </NavbarButton>
                        <NavbarButton variant='secondary'>Contact</NavbarButton>
                        <NavbarButton variant='secondary'>Login</NavbarButton>
                     </div>
                  )}
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
         <div className='w-full bg-gradient-to-br from-cyan-700 via-purple-950 to-gray-700'>
            <div className='max-w-7xl mx-auto px-8 pt-20 '>
               {/* <Search /> */}
               <HoverEffect items={projects} />
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
