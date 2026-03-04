import { useState } from 'react'
import { C, LISTINGS, AMENITY_ICONS } from '../constants'
import { Btn, Badge, Input, Stars, Divider } from '../components/ui'

// ─── SEARCH PAGE ──────────────────────────────────────────────────────
export function SearchPage({ setPage, setSelectedListing }) {
  const [query, setQuery] = useState('Koramangala, Bengaluru')
  const [typeFilter, setTypeFilter] = useState('all')
  const [maxPrice, setMaxPrice] = useState(200)
  const [sort, setSort] = useState('distance')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = LISTINGS.filter(l => {
    if (typeFilter !== 'all' && !l.types.some(t => t.includes(typeFilter === '2w' ? '2' : typeFilter === '3w' ? '3' : '4'))) return false
    if (l.price4w > maxPrice && l.price2w > maxPrice) return false
    return true
  }).sort((a, b) =>
    sort === 'price' ? a.price4w - b.price4w :
    sort === 'rating' ? b.rating - a.rating : 0
  )

  return (
    <div style={{ paddingTop: 64, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Filters bar */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '16px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>📍</span>
            <input value={query} onChange={e => setQuery(e.target.value)}
              style={{ width: '100%', background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px 11px 42px', color: C.text, fontSize: 15, outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = C.amber)}
              onBlur={e => (e.target.style.borderColor = C.border)} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['all', 'All'], ['2w', '🛵 2W'], ['3w', '🛺 3W'], ['4w', '🚗 4W']].map(([v, l]) => (
              <button key={v} onClick={() => setTypeFilter(v)}
                style={{ padding: '9px 14px', borderRadius: 8, border: `1.5px solid ${typeFilter === v ? C.amber : C.border}`, background: typeFilter === v ? C.amberGlow : 'transparent', color: typeFilter === v ? C.amber : C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                {l}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: C.muted, fontFamily: "'Syne', sans-serif" }}>Max ₹{maxPrice}/hr</span>
            <input type="range" min={20} max={200} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ accentColor: C.amber, width: 100 }} />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', color: C.text, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="distance">Sort: Distance</option>
            <option value="price">Sort: Price</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>
      </div>

      {/* Split view */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '400px 1fr', overflow: 'hidden' }}>
        {/* Listing cards */}
        <div style={{ overflow: 'auto', padding: '20px 16px 20px 24px', borderRight: `1px solid ${C.border}` }}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>{filtered.length} spots found</span>
            <Badge color={C.teal}>{query.split(',')[0]}</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(l => (
              <div key={l.id}
                onClick={() => { setSelectedListing(l); setPage('listing') }}
                onMouseEnter={() => setHoveredId(l.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ background: hoveredId === l.id ? C.cardHover : C.card, border: `1.5px solid ${hoveredId === l.id ? C.amber + '66' : C.border}`, borderRadius: 16, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 12, background: C.amberGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>{l.cover}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>📍 {l.area}</div>
                    <Stars rating={l.rating} />
                    <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {l.amenities.slice(0, 3).map(a => (
                        <span key={a} style={{ fontSize: 11, color: C.dim, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 7px' }}>
                          {AMENITY_ICONS[a]} {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: C.amber, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18 }}>₹{l.price4w}<span style={{ fontSize: 12, fontWeight: 400 }}>/hr</span></div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{l.distance}</div>
                    <div style={{ marginTop: 6 }}><Badge color={l.slotsLeft < 3 ? C.red : C.green}>{l.slotsLeft} left</Badge></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div style={{ position: 'relative', background: '#0A1626', overflow: 'hidden' }}>
          {[80, 160, 240, 320, 400, 480].map(y => <div key={`h${y}`} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 1, background: C.border + '66' }} />)}
          {[100, 200, 300, 400, 500, 600, 700].map(x => <div key={`v${x}`} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 1, background: C.border + '66' }} />)}
          {[160, 320].map(y => <div key={`mr${y}`} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 3, background: C.border }} />)}
          {[200, 500].map(x => <div key={`mc${x}`} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 3, background: C.border }} />)}

          {filtered.map((l, i) => {
            const positions = [{ x: 180, y: 120 }, { x: 320, y: 200 }, { x: 480, y: 100 }, { x: 140, y: 300 }, { x: 600, y: 240 }, { x: 380, y: 340 }]
            const pos = positions[i] || { x: 200 + i * 60, y: 150 + i * 40 }
            return (
              <div key={l.id} style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                {hoveredId === l.id && (
                  <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8, whiteSpace: 'nowrap', background: C.card, border: `1px solid ${C.amber}`, borderRadius: 10, padding: '8px 14px', boxShadow: '0 8px 30px #00000060' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>{l.name}</div>
                    <div style={{ fontSize: 12, color: C.amber }}>₹{l.price4w}/hr</div>
                  </div>
                )}
                <div style={{ position: 'absolute', width: 32, height: 32, borderRadius: '50%', border: `2px solid ${C.amber}`, animation: 'pulse-ring 2s infinite', left: -6, top: -6, opacity: hoveredId === l.id ? 1 : 0.3 }} />
                <div onClick={() => { setSelectedListing(l); setPage('listing') }}
                  style={{ width: 22, height: 22, borderRadius: '50%', background: hoveredId === l.id ? C.amber : C.amberDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0A0F1A', fontFamily: "'Syne', sans-serif", cursor: 'pointer', boxShadow: `0 4px 12px ${C.amberGlow}`, transition: 'all 0.2s', transform: hoveredId === l.id ? 'scale(1.2)' : 'scale(1)' }}>
                  P
                </div>
              </div>
            )
          })}

          {/* User dot */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: C.teal, border: '3px solid white', boxShadow: '0 0 0 6px rgba(14,165,233,0.2)' }} />
          </div>

          <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(13,25,41,0.9)', backdropFilter: 'blur(10px)', border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
            <div style={{ color: C.muted }}>🔵 You are here</div>
            <div style={{ color: C.amber, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>🟠 {filtered.length} parking spots</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── LISTING PAGE ─────────────────────────────────────────────────────
export function ListingPage({ listing, setPage }) {
  const [tab, setTab] = useState('overview')
  if (!listing) return null

  return (
    <div style={{ paddingTop: 64 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '20px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <button onClick={() => setPage('search')} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>← Back to results</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{listing.name}</h1>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: C.muted }}>📍 {listing.area}</span>
                <Stars rating={listing.rating} />
                <span style={{ color: C.muted, fontSize: 14 }}>({listing.reviews} reviews)</span>
                <Badge color={listing.slotsLeft < 3 ? C.red : C.green}>{listing.slotsLeft} slots available</Badge>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, color: C.amber }}>₹{listing.price4w}<span style={{ fontSize: 16, fontWeight: 400 }}>/hr</span></div>
              <div style={{ fontSize: 14, color: C.muted }}>₹{listing.priceMonthly}/month</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        <div>
          {/* Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10, marginBottom: 32, height: 280, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #0D2137, #0A1A2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>{listing.cover}</div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 10 }}>
              {['🅿️', '📹'].map((e, i) => <div key={i} style={{ background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{e}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 10 }}>
              {['🚗', '💡'].map((e, i) => <div key={i} style={{ background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{e}</div>)}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            {['overview', 'amenities', 'rules', 'reviews'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: '10px 20px', background: 'none', border: 'none', color: tab === t ? C.amber : C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize', borderBottom: `2px solid ${tab === t ? C.amber : 'transparent'}`, transition: 'all 0.2s' }}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                {[{ label: 'Total Slots', val: listing.slots, icon: '🅿️' }, { label: 'Slots Left', val: listing.slotsLeft, icon: '✅' }, { label: 'Distance', val: listing.distance, icon: '📍' }].map(i => (
                  <div key={i.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{i.icon}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>{i.val}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{i.label}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 12 }}>Vehicle Types Accepted</h3>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {[['2-wheeler', '🛵'], ['3-wheeler', '🛺'], ['4-wheeler', '🚗']].map(([t, icon]) => (
                  <div key={t} style={{ padding: '10px 20px', borderRadius: 10, background: listing.types.includes(t) ? C.amberGlow : C.surface, border: `1.5px solid ${listing.types.includes(t) ? C.amber + '66' : C.border}`, color: listing.types.includes(t) ? C.amber : C.dim, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14 }}>
                    {icon} {t}
                  </div>
                ))}
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 12 }}>Pricing</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[{ label: '2-Wheeler / hr', price: `₹${listing.price2w}` }, { label: '4-Wheeler / hr', price: `₹${listing.price4w}` }, { label: 'Monthly', price: `₹${listing.priceMonthly}` }].map(p => (
                  <div key={p.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>{p.label}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: C.amber }}>{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'amenities' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {listing.amenities.map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 18px' }}>
                  <div style={{ fontSize: 28 }}>{AMENITY_ICONS[a] || '✨'}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{a}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'rules' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['No overnight parking without monthly booking', 'Vehicles must be registered on the app', 'Owner not responsible for valuables left in vehicles', 'Follow one-way traffic inside the lot', 'Respect designated slot numbers only'].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 18px' }}>
                  <span style={{ color: C.amber, fontFamily: "'DM Mono', monospace", fontSize: 12, marginTop: 2 }}>0{i + 1}</span>
                  <span style={{ color: C.muted, fontSize: 15 }}>{r}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'Amit K.', rating: 5, comment: 'Very safe and well-lit. CCTV everywhere. Highly recommend!', time: '2 days ago' },
                { name: 'Sneha M.', rating: 4, comment: 'Good spot, but entry can get congested in evenings.', time: '1 week ago' },
                { name: 'Rajan P.', rating: 5, comment: 'Monthly pass is totally worth it. Hassle-free every morning!', time: '2 weeks ago' },
              ].map((r, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${C.amber}, ${C.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 800, color: '#0A0F1A' }}>{r.name[0]}</div>
                      <div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14 }}>{r.name}</div><Stars rating={r.rating} /></div>
                    </div>
                    <span style={{ fontSize: 12, color: C.dim }}>{r.time}</span>
                  </div>
                  <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.6 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking widget */}
        <div style={{ position: 'sticky', top: 80 }}>
          <BookingWidget listing={listing} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}

// ─── BOOKING WIDGET ───────────────────────────────────────────────────
function BookingWidget({ listing, setPage }) {
  const [durationType, setDurationType] = useState('hourly')
  const [hours, setHours] = useState(2)
  const [vehicleType, setVehicleType] = useState('4-wheeler')
  const [date, setDate] = useState('')

  const price = vehicleType === '2-wheeler' ? listing.price2w : listing.price4w
  const subtotal = durationType === 'monthly' ? listing.priceMonthly : price * hours
  const commission = Math.round(subtotal * 0.12)
  const total = subtotal + commission

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, boxShadow: '0 20px 60px #00000060' }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Book This Spot</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, background: C.surface, borderRadius: 10, padding: 4 }}>
        {['hourly', 'daily', 'monthly'].map(t => (
          <button key={t} onClick={() => setDurationType(t)}
            style={{ flex: 1, padding: '8px 4px', borderRadius: 8, border: 'none', background: durationType === t ? C.amber : 'transparent', color: durationType === t ? '#0A0F1A' : C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>VEHICLE</label>
          <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}
            style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none' }}>
            {listing.types.map(t => <option key={t} value={t}>{t === '2-wheeler' ? '🛵' : t === '3-wheeler' ? '🛺' : '🚗'} {t}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>DATE</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', colorScheme: 'dark' }} />
        </div>
        {durationType === 'hourly' && (
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>HOURS: {hours}</label>
            <input type="range" min={1} max={12} value={hours} onChange={e => setHours(+e.target.value)} style={{ width: '100%', accentColor: C.amber }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.dim, marginTop: 4 }}><span>1h</span><span>12h</span></div>
          </div>
        )}
        <Divider style={{ margin: '4px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted }}><span>Parking fee</span><span>₹{subtotal}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted }}><span>Service charge (12%)</span><span>₹{commission}</span></div>
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18 }}><span>Total</span><span style={{ color: C.amber }}>₹{total}</span></div>
        </div>
        <Btn variant="primary" size="lg" onClick={() => setPage('booking')} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>Confirm & Pay →</Btn>
        <p style={{ textAlign: 'center', fontSize: 12, color: C.dim }}>🔒 Secure payment via Razorpay</p>
      </div>
    </div>
  )
}

// ─── BOOKING/PAYMENT PAGE ─────────────────────────────────────────────
export function BookingPage({ listing, setPage }) {
  const [payMethod, setPayMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [step, setStep] = useState('pay')
  const [processing, setProcessing] = useState(false)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setStep('success') }, 2000)
  }

  if (step === 'success') return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 50% 50% at 50% 40%, ${C.green}22, transparent)` }} />
      <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', position: 'relative' }} className="fade-up">
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: C.green + '22', border: `2px solid ${C.green}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, margin: '0 auto 28px' }}>✅</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, marginBottom: 12 }}>Booking Confirmed!</h1>
        <p style={{ color: C.muted, fontSize: 17, marginBottom: 32 }}>Your parking spot at <strong style={{ color: C.text }}>{listing?.name}</strong> is reserved. Drive safe!</p>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, marginBottom: 28, textAlign: 'left' }}>
          {[['Booking ID', '#PKE-' + Math.random().toString(36).substr(2, 8).toUpperCase()], ['Location', listing?.area], ['Date', new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })], ['Duration', '2 hours'], ['Slot No.', 'B-07'], ['Amount Paid', '₹136']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: C.muted, fontSize: 14 }}>{k}</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Btn variant="primary" onClick={() => setPage('search')}>Find More Parking</Btn>
          <Btn variant="outline" onClick={() => setPage('landing')}>Go Home</Btn>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <button onClick={() => setPage('listing')} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>← Back to listing</button>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, marginBottom: 6 }}>Complete Payment</h1>
        <p style={{ color: C.muted, marginBottom: 28 }}>You're one step away from securing your spot.</p>

        <div style={{ background: C.card, border: `1px solid ${C.amber}44`, borderRadius: 16, padding: 20, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 42 }}>{listing?.cover || '🏢'}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>{listing?.name}</div>
            <div style={{ color: C.muted, fontSize: 14 }}>{listing?.area} • 2 hours • 4-Wheeler</div>
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: C.amber }}>₹136</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.06em', marginBottom: 12 }}>PAYMENT METHOD</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[{ id: 'upi', icon: '📱', label: 'UPI', sub: 'PhonePe, GPay, Paytm, BHIM' }, { id: 'card', icon: '💳', label: 'Debit / Credit Card', sub: 'Visa, Mastercard, RuPay' }, { id: 'netbanking', icon: '🏦', label: 'Net Banking', sub: 'All major banks' }].map(m => (
              <div key={m.id} onClick={() => setPayMethod(m.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, background: payMethod === m.id ? C.amberGlow : C.card, border: `1.5px solid ${payMethod === m.id ? C.amber + '66' : C.border}`, borderRadius: 14, padding: '14px 18px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${payMethod === m.id ? C.amber : C.dim}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {payMethod === m.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.amber }} />}
                </div>
                <span style={{ fontSize: 24 }}>{m.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15 }}>{m.label}</div>
                  <div style={{ fontSize: 13, color: C.dim }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {payMethod === 'upi' && <Input label="UPI ID" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" icon="📱" style={{ marginBottom: 20 }} />}

        <Btn variant="primary" size="lg" onClick={handlePay} disabled={processing} style={{ width: '100%', justifyContent: 'center' }}>
          {processing ? '⏳ Processing...' : 'Pay ₹136 Securely →'}
        </Btn>
        <p style={{ textAlign: 'center', fontSize: 12, color: C.dim, marginTop: 12 }}>🔐 256-bit SSL encrypted • Powered by Razorpay</p>
      </div>
    </div>
  )
}
