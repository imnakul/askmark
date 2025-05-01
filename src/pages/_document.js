import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang='en'>
         <Head>
            <title>AskMark</title>
            <meta
               name='description'
               content='Smart Bookmarks who answer your questions about them.'
            />

            <link rel='icon' href='/logo2.jpg' className=' bg-black p-1' />
         </Head>
         <body className='antialiased'>
            <Main></Main>
            <NextScript />
         </body>
      </Html>
   )
}
