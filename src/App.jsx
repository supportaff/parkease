import { useState, useEffect } from 'react'
import { GLOBAL_CSS } from './constants'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import { SignupPage, LoginPage } from './pages/AuthPages'
import { SearchPage, ListingPage, BookingPage } from './pages/ParkingPages'
import OwnerDashboard from './pages/OwnerDashboard'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  const [page, setPage] = useState('landing')
  const [user, setUser] = useState(null)
  const [selectedListing, setSelectedListing] = useState(null)

  // Inject global CSS once
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = GLOBAL_CSS
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage setPage={setPage} />
      case 'signup':
        return <SignupPage setPage={setPage} setUser={setUser} />
      case 'login':
        return <LoginPage setPage={setPage} setUser={setUser} />
      case 'search':
        return <SearchPage setPage={setPage} setSelectedListing={setSelectedListing} />
      case 'listing':
        return <ListingPage listing={selectedListing} setPage={setPage} />
      case 'booking':
        return <BookingPage listing={selectedListing} setPage={setPage} />
      case 'owner-dashboard':
        return <OwnerDashboard user={user} setPage={setPage} />
      case 'admin':
        return <AdminPanel setPage={setPage} />
      default:
        return <LandingPage setPage={setPage} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060D1A', color: '#EEF2FF', fontFamily: "'Crimson Pro', serif" }}>
      <Navbar setPage={setPage} user={user} setUser={setUser} />
      {renderPage()}
    </div>
  )
}
