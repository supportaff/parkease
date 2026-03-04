import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { GLOBAL_CSS, C } from './constants'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import { SignupPage, LoginPage } from './pages/AuthPages'
import { SearchPage, ListingPage, BookingPage } from './pages/ParkingPages'
import OwnerDashboard from './pages/OwnerDashboard'
import DriverDashboard from './pages/DriverDashboard'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  const [page, setPage] = useState('landing')
  const [selectedListing, setSelectedListing] = useState(null)
  const [dbRole, setDbRole] = useState(null)   // 'owner' | 'driver' | null
  const [roleLoading, setRoleLoading] = useState(false)
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()

  // Inject global CSS
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = GLOBAL_CSS
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Sync role: on sign-in, check localStorage for pending role or fetch from DB
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkUser) return
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
        }),
      })
        .then(() => {
          localStorage.removeItem('parkease_pending_role')
          setDbRole(pending)
          setPage(pending === 'owner' ? 'owner-dashboard' : 'driver-dashboard')
        })
        .catch(console.error)
        .finally(() => setRoleLoading(false))
    } else {
      fetch(`/api/users?clerkId=${clerkUser.id}`)
        .then(r => r.json())
        .then(data => {
          const role = data?.role || 'driver'
          setDbRole(role)
        })
        .catch(() => setDbRole('driver'))
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

  const LoadingScreen = () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: '#fff' }}>P</div>
      <div style={{ color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}>Loading your dashboard...</div>
    </div>
  )

  const requireAuth = (ownerEl, driverEl) => {
    if (!isLoaded || roleLoading) return <LoadingScreen />
    if (!isSignedIn) return <LoginPage setPage={setPage} />
    return dbRole === 'owner' ? ownerEl : driverEl
  }

  const renderPage = () => {
    switch (page) {
      case 'landing':         return <LandingPage setPage={setPage} />
      case 'signup':          return <SignupPage setPage={setPage} />
      case 'login':           return <LoginPage setPage={setPage} />
      case 'search':          return <SearchPage setPage={setPage} setSelectedListing={setSelectedListing} />
      case 'listing':         return <ListingPage listing={selectedListing} setPage={setPage} />
      case 'booking':         return requireAuth(<BookingPage listing={selectedListing} setPage={setPage} />, <BookingPage listing={selectedListing} setPage={setPage} />)
      case 'owner-dashboard': return requireAuth(<OwnerDashboard user={user} setPage={setPage} />, <DriverDashboard user={user} setPage={setPage} />)
      case 'driver-dashboard':return requireAuth(<OwnerDashboard user={user} setPage={setPage} />, <DriverDashboard user={user} setPage={setPage} />)
      case 'admin':           return requireAuth(<AdminPanel setPage={setPage} />, <LandingPage setPage={setPage} />)
      default:                return <LandingPage setPage={setPage} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#0A1F14', fontFamily: "'Inter', sans-serif" }}>
      <Navbar setPage={setPage} user={user} dbRole={dbRole} />
      {renderPage()}
    </div>
  )
}
