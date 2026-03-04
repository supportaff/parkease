import { useState } from 'react'
import { C } from '../constants'
import { Btn, Badge, Stars } from '../components/ui'

export default function DriverDashboard({ user, setPage }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [ratings, setRatings] = useState({})
  const [ratingInput, setRatingInput] = useState({})

  const bookings = [
    { id: 'PKE-A1F2', spot: 'T Nagar Secure Parking', area: 'T Nagar, Chennai', vehicle: 'TN 09 AB 1234', type: '4-Wheeler', duration: '3 hrs', amount: 150, status: 'active', date: 'Today, 2:00 PM', rating: null, slot: 'B-07' },
    { id: 'PKE-C3D4', spot: 'Anna Nagar Covered Lot', area: 'Anna Nagar, Chennai', vehicle: 'TN 09 AB 1234', type: '4-Wheeler', duration: 'Daily', amount: 100, status: 'completed', date: 'Yesterday', rating: 5, slot: 'A-03' },
    { id: 'PKE-E5F6', spot: 'Adyar Open Space', area: 'Adyar, Chennai', vehicle: 'TN 09 AB 1234', type: '4-Wheeler', duration: '2 hrs', amount: 80, status: 'completed', date: '3 days ago', rating: 4, slot: 'C-11' },
    { id: 'PKE-G7H8', spot: 'Velachery IT Park', area: 'Velachery, Chennai', vehicle: 'TN 09 AB 1234', type: '4-Wheeler', duration: 'Monthly', amount: 1300, status: 'completed', date: 'Last week', rating: null, slot: 'D-02' },
    { id: 'PKE-I9J0', spot: 'Nungambakkam Premium', area: 'Nungambakkam, Chennai', vehicle: 'TN 09 AB 1234', type: '4-Wheeler', duration: '4 hrs', amount: 360, status: 'completed', date: '2 weeks ago', rating: 5, slot: 'A-01' },
  ]

  const activeBooking = bookings.find(b => b.status === 'active')
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const totalSpent = bookings.reduce((sum, b) => sum + b.amount, 0)
  const pendingRatings = completedBookings.filter(b => !b.rating && !ratings[b.id])

  const tabs = [
    { id: 'overview', icon: '🏠', label: 'Overview' },
    { id: 'history', icon: '📋', label: 'Booking History' },
    { id: 'active', icon: '🅿️', label: 'Active Booking' },
    { id: 'ratings', icon: '⭐', label: 'Rate & Review' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]

  const StarPicker = ({ bookingId }) => {
    const val = ratingInput[bookingId] || 0
    return (
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} onClick={() => setRatingInput(p => ({ ...p, [bookingId]: n }))}
            style={{ fontSize: 24, cursor: 'pointer', color: n <= val ? '#F59E0B' : C.border, transition: 'color 0.15s' }}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', background: C.bg }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.border}`, padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <div style={{ padding: '12px 16px', marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${C.teal}, #0284C7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
            {(user?.name || 'D')[0].toUpperCase()}
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{user?.name || 'Vehicle Owner'}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{user?.email || ''}</div>
          <div style={{ marginTop: 8 }}><Badge color={C.teal}>🚗 Vehicle Owner</Badge></div>
        </div>
        {tabs.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderRadius: 10, background: activeTab === item.id ? C.tealGlow : 'transparent', border: `1px solid ${activeTab === item.id ? C.teal + '44' : 'transparent'}`, color: activeTab === item.id ? C.teal : C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', width: '100%' }}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Btn variant="primary" size="sm" onClick={() => setPage('search')} style={{ width: '100%', justifyContent: 'center' }}>🔍 Find Parking</Btn>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px 36px' }}>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, marginBottom: 4 }}>Welcome back, {user?.name?.split(' ')[0] || 'Driver'}! 👋</h1>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>{new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 28 }}>
              {[
                { label: 'Total Trips', val: bookings.length, icon: '🚗', color: C.teal, sub: 'All time' },
                { label: 'Total Spent', val: '₹' + totalSpent.toLocaleString('en-IN'), icon: '💳', color: C.amber, sub: 'All time' },
                { label: 'Fav Area', val: 'T Nagar', icon: '📍', color: C.green, sub: 'Most visited' },
                { label: 'Pending Reviews', val: pendingRatings.length, icon: '⭐', color: C.purple, sub: 'Rate your spots' },
              ].map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 12px rgba(22,163,74,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 500 }}>{s.label}</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, color: s.color }}>{s.val}</div>
                      <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{s.sub}</div>
                    </div>
                    <div style={{ fontSize: 26 }}>{s.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active booking highlight */}
            {activeBooking ? (
              <div style={{ background: C.tealGlow, border: `1.5px solid ${C.teal}44`, borderRadius: 20, padding: 24, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.text }}>🅿️ Active Booking</div>
                  <Badge color={C.green}>● Live</Badge>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  {[
                    { label: 'Parking Spot', val: activeBooking.spot },
                    { label: 'Slot No.', val: activeBooking.slot },
                    { label: 'Duration', val: activeBooking.duration },
                    { label: 'Amount', val: '₹' + activeBooking.amount },
                  ].map(item => (
                    <div key={item.label} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '12px 16px' }}>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>{item.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <Btn variant="teal" size="sm">Navigate to Spot</Btn>
                  <Btn variant="outline" size="sm">View Details</Btn>
                </div>
              </div>
            ) : (
              <div style={{ background: C.surface, border: `1.5px dashed ${C.border}`, borderRadius: 20, padding: 32, textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🅿️</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 8 }}>No Active Booking</div>
                <div style={{ color: C.muted, fontSize: 14, marginBottom: 20 }}>Book a parking spot in Chennai to get started</div>
                <Btn variant="primary" onClick={() => setPage('search')}>Find Parking Now →</Btn>
              </div>
            )}

            {/* Recent history */}
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>Recent Bookings</div>
              {completedBookings.slice(0, 3).map(b => (
                <div key={b.id} style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `1px solid ${C.border}` }}>🏢</div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{b.spot}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>📍 {b.area} • {b.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: C.green }}>₹{b.amount}</div>
                    <div style={{ fontSize: 12, color: C.dim }}>{b.duration}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '14px 24px', textAlign: 'center' }}>
                <span onClick={() => setActiveTab('history')} style={{ fontSize: 14, color: C.amber, fontWeight: 600, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>View full history →</span>
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKING HISTORY ── */}
        {activeTab === 'history' && (
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, marginBottom: 28 }}>Booking History</h1>
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: C.surface }}>
                      {['Booking ID', 'Parking Spot', 'Slot', 'Duration', 'Amount', 'Date', 'Rating'].map(h => (
                        <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: 11, color: C.dim, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.teal }}>{b.id}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: C.text }}>{b.spot}</div>
                          <div style={{ fontSize: 12, color: C.muted }}>📍 {b.area}</div>
                        </td>
                        <td style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.muted }}>{b.slot}</td>
                        <td style={{ padding: '14px 18px', fontSize: 14, color: C.muted }}>{b.duration}</td>
                        <td style={{ padding: '14px 18px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: C.green }}>₹{b.amount}</td>
                        <td style={{ padding: '14px 18px', fontSize: 13, color: C.dim }}>{b.date}</td>
                        <td style={{ padding: '14px 18px' }}>
                          {b.status === 'active' ? <Badge color={C.green}>Active</Badge>
                            : b.rating || ratings[b.id] ? <span style={{ color: '#F59E0B' }}>{'★'.repeat(b.rating || ratings[b.id])}</span>
                            : <span onClick={() => setActiveTab('ratings')} style={{ fontSize: 12, color: C.amber, cursor: 'pointer', fontWeight: 600 }}>Rate →</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ACTIVE BOOKING ── */}
        {activeTab === 'active' && (
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, marginBottom: 28 }}>Active Booking</h1>
            {activeBooking ? (
              <div style={{ maxWidth: 520 }}>
                <div style={{ background: C.card, border: `1.5px solid ${C.teal}44`, borderRadius: 20, padding: 28, boxShadow: '0 8px 30px rgba(13,148,136,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: C.text }}>{activeBooking.spot}</div>
                    <Badge color={C.green}>● Live Now</Badge>
                  </div>
                  {[
                    ['📍 Location', activeBooking.area],
                    ['🅿️ Slot No.', activeBooking.slot],
                    ['🚗 Vehicle', activeBooking.vehicle],
                    ['⏱️ Duration', activeBooking.duration],
                    ['💳 Amount', '₹' + activeBooking.amount],
                    ['🕐 Started', activeBooking.date],
                    ['🎫 Booking ID', activeBooking.id],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 14, color: C.muted }}>{label}</span>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <Btn variant="teal" size="lg" style={{ flex: 1, justifyContent: 'center' }}>🗺️ Navigate</Btn>
                    <Btn variant="danger" size="lg" style={{ flex: 1, justifyContent: 'center' }}>End Parking</Btn>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🅿️</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 8 }}>No Active Booking</div>
                <div style={{ color: C.muted, marginBottom: 24 }}>You don't have any ongoing parking session</div>
                <Btn variant="primary" size="lg" onClick={() => setPage('search')}>Find Parking in Chennai →</Btn>
              </div>
            )}
          </div>
        )}

        {/* ── RATE & REVIEW ── */}
        {activeTab === 'ratings' && (
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, marginBottom: 8 }}>Rate & Review</h1>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>Your feedback helps improve parking quality across Chennai</p>
            {completedBookings.filter(b => !b.rating).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.text }}>All caught up!</div>
                <div style={{ color: C.muted, marginTop: 8 }}>You've rated all your completed parkings</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {completedBookings.filter(b => !b.rating && !ratings[b.id]).map(b => (
                  <div key={b.id} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>{b.spot}</div>
                        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>📍 {b.area} • {b.date} • {b.duration}</div>
                      </div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: C.green }}>₹{b.amount}</div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>How was your parking experience?</div>
                      <StarPicker bookingId={b.id} />
                    </div>
                    <textarea
                      placeholder="Write a short review (optional)..."
                      style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', color: C.text, fontSize: 14, resize: 'vertical', minHeight: 72, outline: 'none', fontFamily: "'Inter', sans-serif" }}
                      onFocus={e => (e.target.style.borderColor = C.amber)}
                      onBlur={e => (e.target.style.borderColor = C.border)}
                    />
                    <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                      <Btn variant="primary" size="sm" onClick={() => setRatings(p => ({ ...p, [b.id]: ratingInput[b.id] || 5 }))}
                        disabled={!ratingInput[b.id]}>Submit Review</Btn>
                      <Btn variant="ghost" size="sm" onClick={() => setRatings(p => ({ ...p, [b.id]: 0 }))}>Skip</Btn>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submitted ratings */}
            {completedBookings.filter(b => b.rating).length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 16 }}>Your Past Reviews</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {completedBookings.filter(b => b.rating).map(b => (
                    <div key={b.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{b.spot}</div>
                        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{b.date}</div>
                      </div>
                      <span style={{ color: '#F59E0B', fontSize: 16 }}>{'★'.repeat(b.rating)}{'☆'.repeat(5 - b.rating)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, marginBottom: 28 }}>Account Settings</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 680 }}>
              <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 24, gridColumn: '1 / -1' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 18 }}>Personal Info</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['Full Name', user?.name || ''], ['Email', user?.email || ''], ['Phone', '+91 98765 43210'], ['City', 'Chennai']].map(([label, val]) => (
                    <div key={label}>
                      <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{label}</label>
                      <input defaultValue={val} style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none' }}
                        onFocus={e => (e.target.style.borderColor = C.teal)}
                        onBlur={e => (e.target.style.borderColor = C.border)} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 18 }}>My Vehicles</h3>
                {[{ reg: 'TN 09 AB 1234', type: '4-Wheeler', primary: true }].map(v => (
                  <div key={v.reg} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: C.text }}>{v.reg}</div>
                      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{v.type}</div>
                    </div>
                    {v.primary && <Badge color={C.green}>Primary</Badge>}
                  </div>
                ))}
                <Btn variant="outline" size="sm" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>+ Add Vehicle</Btn>
              </div>
              <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 18 }}>Saved Payment</h3>
                {[{ type: 'UPI', detail: 'user@okaxis', icon: '📱' }].map(p => (
                  <div key={p.type} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0' }}>
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13 }}>{p.type}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{p.detail}</div>
                    </div>
                  </div>
                ))}
                <Btn variant="outline" size="sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>+ Add Payment Method</Btn>
              </div>
            </div>
            <Btn variant="primary" size="lg" style={{ marginTop: 24 }}>Save Changes</Btn>
          </div>
        )}
      </div>
    </div>
  )
}
