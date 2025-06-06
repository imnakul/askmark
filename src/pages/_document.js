import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang='en'>
         <Head>
            <meta
               name='description'
               content='Smart Bookmarks who answer your questions about them.'
            />

            <link rel='icon' href='/logo5.svg' />
         </Head>
         <body className='antialiased'>
            <Main></Main>
            <NextScript />
         </body>
      </Html>
   )
}
