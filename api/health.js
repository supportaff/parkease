import client from './lib/mongodb.js'

export default async function handler(req, res) {
  try {
    await client.connect()
    await client.db('parkease').command({ ping: 1 })
    return res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message,
    })
  }
}
