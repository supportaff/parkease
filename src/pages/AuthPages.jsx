import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { C } from '../constants'
import { Btn } from '../components/ui'

const clerkAppearance = {
  variables: {
    colorPrimary: '#16A34A', colorBackground: '#FFFFFF',
    colorText: '#0A1F14', colorTextSecondary: '#436B53',
    colorInputBackground: '#F6FBF8', colorInputText: '#0A1F14',
    borderRadius: '10px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px',
  },
  elements: {
    card: { boxShadow: '0 8px 40px rgba(22,163,74,0.12)', border: '1.5px solid #CEEADB', borderRadius: '16px' },
    headerTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0A1F14' },
    formButtonPrimary: { backgroundColor: '#16A34A', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 },
    footerActionLink: { color: '#16A34A', fontWeight: 600 },
    formFieldInput: { borderColor: '#CEEADB' },
    socialButtonsBlockButton: { border: '1.5px solid #CEEADB' },
    dividerLine: { backgroundColor: '#CEEADB' },
  },
}

function RoleSelection({ onSelect, setPage }) {
  const [hovered, setHovered] = useState(null)

  const roles = [
    {
      id: 'owner',
      icon: '🏗️',
      title: 'Land Owner',
      subtitle: 'I want to earn by listing my space',
      color: C.green,
      glow: C.green + '18',
      features: ['Earn ₹5K–₹80K/month', 'Manage bookings & slots', 'Real-time earnings dashboard', 'Free listing for 3 months'],
    },
    {
      id: 'driver',
      icon: '🚗',
      title: 'Vehicle Owner',
      subtitle: 'I want to find & book parking',
      color: C.teal,
      glow: C.tealGlow,
      features: ['Instant slot booking', 'Chennai-wide coverage', 'Parking history & receipts', 'UPI, Card & Net Banking'],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${C.amberGlow}, transparent)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 620, width: '100%', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff', margin: '0 auto 16px' }}>P</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 30, color: C.text, marginBottom: 8 }}>Join ParkEase Chennai</h1>
          <p style={{ color: C.muted, fontSize: 16 }}>Tell us who you are to set up your account</p>
        </div>

        {/* Role cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          {roles.map(role => (
            <div key={role.id}
              onClick={() => onSelect(role.id)}
              onMouseEnter={() => setHovered(role.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === role.id ? role.glow : C.card,
                border: `2px solid ${hovered === role.id ? role.color + '66' : C.border}`,
                borderRadius: 20, padding: 28, cursor: 'pointer',
                transition: 'all 0.2s', boxShadow: hovered === role.id ? `0 8px 30px ${role.color}22` : '0 2px 12px rgba(22,163,74,0.06)',
              }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>{role.icon}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 19, color: C.text, marginBottom: 6 }}>{role.title}</h3>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>{role.subtitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {role.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: role.color + '22', border: `1.5px solid ${role.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: role.color, fontWeight: 700, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: 13, color: C.muted }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 22, padding: '10px 0', borderRadius: 10, background: role.color, color: '#fff', textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>
                Continue as {role.title} →
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: C.muted }}>
          Already have an account?{' '}
          <span onClick={() => setPage('login')} style={{ color: C.amber, fontWeight: 700, cursor: 'pointer' }}>Sign in here</span>
        </p>
      </div>
    </div>
  )
}

export function SignupPage({ setPage }) {
  const [role, setRole] = useState(null)

  const handleRoleSelect = (selectedRole) => {
    localStorage.setItem('parkease_pending_role', selectedRole)
    setRole(selectedRole)
  }

  if (!role) return <RoleSelection onSelect={handleRoleSelect} setPage={setPage} />

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.amberGlow}, transparent)`, pointerEvents: 'none' }} />
      <div style={{ marginBottom: 20, display: 'flex', align: 'center', gap: 10 }}>
        <span onClick={() => setRole(null)} style={{ cursor: 'pointer', color: C.muted, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>← Back to role selection</span>
      </div>
      <SignUp routing="hash" afterSignUpUrl="/" signInUrl="#login" appearance={clerkAppearance} />
    </div>
  )
}

export function LoginPage({ setPage }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.amberGlow}, transparent)`, pointerEvents: 'none' }} />
      <SignIn routing="hash" afterSignInUrl="/" signUpUrl="#signup" appearance={clerkAppearance} />
    </div>
  )
}
