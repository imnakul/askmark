// import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio'
// // import readline from 'node:readline/promises'
// // import { stdin as input, stdout as output } from 'node:process'
// import { URL } from 'url'
// import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

// function resolveURL(base, relative) {
//    try {
//       return new URL(relative, base).href
//    } catch {
//       return relative
//    }
// }

// export async function webExtractor(web_url) {
//    try {
//       const loader = new CheerioWebBaseLoader(web_url)
//       const $ = await loader.scrape()

//       const title = $('title').text().trim() || 'N/A'
//       const metaDescription =
//          $('meta[name="description"]').attr('content') || 'N/A'
//       const ogType = $('meta[property="og:type"]').attr('content') || 'N/A'
//       const ogImage = $('meta[property="og:image"]').attr('content') || ''
//       const twitterImage = $('meta[name="twitter:image"]').attr('content') || ''
//       const previewImage = ogImage || twitterImage || 'N/A'
//       const ogSiteName =
//          $('meta[property="og:site_name"]').attr('content') || 'N/A'
//       const canonicalURL =
//          $('meta[property="og:url"]').attr('content') || web_url

//       const favicon =
//          $('link[rel="icon"]').attr('href') ||
//          $('link[rel="shortcut icon"]').attr('href') ||
//          'N/A'
//       const resolvedFavicon =
//          favicon !== 'N/A' ? resolveURL(web_url, favicon) : 'N/A'

//       const author =
//          $('meta[name="author"]').attr('content') ||
//          $('meta[property="article:author"]').attr('content') ||
//          'N/A'
//       const publishedDate =
//          $('meta[property="article:published_time"]').attr('content') ||
//          $('time').first().attr('datetime') ||
//          'N/A'

//       const keywords =
//          $('meta[name="keywords"]')
//             .attr('content')
//             ?.split(',')
//             .map((k) => k.trim()) || []

//       const tags = $('a[rel="tag"]')
//          .map((_, el) => $(el).text().trim())
//          .get()

//       //~ Calling Gemini to Categorize:
//       categorizePage({
//          title: title,
//          metaDescription: metaDescription,
//          keywords: keywords,
//          tags: tags,
//       })

//       const hasArticleTag = $('article').length > 0
//       const hasVideoTag = $('video').length > 0
//       const hasCanvasTag = $('canvas').length > 0

//       const docs = await loader.load()
//       const textContent = docs.map((doc) => doc.pageContent).join(' ')
//       const wordCount = textContent.split(/\s+/).length

//       // Print result
//       console.log('\n--- Extracted Page Info ---')
//       console.log(`📝 Title: ${title}`)
//       console.log(`🧾 Meta Description: ${metaDescription}`)
//       console.log(`📦 OpenGraph Type: ${ogType}`)
//       console.log(`🌐 Site Name: ${ogSiteName}`)
//       console.log(`🔗 Canonical URL: ${canonicalURL}`)
//       console.log(`👤 Author: ${author}`)
//       console.log(`🗓️ Published Date: ${publishedDate}`)
//       console.log(`🏷️ Keywords: ${keywords.join(', ') || 'N/A'}`)
//       console.log(`🔖 Tags: ${tags.join(', ') || 'N/A'}`)
//       console.log(`🖼️ Preview Image: ${previewImage}`)
//       console.log(`🌟 Favicon: ${resolvedFavicon}`)
//       console.log(`🔢 Word Count: ${wordCount}`)
//       console.log(`📄 Has <article>: ${hasArticleTag}`)
//       console.log(`🎥 Has <video>: ${hasVideoTag}`)
//       console.log(`🎨 Has <canvas>: ${hasCanvasTag}`)
//       console.log('----------------------------\n')
//    } catch (error) {
//       console.error(error)
//    }
// }

