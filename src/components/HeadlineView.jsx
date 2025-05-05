import { useState } from 'react'
import {
   Star,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
} from 'lucide-react'

function HeadlineView() {
   return (
      <>
         <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 h-[70vh] overflow-y-auto pr-4'>
            {projects.map((project) => (
               <div className='card relative bg-black/30 border border-teal-400 w-full shadow-sm h-14 rounded-md hover:translate-y-1.5 transition duration-200'>
                  <div className='w-full h-full flex items-center justify-start px-4'>
                     <div className='w-4/5 flex items-center gap-2'>
                        <button
                           className=' hover:opacity-70 cursor-pointer'
                           title='Ask a question'
                        >
                           <MessageCircleQuestion className='size-6 text-cyan-300 hover:animate-spin' />
                        </button>
                        <p className='text-cyan-100 font-semibold '>
                           {project.title}
                        </p>
                        <p>|</p>
                        <p>04-05-2025</p>
                        <p>|</p>
                        <div className='badge badge-outline badge-sm'>
                           Fashion
                        </div>
                     </div>

                     <div className='flex items-center w-1/3 gap-4 justify-between '>
                        <button
                           className=' hover:opacity-70 cursor-pointer'
                           title='Edit'
                        >
                           <Pencil className='size-5 text-green-400 p-0.5' />
                        </button>
                        <button
                           className=' hover:opacity-70 cursor-pointer'
                           title='Delete'
                        >
                           <Trash className='size-5 text-red-400 p-0.5' />
                        </button>
                        <button className=' hover:opacity-70 cursor-pointer'>
                           <Star className='size-5 text-teal-400 p-0.5' />
                        </button>

                        <button
                           className=' hover:opacity-70 cursor-pointer'
                           title='Open'
                        >
                           <ExternalLink className='size-5 text-blue-400 p-0.5' />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}
export default HeadlineView

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
