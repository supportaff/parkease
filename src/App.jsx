import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { GLOBAL_CSS, C } from './constants'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import { SignupPage, LoginPage, ProfileSetupPage } from './pages/AuthPages'
import { SearchPage, ListingPage, BookingPage } from './pages/ParkingPages'
import OwnerDashboard from './pages/OwnerDashboard'
import DriverDashboard from './pages/DriverDashboard'
import AdminPanel from './pages/AdminPanel'
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages'

export default function App() {
  const [page, setPage] = useState('landing')
  const [selectedListing, setSelectedListing] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null) // booking details from BookingWidget
  const [dbRole, setDbRole] = useState(null)
  const [profileComplete, setProfileComplete] = useState(null)
  const [roleLoading, setRoleLoading] = useState(false)
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = GLOBAL_CSS
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkUser) {
      if (isLoaded && !isSignedIn) { setDbRole(null); setProfileComplete(null) }
      return
    }
    setRoleLoading(true)
    const pending = localStorage.getItem('parkease_pending_role')
    if (pending) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: clerkUser.id,
          name: clerkUser.firstName || clerkUser.username || 'User',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          avatar: clerkUser.imageUrl || '',
          role: pending,
          profileComplete: false,
        }),
      })
        .then(() => { localStorage.removeItem('parkease_pending_role'); setDbRole(pending); setProfileComplete(false) })
        .catch(() => { setDbRole(pending); setProfileComplete(false) })
        .finally(() => setRoleLoading(false))
    } else {
      fetch(`/api/users?clerkId=${clerkUser.id}`)
        .then(r => r.json())
        .then(data => { setDbRole(data?.role || 'driver'); setProfileComplete(data?.profileComplete ?? false) })
        .catch(() => { setDbRole('driver'); setProfileComplete(false) })
        .finally(() => setRoleLoading(false))
    }
  }, [isSignedIn, isLoaded, clerkUser?.id])

  const user = clerkUser ? {
    name: clerkUser.firstName || clerkUser.username || 'User',
    fullName: clerkUser.fullName || clerkUser.firstName || 'User',
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    avatar: clerkUser.imageUrl || null,
    clerkId: clerkUser.id,
    type: dbRole || 'driver',
  } : null

  const Loader = () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: C.bg }}>
      <div style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff' }}>P</div>
      <div style={{ color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}>Loading...</div>
    </div>
  )

  const requireAuth = (ownerEl, driverEl) => {
    if (!isLoaded || roleLoading) return <Loader />
    if (!isSignedIn) return <LoginPage setPage={setPage} />
    return dbRole === 'owner' ? ownerEl : driverEl
  }

  if (isLoaded && isSignedIn && !roleLoading && dbRole && profileComplete === false) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg }}>
        <Navbar setPage={setPage} user={user} dbRole={dbRole} />
        <ProfileSetupPage user={user} role={dbRole} onComplete={() => { setProfileComplete(true); setPage(dbRole === 'owner' ? 'owner-dashboard' : 'driver-dashboard') }} />
      </div>
    )
  }

  const renderPage = () => {
    if (isSignedIn && profileComplete && (page === 'signup' || page === 'login')) {
      return dbRole === 'owner' ? <OwnerDashboard user={user} setPage={setPage} /> : <DriverDashboard user={user} setPage={setPage} />
    }
    switch (page) {
      case 'landing':          return <LandingPage setPage={setPage} />
      case 'signup':           return <SignupPage setPage={setPage} />
      case 'login':            return <LoginPage setPage={setPage} />
      case 'privacy':          return <PrivacyPolicyPage setPage={setPage} />
      case 'terms':            return <TermsPage setPage={setPage} />
      case 'search':           return <SearchPage setPage={setPage} setSelectedListing={setSelectedListing} />
      case 'listing':          return <ListingPage listing={selectedListing} setPage={setPage} setSelectedBooking={setSelectedBooking} />
      case 'booking':          return requireAuth(
        <BookingPage listing={selectedListing} booking={selectedBooking} setPage={setPage} user={user} />,
        <BookingPage listing={selectedListing} booking={selectedBooking} setPage={setPage} user={user} />
      )
      case 'owner-dashboard':  return requireAuth(<OwnerDashboard user={user} setPage={setPage} />, <DriverDashboard user={user} setPage={setPage} />)
      case 'driver-dashboard': return requireAuth(<OwnerDashboard user={user} setPage={setPage} />, <DriverDashboard user={user} setPage={setPage} />)
      case 'admin':            return requireAuth(<AdminPanel setPage={setPage} />, <LandingPage setPage={setPage} />)
      default:                 return <LandingPage setPage={setPage} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#0A1F14', fontFamily: "'Inter', sans-serif" }}>
      <Navbar setPage={setPage} user={user} dbRole={dbRole} />
      {renderPage()}
    </div>
  )
}
