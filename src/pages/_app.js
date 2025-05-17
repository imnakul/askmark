import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/store'
import { Toaster } from 'sonner'

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Optional: customize NProgress
NProgress.configure({
   showSpinner: false,
   minimum: 0.1,
   easing: 'ease-in-out',
   speed: 500,
   trickle: false,
})

// Bind NProgress events
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <div className='font-[Space Grotesk]'>
               <Component {...pageProps} />
               <Toaster
                  position='top-center'
                  theme='dark'
                  toastOptions={{
                     style: {
                        background:
                           'linear-gradient(90deg, #0a0f1c 0%, #2563eb 100%)',
                        color: '#ededed',
                        border: '1px solid #06b6d4',
                        boxShadow: '0 2px 16px 0 rgba(6,182,212,0.15)',
                        fontFamily: 'Space Grotesk, Arial, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        borderRadius: '12px',
                        padding: '1.2rem 1.5rem',
                     },
                     iconTheme: {
                        primary: '#06b6d4',
                        secondary: '#2563eb',
                     },
                  }}
               />
            </div>
         </PersistGate>
      </Provider>
   )
}
