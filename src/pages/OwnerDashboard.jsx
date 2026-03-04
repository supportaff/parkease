import { useState } from 'react'
import { C, LISTINGS, AMENITY_ICONS } from '../constants'
import { Btn, Badge, Input, Divider } from '../components/ui'

export default function OwnerDashboard({ user, setPage }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddListing, setShowAddListing] = useState(false)
  const [amenities, setAmenities] = useState([])

  const bookings = [
    { id: 'PKE-B001', user: 'Arjun K.', vehicle: 'TN 09 AB 1234', type: '4-Wheeler', duration: '3 hrs', amount: 150, status: 'active', time: 'Today, 2:00 PM' },
    { id: 'PKE-B002', user: 'Priya M.', vehicle: 'TN 07 CD 5678', type: '2-Wheeler', duration: 'Daily', amount: 100, status: 'completed', time: 'Yesterday' },
    { id: 'PKE-B003', user: 'Ravi P.', vehicle: 'TN 22 EF 9012', type: '4-Wheeler', duration: 'Monthly', amount: 1500, status: 'active', time: 'This month' },
    { id: 'PKE-B004', user: 'Anita S.', vehicle: 'TN 11 GH 3456', type: '2-Wheeler', duration: '2 hrs', amount: 30, status: 'completed', time: '2 days ago' },
    { id: 'PKE-B005', user: 'Karthik R.', vehicle: 'TN 05 IJ 7890', type: '4-Wheeler', duration: '5 hrs', amount: 250, status: 'completed', time: '3 days ago' },
  ]

  const stats = [
    { label: 'Total Earnings', val: '₹48,620', icon: '💰', color: C.green, sub: 'This month' },
    { label: 'Total Bookings', val: '213', icon: '📋', color: C.teal, sub: 'All time' },
    { label: 'Active Slots', val: '8/14', icon: '🅿️', color: C.amber, sub: 'Currently occupied' },
    { label: 'Avg. Rating', val: '4.8 ★', icon: '⭐', color: C.purple, sub: 'Based on 218 reviews' },
  ]

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'listings', icon: '🏗️', label: 'My Listings' },
    { id: 'bookings', icon: '📋', label: 'Bookings' },
    { id: 'earnings', icon: '💰', label: 'Earnings' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]

  const headingMap = {
    overview: 'Dashboard Overview', listings: 'My Parking Listings',
    bookings: 'Booking History', earnings: 'Earnings & Payouts', settings: 'Account Settings',
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', background: C.bg }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: C.surface, borderRight: `1px solid ${C.border}`, padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <div style={{ padding: '12px 16px', marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
            {(user?.name || 'O')[0].toUpperCase()}
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>{user?.name || 'Land Owner'}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{user?.email || ''}</div>
          <div style={{ marginTop: 8 }}><Badge color={C.green}>🏗️ Land Owner</Badge></div>
        </div>
        {tabs.map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setShowAddListing(false) }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderRadius: 10, background: activeTab === item.id ? C.amberGlow : 'transparent', border: `1px solid ${activeTab === item.id ? C.amber + '44' : 'transparent'}`, color: activeTab === item.id ? C.amber : C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', width: '100%' }}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Btn variant="outline" size="sm" onClick={() => setPage('search')} style={{ width: '100%', justifyContent: 'center' }}>Find Parking</Btn>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, marginBottom: 4 }}>{headingMap[activeTab]}</h1>
            <p style={{ color: C.muted, fontSize: 14 }}>{new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
          </div>
          {activeTab === 'listings' && !showAddListing && (
            <Btn variant="primary" onClick={() => setShowAddListing(true)}>+ Add New Listing</Btn>
          )}
        </div>

        {/* Stats row */}
        {(activeTab === 'overview' || activeTab === 'earnings') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 28 }}>
            {stats.map((s, i) => (
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
        )}

        {/* Bookings table */}
        {(activeTab === 'overview' || activeTab === 'bookings') && (
          <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{activeTab === 'overview' ? 'Recent Bookings' : 'All Bookings'}</span>
              <Badge color={C.green}>{bookings.filter(b => b.status === 'active').length} active</Badge>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: C.surface }}>
                    {['Booking ID', 'Customer', 'Vehicle No.', 'Duration', 'Amount', 'Status', 'Time'].map(h => (
                      <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: 11, color: C.dim, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'overview' ? bookings.slice(0, 4) : bookings).map(b => (
                    <tr key={b.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.amber }}>{b.id}</td>
                      <td style={{ padding: '14px 18px', fontSize: 14, fontWeight: 500, color: C.text }}>{b.user}</td>
                      <td style={{ padding: '14px 18px', fontSize: 12, color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>{b.vehicle}</td>
                      <td style={{ padding: '14px 18px', fontSize: 14, color: C.muted }}>{b.duration}</td>
                      <td style={{ padding: '14px 18px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: C.green }}>₹{b.amount}</td>
                      <td style={{ padding: '14px 18px' }}><Badge color={b.status === 'active' ? C.green : C.dim}>{b.status}</Badge></td>
                      <td style={{ padding: '14px 18px', fontSize: 13, color: C.dim }}>{b.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings grid */}
        {activeTab === 'listings' && !showAddListing && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {LISTINGS.slice(0, 2).map(l => (
              <div key={l.id} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(22,163,74,0.06)' }}>
                <div style={{ height: 120, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, borderBottom: `1px solid ${C.border}` }}>{l.cover}</div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>{l.name}</div>
                    <Badge color={C.green}>Active</Badge>
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>📍 {l.area}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                    {[{ label: 'Total Slots', val: l.slots }, { label: 'Available', val: l.slotsLeft, color: C.green }, { label: '4W / hr', val: '₹' + l.price4w, color: C.amber }].map(item => (
                      <div key={item.label} style={{ background: C.surface, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: C.dim, marginBottom: 4, fontWeight: 500 }}>{item.label}</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: item.color || C.text }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn variant="outline" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Edit Listing</Btn>
                    <Btn variant="primary" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Manage Slots</Btn>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={() => setShowAddListing(true)}
              style={{ background: C.card, border: `2px dashed ${C.border}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, cursor: 'pointer', transition: 'all 0.2s', minHeight: 200 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.background = C.amberGlow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: C.amberGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>+</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: C.text }}>Add New Listing</div>
              <div style={{ fontSize: 13, color: C.muted, textAlign: 'center' }}>List your parking space and start earning</div>
            </div>
          </div>
        )}

        {/* Add Listing form */}
        {activeTab === 'listings' && showAddListing && (
          <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: C.text, marginBottom: 24 }}>Add New Parking Listing</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Input label="Listing Name" placeholder="T Nagar Secure Parking" icon="🏷️" />
              <Input label="Full Address" placeholder="15, Usman Road, T Nagar..." icon="📍" />
              <Input label="Total Parking Slots" type="number" placeholder="14" icon="🅿️" />
              <div>
                <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Area</label>
                <select style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', color: C.text, fontSize: 14, outline: 'none' }}>
                  {['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Nungambakkam', 'OMR', 'Mylapore', 'Porur', 'Tambaram', 'Kilpauk'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <Input label="2-Wheeler Hourly Rate (₹)" type="number" placeholder="15" icon="🛵" />
              <Input label="4-Wheeler Hourly Rate (₹)" type="number" placeholder="50" icon="🚗" />
              <Input label="Monthly Rate (₹)" type="number" placeholder="1500" icon="📅" />
              <Input label="3-Wheeler Hourly Rate (₹)" type="number" placeholder="25" icon="🛺" />
            </div>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Amenities</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {Object.entries(AMENITY_ICONS).map(([a, icon]) => (
                  <button key={a}
                    onClick={() => setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}
                    style={{ padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${amenities.includes(a) ? C.amber + '66' : C.border}`, background: amenities.includes(a) ? C.amberGlow : 'transparent', color: amenities.includes(a) ? C.amber : C.muted, fontSize: 13, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}>
                    {icon} {a}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, border: `2px dashed ${C.border}`, borderRadius: 14, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', background: C.surface }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>Upload parking photos</div>
              <div style={{ fontSize: 13, color: C.dim, marginTop: 4 }}>JPG or PNG • Up to 10 photos • Max 5MB each</div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <Btn variant="primary" size="lg" onClick={() => setShowAddListing(false)}>Submit Listing →</Btn>
              <Btn variant="ghost" size="lg" onClick={() => setShowAddListing(false)}>Cancel</Btn>
            </div>
          </div>
        )}

        {/* Earnings chart */}
        {activeTab === 'earnings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 4 }}>
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 20 }}>Monthly Revenue (₹ in thousands)</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160 }}>
                {[32, 45, 28, 58, 72, 51, 66, 80, 55, 68, 88, 35].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', background: i === 10 ? `linear-gradient(to top, ${C.amber}, ${C.amberDark})` : C.amberGlow, border: i === 10 ? 'none' : `1px solid ${C.border}`, height: `${v}%`, borderRadius: '4px 4px 0 0', transition: 'all 0.2s' }} />
                    <span style={{ fontSize: 9, color: C.dim, fontFamily: "'JetBrains Mono', monospace" }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 20 }}>Payout Details</div>
              {[
                { label: 'Available Balance', val: '₹12,440', color: C.green },
                { label: 'Processing', val: '₹3,200', color: C.amber },
                { label: 'Total Paid Out', val: '₹32,980', color: C.teal },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.muted, fontSize: 14 }}>{r.label}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: r.color, fontSize: 16 }}>{r.val}</span>
                </div>
              ))}
              <Btn variant="teal" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>Request Payout →</Btn>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 32, maxWidth: 560 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>Profile Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Full Name" placeholder={user?.name || 'Your name'} icon="👤" />
              <Input label="Email" placeholder={user?.email || 'your@email.com'} icon="✉️" />
              <Input label="Phone" placeholder="+91 98765 43210" icon="📱" />
              <Input label="Bank Account (for payouts)" placeholder="XXXX XXXX XXXX XXXX" icon="🏦" />
            </div>
            <Btn variant="primary" size="lg" style={{ marginTop: 24 }}>Save Changes</Btn>
          </div>
        )}
      </div>
    </div>
  )
}