// async function categorizePage({ title, metaDescription, keywords, tags }) {
//    const llm = new ChatGoogleGenerativeAI({
//       model: 'gemini-2.0-flash',
//       apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//       temperature: 0,
//    })
//    try {
//       const systemPrompt = `
// You are a smart assistant that helps classify web pages into categories based on their metadata.
// Given the title, description, keywords, and tags of a web page, analyze the intent and purpose of the page.

// Return one of the following categories as your response, and nothing else:
// 1. Social Media Platform
// 2. Tools
// 3. Landing Page
// 4. Article / Documentation
// 5. Videos
// 6. Images
// 7. Search Engine

// Be concise and objective. Respond with only the category name.

// Example:
// Title: Google Search
// Description : N/A

// Response: Search Engine
// `

//       const userPrompt = `
// Title: ${title}
// Description: ${metaDescription}
// Keywords: ${keywords?.join(', ') || 'N/A'}
// Tags: ${tags?.join(', ') || 'N/A'}
// `

//       const response = await llm.invoke([
//          { role: 'system', content: systemPrompt },
//          { role: 'user', content: userPrompt },
//       ])

//       console.log(`📂 Suggested Category: ${response.content}`)
//       return response.content
//    } catch (err) {
//       console.error('❌ Error invoking Gemini:', err.message)
//       return null
//    }
// }

import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio'
// import readline from 'node:readline/promises'
// import { stdin as input, stdout as output } from 'node:process'
import { URL } from 'url'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

function resolveURL(base, relative) {
   try {
      return new URL(relative, base).href
   } catch {
      return relative
   }
}

export async function webExtractor(web_url) {
   try {
      const loader = new CheerioWebBaseLoader(web_url)
      const $ = await loader.scrape()

      const title = $('title').text().trim() || 'N/A'
      const metaDescription =
         $('meta[name="description"]').attr('content') || 'N/A'
      const ogType = $('meta[property="og:type"]').attr('content') || 'N/A'
      const ogImage = $('meta[property="og:image"]').attr('content') || ''
      const twitterImage = $('meta[name="twitter:image"]').attr('content') || ''
      const previewImage = ogImage || twitterImage || 'N/A'
      const ogSiteName =
         $('meta[property="og:site_name"]').attr('content') || 'N/A'
      const canonicalURL =
         $('meta[property="og:url"]').attr('content') || web_url

      const favicon =
         $('link[rel="icon"]').attr('href') ||
         $('link[rel="shortcut icon"]').attr('href') ||
         'N/A'
      const resolvedFavicon =
         favicon !== 'N/A' ? resolveURL(web_url, favicon) : 'N/A'

      const author =
         $('meta[name="author"]').attr('content') ||
         $('meta[property="article:author"]').attr('content') ||
         'N/A'
      const publishedDate =
         $('meta[property="article:published_time"]').attr('content') ||
         $('time').first().attr('datetime') ||
         'N/A'

      const keywords =
         $('meta[name="keywords"]')
            ?.attr('content')
            ?.split(',')
            .map((k) => k.trim()) || []

      const tags = $('a[rel="tag"]')
         .map((_, el) => $(el).text().trim())
         .get()

      // const category = await categorizePage({
      //    title,
      //    metaDescription,
      //    keywords,
      //    tags,
      // })

      const hasArticleTag = $('article').length > 0
      const hasVideoTag = $('video').length > 0
      const hasCanvasTag = $('canvas').length > 0

      const docs = await loader.load()
      const textContent = docs.map((doc) => doc.pageContent).join(' ')
      const wordCount = textContent.split(/\s+/).length

      // ✅ Return full object
      return {
         title,
         metaDescription,
         ogType,
         ogSiteName,
         canonicalURL,
         author,
         publishedDate,
         keywords,
         tags,
         previewImage,
         favicon: resolvedFavicon,
         wordCount,
         hasArticleTag,
         hasVideoTag,
         hasCanvasTag,
         // category,
      }
   } catch (error) {
      console.error('❌ webExtractor error:', error.message)
      throw error
   }
}
