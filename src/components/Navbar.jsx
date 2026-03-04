import { C } from '../constants'
import { Btn } from './ui'

export default function Navbar({ setPage, user, setUser }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(6,13,26,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.border}`,
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => setPage('landing')}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 900,
            color: '#0A0F1A',
          }}
        >
          P
        </div>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: C.text,
            letterSpacing: '-0.02em',
          }}
        >
          Park<span style={{ color: C.amber }}>Ease</span>
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {!user ? (
          <>
            <Btn variant="ghost" size="sm" onClick={() => setPage('login')}>Login</Btn>
            <Btn variant="primary" size="sm" onClick={() => setPage('signup')}>Sign Up</Btn>
          </>
        ) : user.type === 'owner' ? (
          <>
            <Btn variant="ghost" size="sm" onClick={() => setPage('owner-dashboard')}>Dashboard</Btn>
            <Btn variant="outline" size="sm" onClick={() => setUser(null)}>Logout</Btn>
          </>
        ) : user.type === 'admin' ? (
          <>
            <Btn variant="ghost" size="sm" onClick={() => setPage('admin')}>Admin Panel</Btn>
            <Btn variant="outline" size="sm" onClick={() => setUser(null)}>Logout</Btn>
          </>
        ) : (
          <>
            <Btn variant="ghost" size="sm" onClick={() => setPage('search')}>Find Parking</Btn>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${C.teal}, ${C.purple})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
                cursor: 'pointer',
                color: '#fff',
              }}
              onClick={() => setPage('search')}
            >
              {user.name[0].toUpperCase()}
            </div>
            <Btn variant="outline" size="sm" onClick={() => setUser(null)}>Logout</Btn>
          </>
        )}
      </div>
    </nav>
  )
}
