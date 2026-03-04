import { connectDB } from './lib/mongodb.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const { db } = await connectDB()
    await db.command({ ping: 1 })
    const collections = await db.listCollections().toArray()
    return res.status(200).json({
      status: 'ok',
      database: 'parkease',
      connected: true,
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      connected: false,
      error: err.message,
    })
  }
}
