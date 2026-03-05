import { MongoClient } from 'mongodb'

// Support both ZLIGN_MONGODB_URI (Vercel project var) and MONGODB_URI (fallback)
const uri = process.env.ZLIGN_MONGODB_URI || process.env.MONGODB_URI
const options = { appName: 'parkease', maxPoolSize: 10, serverSelectionTimeoutMS: 5000 }

let cachedClient = null
let cachedDb = null

export async function connectDB() {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb }

  if (!uri) {
    throw new Error(
      'MongoDB URI not found. Set ZLIGN_MONGODB_URI in Vercel → Settings → Environment Variables'
    )
  }

  const client = new MongoClient(uri, options)
  await client.connect()
  const db = client.db('parkease')

  cachedClient = client
  cachedDb = db

  return { client, db }
}
