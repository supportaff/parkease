import { useState } from 'react'
import { C } from '../constants'
import { Btn, Badge, Stars } from '../components/ui'

export default function LandingPage({ setPage }) {
  const [searchCity, setSearchCity] = useState('')

  const stats = [
    { val: '50,000+', label: 'Parking Slots' },
    { val: '120+', label: 'Cities' },
    { val: '2.4L+', label: 'Happy Drivers' },
    { val: '₹18 Cr+', label: 'Owner Earnings' },
  ]

  const steps = [
    { icon: '🔍', title: 'Search by Location', desc: 'Enter your city or drop a pin. Instantly see all nearby parking spaces.' },
    { icon: '🅿️', title: 'Pick Your Spot', desc: 'Compare prices, amenities, and photos. Choose what fits best.' },
    { icon: '💳', title: 'Book & Pay', desc: 'Secure booking in seconds. Pay via UPI, debit or credit card.' },
    { icon: '🚗', title: 'Drive In', desc: 'Get confirmation, drive to your spot, and park with zero stress.' },
  ]

  const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune']

  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '60px 24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.amberGlow}, transparent),
                         radial-gradient(ellipse 50% 70% at 10% 80%, ${C.tealGlow}, transparent)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: `linear-gradient(${C.amber} 1px, transparent 1px), linear-gradient(90deg, ${C.amber} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div className="fade-up" style={{ marginBottom: 20 }}>
                <Badge color={C.teal}>🇮🇳 India's Parking Marketplace</Badge>
              </div>
              <h1
                className="fade-up-1"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(40px, 5vw, 62px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: 20,
                }}
              >
                Your city. Your spot.
                <br />
                <span style={{ color: C.amber }}>Zero hassle.</span>
              </h1>
              <p
                className="fade-up-2"
                style={{ fontSize: 18, color: C.muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}
              >
                ParkEase connects land owners with vehicle owners across India. Find verified parking for
                2-wheelers, 3-wheelers, and 4-wheelers — or earn by renting your unused land.
              </p>

              {/* Search box */}
              <div
                className="fade-up-3"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: 20,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-end',
                  boxShadow: '0 20px 60px #00000060',
                }}
              >
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    📍 WHERE DO YOU NEED PARKING?
                  </label>
                  <input
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                    placeholder="Koramangala, Bengaluru..."
                    style={{
                      width: '100%',
                      background: C.surface,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                      color: C.text,
                      fontSize: 16,
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = C.amber)}
                    onBlur={e => (e.target.style.borderColor = C.border)}
                  />
                </div>
                <Btn variant="primary" size="lg" onClick={() => setPage('search')}>
                  🔍 Find Parking
                </Btn>
              </div>

              {/* Popular cities */}
              <div className="fade-up-4" style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 13, color: C.dim, fontFamily: "'Syne', sans-serif" }}>Popular:</span>
                {cities.map(c => (
                  <span
                    key={c}
                    onClick={() => setPage('search')}
                    style={{
                      fontSize: 13,
                      color: C.muted,
                      cursor: 'pointer',
                      padding: '4px 12px',
                      borderRadius: 20,
                      border: `1px solid ${C.border}`,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = C.amber; e.target.style.color = C.amber }}
                    onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.muted }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div style={{ position: 'relative' }}>
              <div
                className="float"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 30px 80px #00000080',
                }}
              >
                {/* Map mockup */}
                <div
                  style={{
                    height: 300,
                    background: 'linear-gradient(135deg, #0D2137, #0A1A2E)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {[30, 60, 90, 130, 170].map(y => (
                    <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 1, background: C.border }} />
                  ))}
                  {[50, 120, 200, 280, 360].map(x => (
                    <div key={x} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 1, background: C.border }} />
                  ))}
                  {[{ x: 80, y: 60 }, { x: 200, y: 110 }, { x: 300, y: 55 }, { x: 150, y: 200 }].map((p, i) => (
                    <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)' }}>
                      <div
                        style={{
                          position: 'absolute',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          border: `2px solid ${i === 1 ? C.amber : C.teal}`,
                          animation: 'pulse-ring 1.8s infinite',
                          animationDelay: `${i * 0.4}s`,
                          left: -4,
                          top: -4,
                        }}
                      />
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: i === 1 ? C.amber : C.teal,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#0A0F1A',
                          fontFamily: "'Syne', sans-serif",
                        }}
                      >
                        P
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      right: 12,
                      background: 'rgba(6,13,26,0.85)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <div style={{ fontSize: 12, color: C.muted }}>Showing results near</div>
                    <div style={{ fontSize: 15, color: C.text, fontWeight: 600 }}>Koramangala, Bengaluru</div>
                  </div>
                </div>
                {/* Card preview */}
                <div style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: C.amberGlow,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 26,
                    }}
                  >
                    🏢
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>
                      Koramangala Secure Lot
                    </div>
                    <div style={{ fontSize: 13, color: C.muted }}>0.4 km away • 4 slots left</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: C.amber, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17 }}>
                      ₹60/hr
                    </div>
                    <Stars rating={4.8} />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div
                style={{
                  position: 'absolute',
                  top: -16,
                  right: -16,
                  background: C.green + '22',
                  border: `1px solid ${C.green}44`,
                  borderRadius: 12,
                  padding: '10px 16px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: C.green, fontSize: 18 }}>
                  ₹60/hr
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>Best nearby</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div
        style={{
          overflow: 'hidden',
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
          padding: '14px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 60,
            animation: 'ticker 18s linear infinite',
            whiteSpace: 'nowrap',
            width: '200%',
          }}
        >
          {[...Array(2)].fill(null).map((_, rep) =>
            [
              '🅿️ 50,000+ Parking Slots',
              '🌆 120 Cities',
              '⭐ 4.8 Average Rating',
              '💰 Earn up to ₹80,000/month',
              '🔒 Verified Listings Only',
              '⚡ EV Charging Available',
              '🛵 2-Wheeler Friendly',
              '🚗 4-Wheeler Spots',
            ].map((t, i) => (
              <span
                key={`${rep}-${i}`}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: i % 2 === 0 ? C.amber : C.muted,
                  flexShrink: 0,
                }}
              >
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="hover-lift"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '30px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: C.amber, marginBottom: 6 }}>
                {s.val}
              </div>
              <div style={{ color: C.muted, fontSize: 15 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px', background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Badge color={C.teal}>How It Works</Badge>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginTop: 16,
                marginBottom: 12,
              }}
            >
              Park in <span style={{ color: C.amber }}>4 simple steps</span>
            </h2>
            <p style={{ color: C.muted, fontSize: 17 }}>From search to parked in under 60 seconds.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                className="hover-lift"
                style={{
                  background: C.card,
                  borderRadius: 16,
                  border: `1px solid ${C.border}`,
                  padding: '32px 24px',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                    fontSize: 13,
                    color: C.dim,
                  }}
                >
                  0{i + 1}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR LAND OWNERS ── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <Badge color={C.green}>For Land Owners</Badge>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 40,
                  letterSpacing: '-0.02em',
                  margin: '16px 0 20px',
                }}
              >
                Unused land?
                <br />
                <span style={{ color: C.amber }}>Start earning today.</span>
              </h2>
              <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>
                Convert your vacant plot, terrace, or driveway into a steady income stream. We handle
                booking, payments, and security verification — you just collect earnings.
              </p>
              {[
                'Earn ₹5,000–₹80,000 per month',
                'Free listing for the first 3 months',
                'Secure payments directly to your bank',
                'Full control over your listing & availability',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: C.green + '22',
                      border: `1px solid ${C.green}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: C.green,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontSize: 16, color: C.text }}>{f}</span>
                </div>
              ))}
              <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
                <Btn variant="primary" size="lg" onClick={() => setPage('signup')}>List Your Space</Btn>
                <Btn variant="outline" size="lg" onClick={() => {}}>Learn More</Btn>
              </div>
            </div>

            {/* Earnings card */}
            <div
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: 28,
                boxShadow: '0 30px 80px #00000060',
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  marginBottom: 20,
                  color: C.muted,
                  fontSize: 13,
                  letterSpacing: '0.06em',
                }}
              >
                YOUR ESTIMATED EARNINGS
              </div>
              {[
                { label: '2-Wheeler Slot (×4)', rate: '₹15/hr', monthly: '₹12,600' },
                { label: '4-Wheeler Slot (×2)', rate: '₹60/hr', monthly: '₹25,200' },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{row.label}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{row.rate}</div>
                  </div>
                  <div style={{ color: C.green, fontWeight: 700, fontFamily: "'Syne', sans-serif", fontSize: 18 }}>
                    {row.monthly}/mo
                  </div>
                </div>
              ))}
              <div
                style={{
                  marginTop: 20,
                  padding: '16px 20px',
                  background: C.amberGlow,
                  border: `1px solid ${C.amber}44`,
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.amber }}>Total Monthly</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: C.amber }}>₹37,800</div>
              </div>
              <p style={{ fontSize: 12, color: C.dim, marginTop: 12, textAlign: 'center' }}>
                *Based on 70% occupancy. Actual earnings may vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '48px 24px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 6 }}>
              Park<span style={{ color: C.amber }}>Ease</span>
            </div>
            <div style={{ color: C.dim, fontSize: 14 }}>India's Trusted Parking Marketplace</div>
          </div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {['About', 'Blog', 'Careers', 'Support', 'Privacy', 'Terms'].map(l => (
              <span
                key={l}
                style={{ color: C.muted, fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target.style.color = C.amber)}
                onMouseLeave={e => (e.target.style.color = C.muted)}
              >
                {l}
              </span>
            ))}
          </div>
          <div style={{ color: C.dim, fontSize: 13 }}>© 2025 ParkEase Technologies Pvt. Ltd.</div>
        </div>
      </footer>
    </div>
  )
}
