import { useState } from 'react'
import { SignIn, SignUp, useUser } from '@clerk/clerk-react'
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

// ─── ROLE SELECTION ────────────────────────────────────────────────────
function RoleSelection({ onSelect, setPage }) {
  const [hovered, setHovered] = useState(null)
  const roles = [
    {
      id: 'owner', icon: '🏗️', title: 'Land Owner',
      subtitle: 'I want to earn by listing my parking space',
      color: C.green, glow: C.green + '18',
      features: ['Earn ₹5K–₹80K/month', 'Real-time bookings & earnings', 'Manage slots & pricing', '3-month free listing'],
    },
    {
      id: 'driver', icon: '🚗', title: 'Vehicle Owner',
      subtitle: 'I want to find & book parking in Chennai',
      color: C.teal, glow: C.tealGlow,
      features: ['Instant slot booking', 'Chennai-wide coverage', 'Booking history & receipts', 'UPI, Card & Net Banking'],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${C.amberGlow}, transparent)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 640, width: '100%', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff', margin: '0 auto 16px' }}>P</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 30, color: C.text, marginBottom: 8 }}>Join ParkEase Chennai</h1>
          <p style={{ color: C.muted, fontSize: 15 }}>Choose your role — this <strong>cannot be changed later</strong></p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          {roles.map(role => (
            <div key={role.id}
              onClick={() => onSelect(role.id)}
              onMouseEnter={() => setHovered(role.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ background: hovered === role.id ? role.glow : C.card, border: `2px solid ${hovered === role.id ? role.color + '66' : C.border}`, borderRadius: 20, padding: 28, cursor: 'pointer', transition: 'all 0.2s', boxShadow: hovered === role.id ? `0 8px 30px ${role.color}22` : '0 2px 12px rgba(22,163,74,0.06)' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>{role.icon}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 19, color: C.text, marginBottom: 6 }}>{role.title}</h3>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>{role.subtitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {role.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: role.color + '22', border: `1.5px solid ${role.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: role.color, fontWeight: 700, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: 13, color: C.muted }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 0', borderRadius: 10, background: role.color, color: '#fff', textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>Continue as {role.title} →</div>
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

// ─── PROFILE SETUP FORM ────────────────────────────────────────────────
export function ProfileSetupPage({ user, role, onComplete }) {
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    // owner fields
    propertyType: 'covered',
    totalSlots: '',
    propertyAddress: '',
    area: 'T Nagar',
    gst: '',
    // driver fields
    vehicleReg: '',
    vehicleType: '4-wheeler',
    preferredAreas: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const toggleArea = (area) => {
    setForm(p => ({
      ...p,
      preferredAreas: p.preferredAreas.includes(area)
        ? p.preferredAreas.filter(a => a !== area)
        : [...p.preferredAreas, area],
    }))
  }

  const chennaAreas = ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Nungambakkam', 'OMR', 'Mylapore', 'Porur', 'Tambaram', 'Kilpauk', 'Perambur', 'Guindy']

  const handleSubmit = async () => {
    if (!form.fullName.trim()) return setError('Full name is required')
    if (!form.phone.trim()) return setError('Phone number is required')
    if (role === 'owner' && !form.propertyAddress.trim()) return setError('Property address is required')
    if (role === 'owner' && !form.totalSlots) return setError('Total parking slots is required')
    if (role === 'driver' && !form.vehicleReg.trim()) return setError('Vehicle registration is required')
    setError('')
    setSubmitting(true)
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user?.clerkId,
          role,
          profileComplete: true,
          fullName: form.fullName,
          phone: form.phone,
          ...(role === 'owner' ? {
            propertyType: form.propertyType,
            totalSlots: Number(form.totalSlots),
            propertyAddress: form.propertyAddress,
            area: form.area,
            gst: form.gst,
          } : {
            vehicleReg: form.vehicleReg.toUpperCase(),
            vehicleType: form.vehicleType,
            preferredAreas: form.preferredAreas,
          }),
        }),
      })
      onComplete()
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const Field = ({ label, fieldKey, placeholder, type = 'text', optional = false }) => (
    <div>
      <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
        {label} {optional && <span style={{ color: C.dim, fontWeight: 400, textTransform: 'none' }}>(optional)</span>}
      </label>
      <input type={type} value={form[fieldKey]} onChange={e => set(fieldKey, e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => (e.target.style.borderColor = role === 'owner' ? C.green : C.teal)}
        onBlur={e => (e.target.style.borderColor = C.border)} />
    </div>
  )

  const accent = role === 'owner' ? C.green : C.teal

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{role === 'owner' ? '🏗️' : '🚗'}</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: C.text, marginBottom: 8 }}>Complete Your Profile</h1>
          <p style={{ color: C.muted, fontSize: 15 }}>Just a few details to set up your <strong style={{ color: accent }}>{role === 'owner' ? 'Land Owner' : 'Vehicle Owner'}</strong> account</p>
        </div>

        <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 32, boxShadow: '0 8px 40px rgba(22,163,74,0.08)' }}>

          {/* ── Personal Info (common) ── */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: accent, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>1</span>
              Personal Info
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Full Name" fieldKey="fullName" placeholder={role === 'owner' ? 'Rajesh Kumar' : 'Arjun Sharma'} />
              <Field label="Phone Number" fieldKey="phone" placeholder="+91 98765 43210" type="tel" />
            </div>
          </div>

          {/* ── Land Owner specific ── */}
          {role === 'owner' && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: accent, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>2</span>
                Property Details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Property Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[['open', '☀️ Open Air'], ['covered', '🏛️ Covered'], ['basement', '🏗️ Basement'], ['multilevel', '🏹 Multi-level']].map(([val, label]) => (
                      <div key={val} onClick={() => set('propertyType', val)}
                        style={{ padding: '10px 8px', borderRadius: 10, border: `1.5px solid ${form.propertyType === val ? C.green + '66' : C.border}`, background: form.propertyType === val ? C.green + '14' : C.surface, color: form.propertyType === val ? C.green : C.muted, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Total Parking Slots" fieldKey="totalSlots" placeholder="14" type="number" />
                  <div>
                    <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Chennai Area</label>
                    <select value={form.area} onChange={e => set('area', e.target.value)}
                      style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none' }}>
                      {chennaAreas.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Full Property Address</label>
                  <textarea value={form.propertyAddress} onChange={e => set('propertyAddress', e.target.value)}
                    placeholder="15, Usman Road, T Nagar, Chennai – 600017"
                    style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14, outline: 'none', resize: 'vertical', minHeight: 80, fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = C.green)}
                    onBlur={e => (e.target.style.borderColor = C.border)} />
                </div>
                <Field label="GST Number" fieldKey="gst" placeholder="22AAAAA0000A1Z5" optional />
              </div>
            </div>
          )}

          {/* ── Vehicle Owner specific ── */}
          {role === 'driver' && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: accent, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>2</span>
                Vehicle Details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="Vehicle Registration Number" fieldKey="vehicleReg" placeholder="TN 09 AB 1234" />
                <div>
                  <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Vehicle Type</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[['2-wheeler', '🛵 2-Wheeler'], ['3-wheeler', '🛺 3-Wheeler'], ['4-wheeler', '🚗 4-Wheeler']].map(([val, label]) => (
                      <div key={val} onClick={() => set('vehicleType', val)}
                        style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: `1.5px solid ${form.vehicleType === val ? C.teal + '66' : C.border}`, background: form.vehicleType === val ? C.tealGlow : C.surface, color: form.vehicleType === val ? C.teal : C.muted, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Preferred Parking Areas <span style={{ color: C.dim, fontWeight: 400, textTransform: 'none' }}>(select all that apply)</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {chennaAreas.map(area => {
                      const active = form.preferredAreas.includes(area)
                      return (
                        <div key={area} onClick={() => toggleArea(area)}
                          style={{ padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${active ? C.teal + '66' : C.border}`, background: active ? C.tealGlow : 'transparent', color: active ? C.teal : C.muted, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                          {active ? '✓ ' : ''}{area}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 16px', color: '#DC2626', fontSize: 14, marginBottom: 16 }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <Btn variant="primary" size="lg"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ width: '100%', justifyContent: 'center', background: accent, marginTop: 4 }}>
            {submitting ? 'Saving...' : `Complete Setup & Go to Dashboard →`}
          </Btn>
          <p style={{ textAlign: 'center', fontSize: 12, color: C.dim, marginTop: 12 }}>
            🔒 Your data is encrypted and never shared with third parties
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── SIGNUP PAGE ────────────────────────────────────────────────────────
export function SignupPage({ setPage }) {
  const { isSignedIn } = useUser()
  const [role, setRole] = useState(null)

  // Prevent signed-in users from seeing signup
  if (isSignedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: C.text, marginBottom: 8 }}>You're already signed in!</h2>
          <p style={{ color: C.muted, marginBottom: 24 }}>Head to your dashboard to manage your account.</p>
          <Btn variant="primary" onClick={() => setPage('owner-dashboard')}>Go to Dashboard</Btn>
        </div>
      </div>
    )
  }

  const handleRoleSelect = (selectedRole) => {
    localStorage.setItem('parkease_pending_role', selectedRole)
    setRole(selectedRole)
  }

  if (!role) return <RoleSelection onSelect={handleRoleSelect} setPage={setPage} />

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.amberGlow}, transparent)`, pointerEvents: 'none' }} />
      <button onClick={() => setRole(null)}
        style={{ background: 'none', border: 'none', color: C.muted, fontSize: 14, cursor: 'pointer', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        ← Back to role selection
      </button>
      <SignUp routing="hash" afterSignUpUrl="/" signInUrl="#login" appearance={clerkAppearance} />
    </div>
  )
}

// ─── LOGIN PAGE ────────────────────────────────────────────────────────
export function LoginPage({ setPage }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.amberGlow}, transparent)`, pointerEvents: 'none' }} />
      <SignIn routing="hash" afterSignInUrl="/" signUpUrl="#signup" appearance={clerkAppearance} />
    </div>
  )
}
