import { useState } from 'react'
import { C } from '../constants'
import { Btn, Badge } from '../components/ui'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const pendingDocs = [
    { id: 'LO001', name: 'Vikram Rao', location: 'Indiranagar, Bengaluru', submitted: '2 hours ago', doc: 'Property Tax Receipt' },
    { id: 'LO002', name: 'Meena Shah', location: 'Andheri, Mumbai', submitted: '5 hours ago', doc: 'Land Ownership Deed' },
    { id: 'LO003', name: 'Suresh Kumar', location: 'Anna Nagar, Chennai', submitted: '1 day ago', doc: 'Rental Auth Letter' },
  ]

  const adminStats = [
    { label: 'Total Bookings', val: '18,420', delta: '+12%', color: C.teal },
    { label: 'Platform Revenue', val: '₹4.2 Cr', delta: '+18%', color: C.amber },
    { label: 'Active Users', val: '2,41,580', delta: '+8%', color: C.green },
    { label: 'Active Listings', val: '3,840', delta: '+5%', color: C.purple },
  ]

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'verifications', icon: '✅', label: 'Verifications', badge: 3 },
    { id: 'listings', icon: '🏗️', label: 'Listings' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'bookings', icon: '📋', label: 'Bookings' },
    { id: 'payouts', icon: '💰', label: 'Payouts' },
  ]

  return (
    <div style={{ paddingTop: 64, display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: C.surface, borderRight: `1px solid ${C.border}`, padding: '28px 14px', flexShrink: 0 }}>
        <div style={{ padding: '10px 14px', marginBottom: 16, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: C.amber }}>Admin Panel</div>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: 9, background: activeTab === item.id ? C.amberGlow : 'transparent', border: `1px solid ${activeTab === item.id ? C.amber + '44' : 'transparent'}`, color: activeTab === item.id ? C.amber : C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{item.icon} {item.label}</span>
            {item.badge && <span style={{ background: C.red, color: '#fff', borderRadius: 20, padding: '2px 7px', fontSize: 11, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 28 }}>
          {activeTab === 'dashboard' ? 'Platform Overview' : activeTab === 'verifications' ? 'Pending Verifications' : activeTab === 'users' ? 'User Management' : activeTab === 'bookings' ? 'Booking Management' : activeTab === 'payouts' ? 'Payout Management' : 'Listing Management'}
        </h1>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
              {adminStats.map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '20px 22px' }}>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: C.green, marginTop: 4 }}>↑ {s.delta} this month</div>
                </div>
              ))}
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 20 }}>High Demand Locations</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[{ city: 'Bengaluru', pct: 92, bookings: 5420 }, { city: 'Mumbai', pct: 87, bookings: 4810 }, { city: 'Delhi', pct: 79, bookings: 4120 }, { city: 'Chennai', pct: 68, bookings: 3090 }, { city: 'Hyderabad', pct: 61, bookings: 2780 }].map(c => (
                  <div key={c.city} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 90, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13 }}>{c.city}</div>
                    <div style={{ flex: 1, height: 8, background: C.surface, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${c.pct}%`, height: '100%', background: `linear-gradient(to right, ${C.amber}, ${C.amberDark})`, borderRadius: 4 }} />
                    </div>
                    <div style={{ width: 60, fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.amber, textAlign: 'right' }}>{c.bookings.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Verifications */}
        {activeTab === 'verifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pendingDocs.map(d => (
              <div key={d.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: C.amberGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontWeight: 800, color: C.amber, fontSize: 18 }}>{d.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                    <div style={{ color: C.muted, fontSize: 13 }}>📍 {d.location}</div>
                    <div style={{ color: C.dim, fontSize: 12, marginTop: 2 }}>📄 {d.doc} • {d.submitted}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Btn variant="ghost" size="sm">View Doc</Btn>
                  <Btn variant="danger" size="sm">Reject</Btn>
                  <Btn variant="teal" size="sm">✓ Approve</Btn>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  {['User', 'Type', 'City', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '13px 18px', textAlign: 'left', fontSize: 11, color: C.dim, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Rahul Sharma', type: 'driver', city: 'Bengaluru', joined: 'Jan 2025', status: 'active' },
                  { name: 'Priya Nair', type: 'owner', city: 'Mumbai', joined: 'Feb 2025', status: 'active' },
                  { name: 'Arjun Mehta', type: 'driver', city: 'Delhi', joined: 'Mar 2025', status: 'active' },
                  { name: 'Kavya S.', type: 'owner', city: 'Chennai', joined: 'Mar 2025', status: 'pending' },
                  { name: 'Rohit P.', type: 'driver', city: 'Hyderabad', joined: 'Apr 2025', status: 'suspended' },
                ].map((u, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: '14px 18px' }}><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14 }}>{u.name}</div></td>
                    <td style={{ padding: '14px 18px' }}><Badge color={u.type === 'owner' ? C.amber : C.teal}>{u.type}</Badge></td>
                    <td style={{ padding: '14px 18px', color: C.muted, fontSize: 14 }}>{u.city}</td>
                    <td style={{ padding: '14px 18px', color: C.dim, fontSize: 13 }}>{u.joined}</td>
                    <td style={{ padding: '14px 18px' }}><Badge color={u.status === 'active' ? C.green : u.status === 'pending' ? C.amber : C.red}>{u.status}</Badge></td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Btn variant="ghost" size="sm">View</Btn>
                        {u.status !== 'suspended' && <Btn variant="surface" size="sm">Suspend</Btn>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bookings & Payouts */}
        {(activeTab === 'bookings' || activeTab === 'payouts') && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>{activeTab === 'payouts' ? 'Pending Payouts' : 'All Bookings'}</span>
              {activeTab === 'payouts' && <Btn variant="primary" size="sm">Process All Payouts</Btn>}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  {(activeTab === 'bookings'
                    ? ['Booking ID', 'User', 'Location', 'Amount', 'Commission', 'Date', 'Status']
                    : ['Owner', 'Location', 'Earned', 'Commission', 'Payout Due', 'Action']
                  ).map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: 11, color: C.dim, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'bookings' ? [
                  { id: 'B1204', user: 'Rahul S.', loc: 'Koramangala', amt: 216, comm: 26, date: 'Today', status: 'active' },
                  { id: 'B1203', user: 'Sneha M.', loc: 'Indiranagar', amt: 150, comm: 18, date: 'Yesterday', status: 'completed' },
                  { id: 'B1202', user: 'Amit K.', loc: 'HSR Layout', amt: 540, comm: 65, date: '2 days ago', status: 'completed' },
                ].map((b, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: '14px 18px', fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.amber }}>{b.id}</td>
                    <td style={{ padding: '14px 18px', fontSize: 14 }}>{b.user}</td>
                    <td style={{ padding: '14px 18px', color: C.muted, fontSize: 14 }}>{b.loc}</td>
                    <td style={{ padding: '14px 18px', fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>₹{b.amt}</td>
                    <td style={{ padding: '14px 18px', color: C.green, fontFamily: "'Syne', sans-serif" }}>₹{b.comm}</td>
                    <td style={{ padding: '14px 18px', color: C.dim, fontSize: 13 }}>{b.date}</td>
                    <td style={{ padding: '14px 18px' }}><Badge color={b.status === 'active' ? C.green : C.dim}>{b.status}</Badge></td>
                  </tr>
                )) : [
                  { owner: 'Priya Nair', loc: 'Koramangala', earned: 12440, comm: 1493, payout: 10947 },
                  { owner: 'Vikram Rao', loc: 'Indiranagar', earned: 8200, comm: 984, payout: 7216 },
                  { owner: 'Meena Shah', loc: 'Andheri', earned: 15800, comm: 1896, payout: 13904 },
                ].map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: '14px 18px', fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{p.owner}</td>
                    <td style={{ padding: '14px 18px', color: C.muted, fontSize: 14 }}>{p.loc}</td>
                    <td style={{ padding: '14px 18px', fontFamily: "'Syne', sans-serif" }}>₹{p.earned.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 18px', color: C.red }}>-₹{p.comm.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 18px', color: C.green, fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>₹{p.payout.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 18px' }}><Btn variant="teal" size="sm">Pay Now</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
