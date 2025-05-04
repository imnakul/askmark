import { useState } from 'react'
import {
   Star,
   Pencil,
   ExternalLink,
   MessageCircleQuestion,
   Trash,
} from 'lucide-react'

function ListView() {
   return (
      <>
         <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 h-[70vh] overflow-y-auto pr-2'>
            {projects.map((project) => (
               <div className='card w-80 relative bg-black/30 border border-teal-400 card-md shadow-sm rounded-md hover:translate-y-1.5 transition duration-300 hover:scale-105'>
                  <div className='card-body p-5'>
                     <h2 className='card-title'>{project.title}</h2>
                     <div className='absolute top-3 right-3 '>
                        <button
                           title='Ask a question'
                           className='cursor-pointer'
                        >
                           <MessageCircleQuestion className='size-7 text-cyan-300 hover:animate-spin' />
                        </button>
                     </div>
                     <p>{project.description}</p>
                     <div className='flex items-center justify-between mt-2'>
                        <div className='badge badge-outline badge-xs'>
                           Fashion
                        </div>
                        <div className='justify-end card-actions w-full gap-1 '>
                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Edit'
                           >
                              <Pencil className='size-5 text-green-400 p-0.5' />
                           </button>
                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Delete'
                           >
                              <Trash className='size-5 text-red-400 p-0.5' />
                           </button>
                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Favorite'
                           >
                              <Star className='size-5 text-teal-400 p-0.5' />
                           </button>

                           <button
                              className='btn btn-sm hover:opacity-70 cursor-pointer'
                              title='Open'
                           >
                              <ExternalLink className='size-5 text-blue-400 p-0.5' />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}
export default ListView

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
