import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = { appName: 'parkease', maxPoolSize: 10, serverSelectionTimeoutMS: 5000 }

// Connection cache — reused across warm serverless invocations
let cachedClient = null
let cachedDb = null

export async function connectDB() {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Add it in Vercel → Settings → Environment Variables'
    )
  }

  const client = new MongoClient(uri, options)
  await client.connect()
  const db = client.db('parkease')

  cachedClient = client
  cachedDb = db

  return { client, db }
}
