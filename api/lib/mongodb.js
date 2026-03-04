import { MongoClient } from 'mongodb'
import { attachDatabasePool } from '@vercel/functions'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

const options = {
  appName: 'parkease',
  maxIdleTimeMS: 5000,
}

const client = new MongoClient(uri, options)

// Ensures proper connection cleanup on Vercel function suspension
attachDatabasePool(client)

export default client
