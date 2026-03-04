import { connectDB } from './lib/mongodb.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    const { db } = await connectDB()
    const col = db.collection('users')

    if (req.method === 'GET') {
      const { clerkId } = req.query
      if (!clerkId) return res.status(400).json({ error: 'clerkId is required' })
      const user = await col.findOne({ clerkId })
      return res.status(200).json(user || null)
    }

    if (req.method === 'POST') {
      const { clerkId, ...data } = req.body
      if (!clerkId) return res.status(400).json({ error: 'clerkId is required' })

      const result = await col.updateOne(
        { clerkId },
        {
          $set: { clerkId, ...data, updatedAt: new Date() },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true }
      )
      return res.status(200).json({
        success: true,
        upserted: !!result.upsertedId,
        modified: result.modifiedCount,
      })
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  } catch (err) {
    console.error('[/api/users]', err.message)
    return res.status(500).json({ error: err.message })
  }
}
