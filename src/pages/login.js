import { useRouter } from 'next/router'
import Image from 'next/image'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'
import { useDispatch, useSelector } from 'react-redux'
import {
   loginStart,
   loginSuccess,
   loginFailure,
} from '@/store/slices/authSlice'
import { useEffect } from 'react'

export default function Login() {
   const router = useRouter()
   const dispatch = useDispatch()
   const { loading } = useSelector((state) => state.auth)

   const handleGoogleLogin = async () => {
      dispatch(loginStart())
      try {
         const result = await signInWithPopup(auth, provider)
         const user = result.user
         dispatch(
            loginSuccess({
               uid: user.uid,
               displayName: user.displayName,
               email: user.email,
               photoURL: user.photoURL,
            })
         )
         router.push('/collections')
      } catch (error) {
         dispatch(loginFailure(error.message))
      }
   }

   const loggedIn = useSelector((state) => state.auth.isAuthenticated)
   useEffect(() => {
      if (loggedIn) {
         router.push('/collections')
      }
   }, [])

   return (
      <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0a0f1c] via-[#101a2b] to-[#1a2236] overflow-hidden'>
         {/* <BackgroundBeamsWithCollision className='absolute inset-0 z-0 bg-gradient-to-tr from-[#0a0f1c] via-[#052b68] to-[#1a2236] opacity-90' /> */}
         <BackgroundBeamsWithCollision className='absolute inset-0 z-0 bg-[url(/5.jpg)] opacity-90' />
         <div className='relative z-10 bg-white/10 border border-cyan-500  backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-sm flex flex-col items-center'>
            <div className='flex items-center justify-center my-2'>
               <Image
                  src='/logo4.png'
                  width={64}
                  height={64}
                  alt='Logo'
                  className=''
               />
               <h1 className='text-3xl font-extrabold text-cyan-300  text-center'>
                  Askmark
               </h1>
            </div>
            <p className='text-gray-300 mb-8 text-center'>
               Smart Bookmarks That Talk Back
            </p>
            <button
               className='flex items-center justify-center gap-3 w-full py-3 px-6 rounded-lg bg-white/90 border-2 border-cyan-400 text-cyan-700 font-semibold text-lg shadow-md hover:bg-cyan-50 transition-all duration-200 mb-2 mt-2'
               onClick={handleGoogleLogin}
               disabled={loading}
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='30'
                  viewBox='0 0 48 48'
               >
                  <path
                     fill='#FFC107'
                     d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
                  />
                  <path
                     fill='#FF3D00'
                     d='m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z'
                  />
                  <path
                     fill='#4CAF50'
                     d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
                  />
                  <path
                     fill='#1976D2'
                     d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
                  />
               </svg>
               Sign up with Google
            </button>
         </div>
      </div>
   )
}
