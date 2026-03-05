import { useState } from 'react'
import { C } from '../constants'
import { Btn } from './ui'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

export default function Navbar({ setPage, user, dbRole }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  const navLink = (label, pg) => (
    <span key={label} onClick={() => { setPage(pg); close() }}
      style={{ fontSize: 14, color: C.muted, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, transition: 'color 0.2s', whiteSpace: 'nowrap', display: 'block', padding: menuOpen ? '12px 0' : '0' }}
      onMouseEnter={e => (e.currentTarget.style.color = C.amber)}
      onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
      {label}
    </span>
  )

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 20px rgba(22,163,74,0.08)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => { setPage('landing'); close() }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#fff' }}>P</div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: C.text, letterSpacing: '-0.02em' }}>
            Park<span style={{ color: C.amber }}>Ease</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="pe-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <SignedOut>
            {navLink('Find Parking', 'search')}
            {navLink('List Your Space', 'signup')}
            {navLink('How It Works', 'landing')}
          </SignedOut>
          <SignedIn>
            {dbRole === 'owner' && (<>
              {navLink('My Listings', 'owner-dashboard')}
              {navLink('Bookings', 'owner-dashboard')}
              {navLink('Earnings', 'owner-dashboard')}
            </>)}
            {dbRole === 'driver' && (<>
              {navLink('Find Parking', 'search')}
              {navLink('My Bookings', 'driver-dashboard')}
              {navLink('Parking History', 'driver-dashboard')}
            </>)}
            {!dbRole && navLink('Dashboard', 'landing')}
          </SignedIn>
        </div>

        {/* Desktop auth */}
        <div className="pe-nav-auth" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SignedOut>
            <Btn variant="ghost" size="sm" onClick={() => setPage('login')}>Login</Btn>
            <Btn variant="primary" size="sm" onClick={() => setPage('signup')}>Sign Up</Btn>
          </SignedOut>
          <SignedIn>
            {dbRole && (
              <span style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, color: dbRole === 'owner' ? C.green : C.teal, background: dbRole === 'owner' ? C.green + '18' : C.tealGlow, border: `1px solid ${dbRole === 'owner' ? C.green + '44' : C.teal + '44'}`, borderRadius: 6, padding: '3px 10px', userSelect: 'none' }}>
                {dbRole === 'owner' ? '🏗️ Land Owner' : '🚗 Vehicle Owner'}
              </span>
            )}
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: { width: 36, height: 36, borderRadius: 10, border: `2px solid ${C.border}` } } }} />
          </SignedIn>
        </div>

        {/* Hamburger — visible only on mobile via CSS */}
        <button
          className="pe-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', background: menuOpen ? C.amberGlow : 'transparent', border: `1.5px solid ${menuOpen ? C.amber + '66' : C.border}`, borderRadius: 9, padding: '7px 10px', cursor: 'pointer', fontSize: 20, color: C.text, alignItems: 'center', justifyContent: 'center', lineHeight: 1, transition: 'all 0.2s' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(24px)',
          zIndex: 99, padding: '28px 24px', display: 'flex', flexDirection: 'column',
          borderTop: `1px solid ${C.border}`, overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <SignedOut>
              {navLink('Find Parking', 'search')}
              {navLink('List Your Space', 'signup')}
              {navLink('How It Works', 'landing')}
            </SignedOut>
            <SignedIn>
              {dbRole === 'owner' && (<>
                {navLink('My Listings', 'owner-dashboard')}
                {navLink('Bookings', 'owner-dashboard')}
                {navLink('Earnings', 'owner-dashboard')}
                {navLink('Settings', 'owner-dashboard')}
              </>)}
              {dbRole === 'driver' && (<>
                {navLink('Find Parking', 'search')}
                {navLink('My Bookings', 'driver-dashboard')}
                {navLink('Active Booking', 'driver-dashboard')}
                {navLink('Rate & Review', 'driver-dashboard')}
              </>)}
            </SignedIn>
          </div>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            <SignedOut>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Btn variant="outline" size="lg" onClick={() => { setPage('login'); close() }} style={{ width: '100%', justifyContent: 'center' }}>Login</Btn>
                <Btn variant="primary" size="lg" onClick={() => { setPage('signup'); close() }} style={{ width: '100%', justifyContent: 'center' }}>Sign Up Free</Btn>
              </div>
            </SignedOut>
            <SignedIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0' }}>
                <UserButton afterSignOutUrl="/" />
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: C.text }}>{user?.name}</div>
                  {dbRole && <div style={{ fontSize: 12, color: C.muted }}>{dbRole === 'owner' ? '🏗️ Land Owner' : '🚗 Vehicle Owner'}</div>}
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  )
}
