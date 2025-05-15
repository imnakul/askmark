const createNoopStorage = () => {
   return {
      getItem() {
         return Promise.resolve(null)
      },
      setItem() {
         return Promise.resolve()
      },
      removeItem() {
         return Promise.resolve()
      },
   }
}

const storage =
   typeof window !== 'undefined'
      ? require('redux-persist/lib/storage').default
      : createNoopStorage()

export default storage
