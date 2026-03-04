import { connectDB } from './lib/mongodb.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    const { db } = await connectDB()
    const col = db.collection('bookings')

    if (req.method === 'GET') {
      const { userId } = req.query
      const filter = userId ? { clerkUserId: userId } : {}
      const bookings = await col.find(filter).sort({ createdAt: -1 }).toArray()
      return res.status(200).json(bookings)
    }

    if (req.method === 'POST') {
      const booking = {
        ...req.body,
        bookingId: 'PKE-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        status: 'confirmed',
        createdAt: new Date(),
      }
      const result = await col.insertOne(booking)
      return res.status(201).json({ ...booking, _id: result.insertedId })
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  } catch (err) {
    console.error('[/api/bookings]', err.message)
    return res.status(500).json({ error: err.message })
  }
}
