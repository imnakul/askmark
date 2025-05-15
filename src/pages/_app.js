import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/store'

export default function App({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <div className='font-[Space Grotesk]'>
               <Component {...pageProps} />
            </div>
         </PersistGate>
      </Provider>
   )
}
