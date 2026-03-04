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

export default function App() {
  const [page, setPage] = useState('landing')
  const [selectedListing, setSelectedListing] = useState(null)
  const [dbRole, setDbRole] = useState(null)          // 'owner' | 'driver'
  const [profileComplete, setProfileComplete] = useState(null) // null=loading, true/false
  const [roleLoading, setRoleLoading] = useState(false)
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()

  // Inject global CSS
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = GLOBAL_CSS
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // On sign-in: sync role & profileComplete from MongoDB
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkUser) {
      if (isLoaded && !isSignedIn) {
        setDbRole(null)
        setProfileComplete(null)
      }
      return
    }
    setRoleLoading(true)
    const pending = localStorage.getItem('parkease_pending_role')

    if (pending) {
      // New signup: save role, profile not yet complete
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
        .then(() => {
          localStorage.removeItem('parkease_pending_role')
          setDbRole(pending)
          setProfileComplete(false)  // Will trigger profile setup form
        })
        .catch(() => {
          setDbRole(pending)
          setProfileComplete(false)
        })
        .finally(() => setRoleLoading(false))
    } else {
      // Returning user: fetch existing profile
      fetch(`/api/users?clerkId=${clerkUser.id}`)
        .then(r => r.json())
        .then(data => {
          setDbRole(data?.role || 'driver')
          setProfileComplete(data?.profileComplete ?? false)
        })
        .catch(() => {
          setDbRole('driver')
          setProfileComplete(false)
        })
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

  // ── Loading screen ──
  const Loader = () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: C.bg }}>
      <div style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff' }}>P</div>
      <div style={{ color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}>Loading...</div>
    </div>
  )

  // ── Auth guard: returns element or redirects ──
  const requireAuth = (ownerEl, driverEl) => {
    if (!isLoaded || roleLoading) return <Loader />
    if (!isSignedIn) return <LoginPage setPage={setPage} />
    return dbRole === 'owner' ? ownerEl : driverEl
  }

  // ── Profile setup intercept ──
  // After sign-in, if profile is not complete, always show setup form first
  if (isLoaded && isSignedIn && !roleLoading && dbRole && profileComplete === false) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg }}>
        <Navbar setPage={setPage} user={user} dbRole={dbRole} />
        <ProfileSetupPage
          user={user}
          role={dbRole}
          onComplete={() => {
            setProfileComplete(true)
            setPage(dbRole === 'owner' ? 'owner-dashboard' : 'driver-dashboard')
          }}
        />
      </div>
    )
  }

  const renderPage = () => {
    // Redirect signed-in users away from auth pages
    if (isSignedIn && profileComplete && (page === 'signup' || page === 'login')) {
      return dbRole === 'owner'
        ? <OwnerDashboard user={user} setPage={setPage} />
        : <DriverDashboard user={user} setPage={setPage} />
    }

    switch (page) {
      case 'landing':          return <LandingPage setPage={setPage} />
      case 'signup':           return <SignupPage setPage={setPage} />
      case 'login':            return <LoginPage setPage={setPage} />
      case 'search':           return <SearchPage setPage={setPage} setSelectedListing={setSelectedListing} />
      case 'listing':          return <ListingPage listing={selectedListing} setPage={setPage} />
      case 'booking':          return requireAuth(<BookingPage listing={selectedListing} setPage={setPage} />, <BookingPage listing={selectedListing} setPage={setPage} />)
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
