import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { GLOBAL_CSS } from './constants'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import { SignupPage, LoginPage } from './pages/AuthPages'
import { SearchPage, ListingPage, BookingPage } from './pages/ParkingPages'
import OwnerDashboard from './pages/OwnerDashboard'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  const [page, setPage] = useState('landing')
  const [selectedListing, setSelectedListing] = useState(null)
  const { user: clerkUser, isSignedIn, isLoaded } = useUser()

  // Normalize Clerk user into app-compatible shape
  const user = clerkUser ? {
    name: clerkUser.firstName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress || 'User',
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    avatar: clerkUser.imageUrl || null,
    clerkId: clerkUser.id,
    // Role logic: extend via Clerk publicMetadata later
    type: clerkUser.publicMetadata?.role || 'driver',
  } : null

  // Inject global CSS once
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = GLOBAL_CSS
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Redirect protected pages if not signed in
  const requireAuth = (component) => {
    if (!isLoaded) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#436B53', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Loading...</div>
    if (!isSignedIn) return <LoginPage setPage={setPage} />
    return component
  }

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage setPage={setPage} />
      case 'signup':
        return <SignupPage setPage={setPage} />
      case 'login':
        return <LoginPage setPage={setPage} />
      case 'search':
        return <SearchPage setPage={setPage} setSelectedListing={setSelectedListing} />
      case 'listing':
        return <ListingPage listing={selectedListing} setPage={setPage} />
      case 'booking':
        return requireAuth(<BookingPage listing={selectedListing} setPage={setPage} />)
      case 'owner-dashboard':
        return requireAuth(<OwnerDashboard user={user} setPage={setPage} />)
      case 'admin':
        return requireAuth(<AdminPanel setPage={setPage} />)
      default:
        return <LandingPage setPage={setPage} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#0A1F14', fontFamily: "'Inter', sans-serif" }}>
      <Navbar setPage={setPage} user={user} />
      {renderPage()}
    </div>
  )
}
