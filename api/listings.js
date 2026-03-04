import client from './lib/mongodb.js'

// Chennai parking listings
const SEED_LISTINGS = [
  { id: 1, name: 'T Nagar Secure Parking', area: 'T Nagar, Chennai', city: 'Chennai', price2w: 15, price4w: 50, priceMonthly: 1500, slots: 14, slotsLeft: 4, amenities: ['CCTV', 'Security Guard', 'Gated Entry', 'Lighting'], types: ['2-wheeler', '4-wheeler'], rating: 4.8, reviews: 218, distance: '0.3 km', cover: '\ud83c\udfe2' },
  { id: 2, name: 'Anna Nagar Covered Lot', area: 'Anna Nagar, Chennai', city: 'Chennai', price2w: 12, price4w: 65, priceMonthly: 2000, slots: 10, slotsLeft: 2, amenities: ['Covered', 'CCTV', 'EV Charging', '24/7 Access'], types: ['2-wheeler', '3-wheeler', '4-wheeler'], rating: 4.9, reviews: 104, distance: '0.6 km', cover: '\ud83c\udfec' },
  { id: 3, name: 'Adyar Open Space Parking', area: 'Adyar, Chennai', city: 'Chennai', price2w: 8, price4w: 40, priceMonthly: 1100, slots: 22, slotsLeft: 13, amenities: ['Lighting', 'CCTV', 'Nearby Washroom'], types: ['2-wheeler', '4-wheeler'], rating: 4.4, reviews: 76, distance: '1.0 km', cover: '\ud83c\udfea' },
  { id: 4, name: 'Nungambakkam Premium Lot', area: 'Nungambakkam, Chennai', city: 'Chennai', price2w: 20, price4w: 90, priceMonthly: 3000, slots: 8, slotsLeft: 1, amenities: ['Covered', 'Security Guard', 'CCTV', 'EV Charging', 'Gated Entry'], types: ['4-wheeler'], rating: 5.0, reviews: 41, distance: '0.2 km', cover: '\ud83c\udfd9\ufe0f' },
  { id: 5, name: 'Velachery IT Park Parking', area: 'Velachery, Chennai', city: 'Chennai', price2w: 10, price4w: 45, priceMonthly: 1300, slots: 35, slotsLeft: 20, amenities: ['Lighting', 'Open Air', 'CCTV'], types: ['2-wheeler', '3-wheeler', '4-wheeler'], rating: 4.3, reviews: 189, distance: '0.7 km', cover: '\ud83c\udfd7\ufe0f' },
  { id: 6, name: 'OMR Tech Corridor Parking', area: 'OMR, Chennai', city: 'Chennai', price2w: 10, price4w: 55, priceMonthly: 1600, slots: 18, slotsLeft: 9, amenities: ['CCTV', 'Gated Entry', '24/7 Access', 'Security Guard'], types: ['2-wheeler', '4-wheeler'], rating: 4.7, reviews: 93, distance: '0.5 km', cover: '\ud83c\udfe2' },
]

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    await client.connect()
    const db = client.db('parkease')
    const col = db.collection('listings')

    if (req.method === 'GET') {
      let listings = await col.find({}).toArray()
      // Auto-seed if collection is empty
      if (listings.length === 0) {
        await col.insertMany(SEED_LISTINGS.map(l => ({ ...l, createdAt: new Date() })))
        listings = await col.find({}).toArray()
      }
      return res.status(200).json(listings)
    }

    if (req.method === 'POST') {
      const listing = { ...req.body, createdAt: new Date() }
      const result = await col.insertOne(listing)
      return res.status(201).json({ ...listing, _id: result.insertedId })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  } catch (err) {
    console.error('[/api/listings]', err)
    return res.status(500).json({ error: err.message })
  }
}
