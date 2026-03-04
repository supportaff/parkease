import { C } from '../constants'
import { Btn } from './ui'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

export default function Navbar({ setPage, user, dbRole }) {
  const navLink = (label, pg) => (
    <span key={label} onClick={() => setPage(pg)}
      style={{ fontSize: 14, color: C.muted, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, transition: 'color 0.2s', whiteSpace: 'nowrap' }}
      onMouseEnter={e => (e.target.style.color = C.amber)}
      onMouseLeave={e => (e.target.style.color = C.muted)}>
      {label}
    </span>
  )

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 20px rgba(22,163,74,0.08)',
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setPage('landing')}>
        <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#fff' }}>P</div>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: C.text, letterSpacing: '-0.02em' }}>
          Park<span style={{ color: C.amber }}>Ease</span>
        </span>
      </div>

      {/* Nav links — change based on auth state & role */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {/* Logged-OUT links */}
        <SignedOut>
          {navLink('Find Parking', 'search')}
          {navLink('List Your Space', 'signup')}
          {navLink('How It Works', 'landing')}
        </SignedOut>

        {/* Logged-IN as Land Owner */}
        <SignedIn>
          {dbRole === 'owner' && (
            <>
              {navLink('My Listings', 'owner-dashboard')}
              {navLink('Bookings', 'owner-dashboard')}
              {navLink('Earnings', 'owner-dashboard')}
            </>
          )}
          {/* Logged-IN as Vehicle Owner */}
          {dbRole === 'driver' && (
            <>
              {navLink('Find Parking', 'search')}
              {navLink('My Bookings', 'driver-dashboard')}
              {navLink('Parking History', 'driver-dashboard')}
            </>
          )}
          {/* Loading / role not yet fetched */}
          {!dbRole && navLink('Dashboard', 'landing')}
        </SignedIn>
      </div>

      {/* Auth controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <SignedOut>
          <Btn variant="ghost" size="sm" onClick={() => setPage('login')}>Login</Btn>
          <Btn variant="primary" size="sm" onClick={() => setPage('signup')}>Sign Up</Btn>
        </SignedOut>

        <SignedIn>
          {/* Role badge — not clickable (locked) */}
          {dbRole && (
            <span style={{
              fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              color: dbRole === 'owner' ? C.green : C.teal,
              background: dbRole === 'owner' ? C.green + '18' : C.tealGlow,
              border: `1px solid ${dbRole === 'owner' ? C.green + '44' : C.teal + '44'}`,
              borderRadius: 6, padding: '3px 10px', userSelect: 'none',
            }}>
              {dbRole === 'owner' ? '🏗️ Land Owner' : '🚗 Vehicle Owner'}
            </span>
          )}
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { avatarBox: { width: 36, height: 36, borderRadius: 10, border: `2px solid ${C.border}` } } }}
          />
        </SignedIn>
      </div>
    </nav>
  )
}
