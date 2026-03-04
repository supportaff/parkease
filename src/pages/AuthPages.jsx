import { useState } from 'react'
import { C } from '../constants'
import { Btn, Badge, Input, Divider } from '../components/ui'

// ─── SIGNUP ──────────────────────────────────────────────────────────
export function SignupPage({ setPage, setUser }) {
  const [step, setStep] = useState('choose')
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', vehicleNo: '', vehicleType: '', model: '' })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [docFile, setDocFile] = useState(null)

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 50% 60% at 50% 30%, ${C.amberGlow}, transparent)` }} />

      <div style={{ maxWidth: 500, margin: '0 auto', width: '100%', position: 'relative' }}>

        {/* Choose role */}
        {step === 'choose' && (
          <div className="fade-up">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>👋</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
                Who are you?
              </h1>
              <p style={{ color: C.muted, fontSize: 17 }}>Choose your role to get started on ParkEase</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { type: 'owner', icon: '🏗️', title: 'Land Owner', desc: 'I want to rent out my parking space and earn money' },
                { type: 'driver', icon: '🚗', title: 'Vehicle Owner', desc: "I'm looking for a safe, affordable parking spot" },
              ].map(r => (
                <div
                  key={r.type}
                  onClick={() => setStep(r.type)}
                  className="hover-lift"
                  style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: 28, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.amber)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ fontSize: 48, marginBottom: 14 }}>{r.icon}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{r.title}</div>
                  <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 28, color: C.muted, fontSize: 15 }}>
              Already have an account?{' '}
              <span onClick={() => setPage('login')} style={{ color: C.amber, cursor: 'pointer', fontWeight: 600 }}>Log in</span>
            </p>
          </div>
        )}

        {/* Vehicle Owner */}
        {step === 'driver' && (
          <div className="fade-up">
            <button onClick={() => setStep('choose')} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>← Back</button>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 30, marginBottom: 8 }}>
              Vehicle Owner <span style={{ color: C.amber }}>Sign Up</span>
            </h2>
            <p style={{ color: C.muted, marginBottom: 28, fontSize: 16 }}>Quick setup — just your details & vehicle info.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Input label="Full Name" value={form.name} onChange={set('name')} placeholder="Rahul Sharma" icon="👤" />
              <Input label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="rahul@email.com" icon="✉️" />
              <div>
                <label style={{ fontSize: 13, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Phone Number</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210"
                    style={{ flex: 1, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', color: C.text, fontSize: 15, outline: 'none' }}
                    onFocus={e => (e.target.style.borderColor = C.amber)}
                    onBlur={e => (e.target.style.borderColor = C.border)} />
                  <Btn variant="outline" size="sm" onClick={() => setOtpSent(true)}>{otpSent ? '✓ Sent' : 'Send OTP'}</Btn>
                </div>
              </div>
              {otpSent && <Input label="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" icon="🔐" />}
              <Divider />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.06em' }}>VEHICLE DETAILS</p>
              <Input label="Vehicle Number" value={form.vehicleNo} onChange={set('vehicleNo')} placeholder="KA 01 AB 1234" icon="🔖" />
              <div>
                <label style={{ fontSize: 13, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Vehicle Type</label>
                <select value={form.vehicleType} onChange={set('vehicleType')}
                  style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', color: form.vehicleType ? C.text : C.dim, fontSize: 15, outline: 'none', cursor: 'pointer' }}>
                  <option value="">Select vehicle type</option>
                  <option value="2w">🛵 2-Wheeler</option>
                  <option value="3w">🛺 3-Wheeler</option>
                  <option value="4w">🚗 4-Wheeler</option>
                </select>
              </div>
              <Input label="Vehicle Model" value={form.model} onChange={set('model')} placeholder="Honda Activa / Maruti Swift" icon="🚘" />
              <Btn variant="primary" size="lg"
                onClick={() => { setUser({ type: 'driver', name: form.name || 'Rahul', email: form.email }); setPage('search') }}
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                Create Account & Find Parking →
              </Btn>
            </div>
          </div>
        )}

        {/* Land Owner */}
        {step === 'owner' && (
          <div className="fade-up">
            <button onClick={() => setStep('choose')} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>← Back</button>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 30, marginBottom: 8 }}>
              Land Owner <span style={{ color: C.amber }}>Sign Up</span>
            </h2>
            <p style={{ color: C.muted, marginBottom: 28, fontSize: 16 }}>Verify your identity to start listing.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Input label="Full Name" value={form.name} onChange={set('name')} placeholder="Priya Nair" icon="👤" />
              <Input label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="priya@email.com" icon="✉️" />
              <Input label="Full Address" value={form.address} onChange={set('address')} placeholder="123, 5th Cross, Koramangala..." icon="🏠" />
              <div>
                <label style={{ fontSize: 13, color: C.muted, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Phone Number</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210"
                    style={{ flex: 1, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', color: C.text, fontSize: 15, outline: 'none' }}
                    onFocus={e => (e.target.style.borderColor = C.amber)}
                    onBlur={e => (e.target.style.borderColor = C.border)} />
                  <Btn variant="outline" size="sm" onClick={() => setOtpSent(true)}>{otpSent ? '✓ Sent' : 'Send OTP'}</Btn>
                </div>
              </div>
              {otpSent && <Input label="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" icon="🔐" />}
              <Divider />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: '0.06em' }}>OWNERSHIP PROOF</p>
              <p style={{ fontSize: 14, color: C.dim }}>Upload any one: Land deed, property tax receipt, rental authorization letter, or Govt. ID proof.</p>
              <div
                style={{ border: `2px dashed ${docFile ? C.green : C.border}`, borderRadius: 14, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: docFile ? C.green + '11' : 'transparent' }}
                onClick={() => setDocFile('document.pdf')}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{docFile ? '✅' : '📄'}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: docFile ? C.green : C.text, fontSize: 14 }}>
                  {docFile ? 'document.pdf uploaded' : 'Click to upload PDF or Image'}
                </div>
                <div style={{ fontSize: 13, color: C.dim, marginTop: 4 }}>PDF, JPG or PNG • Max 10MB</div>
              </div>
              <div style={{ padding: '14px 18px', background: C.amberGlow, border: `1px solid ${C.amber}44`, borderRadius: 12, fontSize: 14, color: C.muted }}>
                ⏳ Documents are reviewed within <strong style={{ color: C.amber }}>24–48 hours</strong>. Your listing goes live after approval.
              </div>
              <Btn variant="primary" size="lg"
                onClick={() => { setUser({ type: 'owner', name: form.name || 'Priya Nair', email: form.email }); setPage('owner-dashboard') }}
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                Submit & Continue →
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────
export function LoginPage({ setPage, setUser }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = () => {
    if (email.includes('admin')) { setUser({ type: 'admin', name: 'Admin' }); setPage('admin') }
    else if (email.includes('owner')) { setUser({ type: 'owner', name: 'Priya Nair' }); setPage('owner-dashboard') }
    else { setUser({ type: 'driver', name: 'Rahul' }); setPage('search') }
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 50% 60% at 50% 30%, ${C.tealGlow}, transparent)` }} />
      <div style={{ maxWidth: 420, margin: '0 auto', width: '100%', position: 'relative' }} className="fade-up">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🔑</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>Welcome back</h1>
          <p style={{ color: C.muted, marginTop: 8, fontSize: 16 }}>Log in to your ParkEase account</p>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" icon="✉️" />
            <Input label="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" icon="🔒" />
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 14, color: C.amber, cursor: 'pointer' }}>Forgot password?</span>
            </div>
            <Btn variant="primary" size="lg" onClick={handleLogin} style={{ width: '100%', justifyContent: 'center' }}>Log In</Btn>
            <Divider />
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ icon: '📱', label: 'OTP Login' }, { icon: '🔵', label: 'Google' }].map(m => (
                <button key={m.label}
                  style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, color: C.text, cursor: 'pointer', fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 600, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.target.style.borderColor = C.amber)}
                  onMouseLeave={e => (e.target.style.borderColor = C.border)}>
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, color: C.muted, fontSize: 15 }}>
          New to ParkEase?{' '}
          <span onClick={() => setPage('signup')} style={{ color: C.amber, cursor: 'pointer', fontWeight: 600 }}>Create account</span>
        </p>
        <p style={{ textAlign: 'center', marginTop: 8, color: C.dim, fontSize: 12 }}>
          Demo: use "admin@", "owner@", or any email to log in
        </p>
      </div>
    </div>
  )
}
