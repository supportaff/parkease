import client from './lib/mongodb.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    await client.connect()
    const db = client.db('parkease')
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

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  } catch (err) {
    console.error('[/api/bookings]', err)
    return res.status(500).json({ error: err.message })
  }
}
