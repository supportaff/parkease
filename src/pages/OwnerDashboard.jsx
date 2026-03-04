import { useState } from 'react'
import { C, LISTINGS, AMENITY_ICONS } from '../constants'
import { Btn, Badge, Input, Divider } from '../components/ui'

export default function OwnerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddListing, setShowAddListing] = useState(false)

  const bookings = [
    { id: 'B001', user: 'Rahul S.', vehicle: 'KA 01 AB 1234', type: '4-Wheeler', duration: '3 hrs', amount: 216, status: 'active', time: 'Today, 2:00 PM' },
    { id: 'B002', user: 'Sneha M.', vehicle: 'MH 02 CD 5678', type: '2-Wheeler', duration: 'Daily', amount: 150, status: 'completed', time: 'Yesterday' },
    { id: 'B003', user: 'Kiran P.', vehicle: 'TN 09 EF 9012', type: '4-Wheeler', duration: 'Monthly', amount: 2500, status: 'active', time: 'This month' },
    { id: 'B004', user: 'Priti A.', vehicle: 'DL 04 GH 3456', type: '2-Wheeler', duration: '2 hrs', amount: 40, status: 'completed', time: '2 days ago' },
  ]

  const stats = [
    { label: 'Total Earnings', val: '₹48,620', icon: '💰', color: C.green, sub: 'This month' },
    { label: 'Total Bookings', val: '213', icon: '📋', color: C.teal, sub: 'All time' },
    { label: 'Active Slots', val: '8/12', icon: '🅿️', color: C.amber, sub: 'Currently occupied' },
    { label: 'Avg. Rating', val: '4.8 ★', icon: '⭐', color: C.purple, sub: 'Based on 142 reviews' },
  ]

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.border}`, padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <div style={{ padding: '12px 16px', marginBottom: 12 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14 }}>{user?.name || 'Land Owner'}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Land Owner</div>
          <div style={{ marginTop: 6 }}><Badge color={C.green}>✓ Verified</Badge></div>
        </div>
        {[
          { id: 'overview', icon: '📊', label: 'Overview' },
          { id: 'listings', icon: '🏗️', label: 'My Listings' },
          { id: 'bookings', icon: '📋', label: 'Bookings' },
          { id: 'earnings', icon: '💰', label: 'Earnings' },
          { id: 'settings', icon: '⚙️', label: 'Settings' },
        ].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setShowAddListing(false) }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, background: activeTab === item.id ? C.amberGlow : 'transparent', border: `1px solid ${activeTab === item.id ? C.amber + '44' : 'transparent'}`, color: activeTab === item.id ? C.amber : C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', width: '100%' }}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, marginBottom: 4 }}>
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'listings' ? 'My Parking Listings' : activeTab === 'bookings' ? 'Booking History' : activeTab === 'earnings' ? 'Earnings & Payouts' : 'Settings'}
            </h1>
            <p style={{ color: C.muted, fontSize: 14 }}>{new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
          </div>
          {activeTab === 'listings' && <Btn variant="primary" onClick={() => setShowAddListing(true)}>+ Add New Listing</Btn>}
        </div>

        {/* Stats */}
        {(activeTab === 'overview' || activeTab === 'earnings') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{s.sub}</div>
                  </div>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings table */}
        {(activeTab === 'overview' || activeTab === 'bookings') && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>
              {activeTab === 'overview' ? 'Recent Bookings' : 'All Bookings'}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  {['Booking ID', 'User', 'Vehicle', 'Duration', 'Amount', 'Status', 'Time'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, color: C.dim, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: '14px 18px', fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.amber }}>{b.id}</td>
                    <td style={{ padding: '14px 18px', fontSize: 14 }}>{b.user}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: C.muted, fontFamily: "'DM Mono', monospace" }}>{b.vehicle}</td>
                    <td style={{ padding: '14px 18px', fontSize: 14, color: C.muted }}>{b.duration}</td>
                    <td style={{ padding: '14px 18px', fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.green }}>₹{b.amount}</td>
                    <td style={{ padding: '14px 18px' }}><Badge color={b.status === 'active' ? C.green : C.dim}>{b.status}</Badge></td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: C.dim }}>{b.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Listings grid */}
        {activeTab === 'listings' && !showAddListing && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {LISTINGS.slice(0, 2).map(l => (
              <div key={l.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ height: 130, background: 'linear-gradient(135deg, #0D2137, #0A1A2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>{l.cover}</div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>{l.name}</div>
                    <Badge color={C.green}>Active</Badge>
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>📍 {l.area}</div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <div><div style={{ fontSize: 11, color: C.dim }}>Slots</div><div style={{ fontWeight: 700 }}>{l.slots}</div></div>
                    <div><div style={{ fontSize: 11, color: C.dim }}>Available</div><div style={{ fontWeight: 700, color: C.green }}>{l.slotsLeft}</div></div>
                    <div><div style={{ fontSize: 11, color: C.dim }}>Price/hr</div><div style={{ fontWeight: 700, color: C.amber }}>₹{l.price4w}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn variant="outline" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Edit</Btn>
                    <Btn variant="surface" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Manage Slots</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Listing form */}
        {activeTab === 'listings' && showAddListing && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 24 }}>Add New Parking Listing</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Input label="Listing Name" placeholder="Koramangala Premium Lot" icon="🏷️" />
              <Input label="Full Address" placeholder="123, 5th Cross, Koramangala..." icon="📍" />
              <Input label="Total Parking Slots" type="number" placeholder="12" icon="🅿️" />
              <div>
                <label style={{ fontSize: 13, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>City</label>
                <select style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', color: C.text, fontSize: 15, outline: 'none' }}>
                  {['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <Input label="2-Wheeler Hourly Price (₹)" type="number" placeholder="15" icon="🛵" />
              <Input label="4-Wheeler Hourly Price (₹)" type="number" placeholder="60" icon="🚗" />
              <Input label="Monthly Price (₹)" type="number" placeholder="1800" icon="📅" />
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.06em', marginBottom: 12 }}>AMENITIES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {Object.entries(AMENITY_ICONS).map(([a, icon]) => (
                  <button key={a} style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${C.border}`, background: 'transparent', color: C.muted, fontSize: 13, cursor: 'pointer', fontFamily: "'Syne', sans-serif", transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.target.style.borderColor = C.amber; e.target.style.color = C.amber }}
                    onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.muted }}>
                    {icon} {a}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, border: `2px dashed ${C.border}`, borderRadius: 14, padding: '24px 20px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14 }}>Upload parking photos</div>
              <div style={{ fontSize: 13, color: C.dim, marginTop: 4 }}>JPG or PNG • Up to 10 photos</div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Btn variant="primary" size="lg" onClick={() => setShowAddListing(false)}>Submit Listing →</Btn>
              <Btn variant="ghost" size="lg" onClick={() => setShowAddListing(false)}>Cancel</Btn>
            </div>
          </div>
        )}

        {/* Earnings */}
        {activeTab === 'earnings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 20 }}>Monthly Revenue</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160 }}>
                {[45, 62, 38, 80, 95, 71, 88, 110, 75, 92, 115, 48].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', background: `linear-gradient(to top, ${C.amber}, ${C.amberDark})`, height: `${v}%`, borderRadius: '4px 4px 0 0', opacity: i === 10 ? 1 : 0.5 }} />
                    <span style={{ fontSize: 9, color: C.dim, fontFamily: "'DM Mono', monospace" }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 20 }}>Payout Details</div>
              {[{ label: 'Available Balance', val: '₹12,440', color: C.green }, { label: 'Processing', val: '₹3,200', color: C.amber }, { label: 'Total Paid Out', val: '₹32,980', color: C.teal }].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.muted }}>{r.label}</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: r.color }}>{r.val}</span>
                </div>
              ))}
              <Btn variant="teal" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>Request Payout</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
