// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { webExtractor } from '@/functions/webExtractor' // or wherever your function is

export default async function handler(req, res) {
   const { url } = req.query

   if (!url) {
      return res.status(400).json({ error: 'Missing URL' })
   }

   try {
      const data = await webExtractor(url)
      res.status(200).json({ success: true, data })
   } catch (err) {
      console.error('❌ API route error:', err.message)
      res.status(500).json({ success: false, error: 'Extraction failed' })
   }
}
