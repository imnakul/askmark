import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '@/store/slices/authSlice'
import { clearBookmarks, addBookmark } from '@/store/slices/bookmarksSlice'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { toast } from 'sonner'

function Navbar({ QR, setQR }) {
   const router = useRouter()
   const dispatch = useDispatch()
   const { user, isAuthenticated, loading } = useSelector((state) => state.auth)
   const [dropdownOpen, setDropdownOpen] = useState(false)
   const avatarRef = useRef(null)

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
         // Fetch bookmarks from Firestore
         const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks')
         const snapshot = await getDocs(bookmarksRef)
         dispatch(clearBookmarks())
         snapshot.forEach((docSnap) => {
            dispatch(addBookmark({ ...docSnap.data(), id: docSnap.id }))
         })
         setDropdownOpen(false)
      } catch (error) {
         dispatch(loginFailure(error.message))
      }
   }

   const handleLogout = async () => {
      await signOut(auth)
      dispatch(logoutAction())
      dispatch(clearBookmarks())
      setDropdownOpen(false)
      toast('Logged out successfully!')
      router.push('/')
   }

   return (
      <div className='navbar bg-gradient-to-r from-black/20 to-white/10 shadow-sm max-w-7xl w-full mx-auto rounded-md flex items-center justify-between px-4'>
         <div className='flex items-center gap-1 cursor-pointer'>
            <img
               src='/logo4.png'
               alt='logo'
               className='size-12'
            />
            <span
               className='font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500'
               onClick={() => {
                  router.push('/')
               }}
            >
               AskMark
            </span>
         </div>

         <div className='flex items-center gap-4 justify-center px-2 py-1'>
            {/* //?? Avatar */}
            <div className='relative'>
               <div
                  className='avatar cursor-pointer'
                  ref={avatarRef}
                  onClick={() => setDropdownOpen((v) => !v)}
               >
                  <div className='ring-cyan-400  ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2'>
                     <img src={user?.photoURL || 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'} />
                  </div>
               </div>
               {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-cyan-400/30 z-50 p-3 flex flex-col gap-2'>
                     {isAuthenticated ? (
                        <>
                           <div className='flex items-center gap-2 mb-2'>
                              <img
                                 src={user?.photoURL}
                                 className='w-8 h-8 rounded-full'
                              />
                              <div>
                                 <div className='font-semibold text-cyan-700 dark:text-cyan-300 text-sm'>
                                    {user?.displayName}
                                 </div>
                                 <div className='text-xs text-gray-500 dark:text-gray-300'>{user?.email}</div>
                              </div>
                           </div>
                           <button
                              className='w-full py-2 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200'
                              onClick={handleLogout}
                           >
                              Logout
                           </button>
                        </>
                     ) : (
                        <button
                           className='flex items-center justify-center gap-2 w-full py-2 rounded-md bg-gradient-to-tr from-cyan-950 to-blue-800 text-white font-bold hover:from-cyan-800 hover:to-blue-600 transition-all duration-200 cursor-pointer'
                           onClick={handleGoogleLogin}
                           disabled={loading}
                        >
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='22'
                              height='22'
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
                                 d={
                                    'M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
                                 }
                              />
                           </svg>
                           Sign up with Google
                        </button>
                     )}
                  </div>
               )}
            </div>
            <button
               onClick={() => setQR(!QR)}
               className=''
            >
               <img
                  src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnplZnJ5ZWZmc3ZlaWg2bGU5eGZ0N2JzMDVoczk3bnNqMjJ0MXd6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif'
                  className='size-10 cursor-pointer'
               />
            </button>
         </div>
      </div>
   )
}
export default Navbar
