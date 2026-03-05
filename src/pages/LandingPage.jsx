import { useState, useRef, useEffect } from 'react'
import { C } from '../constants'
import { Btn, Badge, Stars } from '../components/ui'
import { useGoogleMaps } from '../hooks/useGoogleMaps'

const AREAS = ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Nungambakkam', 'OMR']

const TICKER = [
  '🟢 Verified parking spots across Chennai',
  '⚡ Instant booking confirmation',
  '📍 Google Maps navigation built-in',
  '🔒 Secured via Razorpay payments',
  '🚗 2-Wheeler · 3-Wheeler · 4-Wheeler supported',
  '📅 Hourly · Daily · Monthly booking plans',
  '🏗️ List your space, earn from every booking',
  '🌐 Chennai-first — built for local roads & areas',
  '📹 CCTV · Covered · EV Charging spots available',
  '🏷️ No paperwork — 100% digital booking',
]

export default function LandingPage({ setPage }) {
  const [searchCity, setSearchCity] = useState('')
  const searchInputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const { loaded: mapsLoaded } = useGoogleMaps()

  useEffect(() => {
    if (!mapsLoaded || !searchInputRef.current || autocompleteRef.current) return
    autocompleteRef.current = new window.google.maps.places.Autocomplete(searchInputRef.current, {
      componentRestrictions: { country: 'in' },
      bounds: new window.google.maps.LatLngBounds({ lat: 12.7, lng: 79.8 }, { lat: 13.4, lng: 80.6 }),
      strictBounds: false,
      types: ['geocode', 'establishment'],
    })
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace()
      if (place?.name || place?.formatted_address) setSearchCity(place.formatted_address || place.name)
      setPage('search')
    })
    return () => {
      if (autocompleteRef.current && window.google?.maps?.event)
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      document.querySelectorAll('.pac-container').forEach(el => el.remove())
    }
  }, [mapsLoaded])

  return (
    <div style={{ paddingTop: 64, background: C.bg }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '60px 24px' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.amberGlow}, transparent), radial-gradient(ellipse 50% 70% at 10% 80%, ${C.tealGlow}, transparent)` }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: `linear-gradient(${C.amber} 1px, transparent 1px), linear-gradient(90deg, ${C.amber} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative' }}>
          <div className="pe-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Left column */}
            <div>
              <div className="fade-up" style={{ marginBottom: 20 }}>
                <Badge color={C.teal}>📍 Chennai’s Parking Marketplace</Badge>
              </div>
              <h1 className="fade-up-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: C.text, marginBottom: 20 }}>
                Your city. Your spot.<br />
                <span style={{ color: C.amber }}>Zero hassle.</span>
              </h1>
              <p className="fade-up-2" style={{ fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 36, maxWidth: 480, fontWeight: 400 }}>
                ParkEase connects land owners with vehicle owners across Chennai.
                Find verified parking in T Nagar, Anna Nagar, Adyar, OMR and more —
                or earn steady income by listing your unused space.
              </p>
              <div className="fade-up-3" style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 20, display: 'flex', gap: 12, alignItems: 'flex-end', boxShadow: '0 8px 40px rgba(22,163,74,0.10)' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.08em', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                    📍 Where do you need parking?
                  </label>
                  <input
                    ref={searchInputRef}
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                    placeholder={mapsLoaded ? 'Type any area in Chennai...' : 'T Nagar, Anna Nagar, Adyar...'}
                    style={{ width: '100%', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', color: C.text, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = C.amber)}
                    onBlur={e => (e.target.style.borderColor = C.border)}
                    onKeyDown={e => e.key === 'Enter' && setPage('search')}
                  />
                </div>
                <Btn variant="primary" size="lg" onClick={() => setPage('search')} style={{ whiteSpace: 'nowrap' }}>🔍 Find Parking</Btn>
              </div>
              <div className="fade-up-4" style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: C.dim, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>Popular:</span>
                {AREAS.map(c => (
                  <span key={c} onClick={() => { setSearchCity(c + ', Chennai'); setPage('search') }}
                    style={{ fontSize: 13, color: C.muted, cursor: 'pointer', padding: '4px 14px', borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber; e.currentTarget.style.background = C.amberGlow }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.background = C.surface }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="pe-hero-visual" style={{ position: 'relative' }}>
              <div className="float" style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(22,163,74,0.15)' }}>
                <div style={{ height: 300, background: 'linear-gradient(135deg, #E8F5EE, #F0FAF4)', position: 'relative', overflow: 'hidden' }}>
                  {[30, 60, 90, 130, 170].map(y => <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 1, background: C.border }} />)}
                  {[50, 120, 200, 280, 360].map(x => <div key={x} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 1, background: C.border }} />)}
                  {[{ x: 80, y: 60 }, { x: 200, y: 110 }, { x: 300, y: 55 }, { x: 150, y: 200 }].map((p, i) => (
                    <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)' }}>
                      <div style={{ position: 'absolute', width: 28, height: 28, borderRadius: '50%', border: `2px solid ${i === 1 ? C.amber : C.teal}`, animation: 'pulse-ring 1.8s infinite', animationDelay: `${i * 0.4}s`, left: -4, top: -4 }} />
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 1 ? C.amber : C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>P</div>
                    </div>
                  ))}
                  <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: 'rgba(255,255,255,0.92)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(10px)', border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 12, color: C.muted }}>Showing results near</div>
                    <div style={{ fontSize: 15, color: C.text, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>T Nagar, Chennai</div>
                  </div>
                </div>
                <div style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: C.amberGlow, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🏢</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text }}>T Nagar Secure Parking</div>
                    <div style={{ fontSize: 13, color: C.muted }}>0.3 km away • 4 slots left</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: C.amber, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 17 }}>₹50/hr</div>
                    <Stars rating={4.8} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: -16, right: -16, background: '#fff', border: `1px solid ${C.green}44`, borderRadius: 12, padding: '10px 16px', boxShadow: '0 4px 20px rgba(5,150,105,0.15)' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: C.green, fontSize: 18 }}>₹50/hr</div>
                <div style={{ fontSize: 11, color: C.dim }}>Best nearby</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ overflow: 'hidden', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, padding: '13px 0' }}>
        <div style={{ display: 'flex', animation: 'ticker 28s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ padding: '0 36px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: i % 2 === 0 ? C.amber : C.muted }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS — DUAL (Driver + Owner) ── */}
      <section style={{ padding: '88px 24px', background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Badge color={C.teal}>How ParkEase Works</Badge>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 16, marginBottom: 12, color: C.text }}>
              Built for <span style={{ color: C.amber }}>Both Sides</span>
            </h2>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, margin: '0 auto' }}>Whether you’re looking for a spot or listing one, ParkEase makes the process simple and transparent.</p>
          </div>

          <div className="pe-dual-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>

            {/* Vehicle Owner card */}
            <div style={{ background: C.card, border: `2px solid ${C.teal}33`, borderRadius: 24, padding: 32, boxShadow: '0 4px 24px rgba(13,148,136,0.08)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: C.tealGlow, border: `1.5px solid ${C.teal}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>🚗</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 21, color: C.text, marginBottom: 6 }}>I Need Parking</div>
              <div style={{ fontSize: 14, color: C.muted, marginBottom: 28, lineHeight: 1.6 }}>Find a verified spot near you and book it in under a minute — no phone calls, no paperwork.</div>
              {[
                { n: '01', t: 'Search your area', d: 'Type any area in Chennai or tap “Near Me” to see all available verified parking spots on a live Google Map.' },
                { n: '02', t: 'Compare & choose', d: 'See slot availability, pricing, amenities (CCTV, covered, EV charging), distance, and user ratings side by side.' },
                { n: '03', t: 'Book your plan', d: 'Pick hourly, daily, or monthly. Pay instantly and securely via UPI, card, or net banking — powered by Razorpay.' },
                { n: '04', t: 'Navigate & park', d: 'Get Google Maps directions to your exact slot. Show your digital Booking ID at the entry. Done.' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.tealGlow, border: `1.5px solid ${C.teal}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.teal, flexShrink: 0 }}>{s.n}</div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3 }}>{s.t}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{s.d}</div>
                  </div>
                </div>
              ))}
              <Btn variant="teal" size="md" onClick={() => setPage('search')} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Find Parking Now →</Btn>
            </div>

            {/* Land Owner card */}
            <div style={{ background: C.card, border: `2px solid ${C.amber}33`, borderRadius: 24, padding: 32, boxShadow: '0 4px 24px rgba(22,163,74,0.08)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: C.amberGlow, border: `1.5px solid ${C.amber}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>🏗️</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 21, color: C.text, marginBottom: 6 }}>I Have a Space</div>
              <div style={{ fontSize: 14, color: C.muted, marginBottom: 28, lineHeight: 1.6 }}>Turn your unused land, garage, or compound into a regular income source — completely free to list.</div>
              {[
                { n: '01', t: 'Create your listing', d: 'Add your parking space details: address, photos, total slot count, accepted vehicle types, and your pricing.' },
                { n: '02', t: 'Set availability & prices', d: 'Define hourly, daily, and monthly rates separately. Control which days and times your space is available.' },
                { n: '03', t: 'Receive driver bookings', d: 'Drivers find and book your space through the app. You get notified for every new booking with full driver details.' },
                { n: '04', t: 'Earn & get paid', d: 'Earnings accumulate in your ParkEase wallet. Request a bank transfer payout at any time from your dashboard.' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.amberGlow, border: `1.5px solid ${C.amber}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.amber, flexShrink: 0 }}>{s.n}</div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3 }}>{s.t}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{s.d}</div>
                  </div>
                </div>
              ))}
              <Btn variant="primary" size="md" onClick={() => setPage('signup')} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>List Your Space →</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PARKEASE ── */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Badge color={C.green}>Why ParkEase</Badge>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 16, marginBottom: 12, color: C.text }}>
              Parking, <span style={{ color: C.amber }}>Done Right</span>
            </h2>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 500, margin: '0 auto' }}>No surprise fees. No unreliable listings. Just transparent, real-time parking that works.</p>
          </div>
          <div className="pe-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: '🗺️', title: 'Live Google Maps', desc: 'Every listing is pinned on a real Google Map. Navigate directly to your exact slot with one tap — no guessing.' },
              { icon: '✅', title: 'Verified Listings', desc: 'Each parking space is manually reviewed before going live on the platform. No fake or outdated listings.' },
              { icon: '⚡', title: 'Instant Confirmation', desc: 'Your booking is confirmed the moment you pay. A unique digital Booking ID is generated immediately.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'The price you see is the price you pay. A 12% service charge is clearly shown before checkout — no hidden fees.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'All transactions use Razorpay with 256-bit SSL encryption. UPI, debit/credit cards, and net banking supported.' },
              { icon: '🏙️', title: 'Chennai-First', desc: 'Designed specifically for Chennai roads, areas, and parking culture — with local support and local listings.' },
            ].map(f => (
              <div key={f.title} className="hover-lift" style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: '28px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR VEHICLE OWNERS ── */}
      <section style={{ padding: '88px 24px', background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pe-owner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <Badge color={C.teal}>For Vehicle Owners</Badge>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em', margin: '16px 0 20px', color: C.text }}>
                Every parking problem<br /><span style={{ color: C.amber }}>in Chennai, solved.</span>
              </h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 28 }}>
                Whether you’re a daily commuter, weekend shopper, or working at an IT park — ParkEase gives you
                guaranteed parking without the daily stress of driving in circles.
              </p>
              {[
                '🛵  2-wheelers, 3-wheelers, and 4-wheelers all supported',
                '📅  Book for as little as 1 hour or commit to the full month',
                '🎯  Filter by distance, price, amenities, and slot availability',
                '📱  Fully digital — no phone calls or physical tickets needed',
                '🔔  Get notified when a spot opens up in your favourite area',
                '⭐  Rate and review every spot you’ve parked at',
              ].map((item, i) => (
                <div key={i} style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 10, paddingLeft: 4 }}>{item}</div>
              ))}
              <Btn variant="teal" size="lg" onClick={() => setPage('search')} style={{ marginTop: 28 }}>Find Parking Near You →</Btn>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: '⏱️', label: 'Hourly Parking', desc: 'Pay only for the time you use. Perfect for quick errands, shopping, or short meetings.' },
                { icon: '📅', label: 'Daily Parking', desc: 'Full-day access at a fixed rate. Ideal for office commuters and long-duration visits.' },
                { icon: '📆', label: 'Monthly Pass', desc: 'A dedicated slot reserved for you every day. Best value for regular daily parkers.' },
                { icon: '📸', label: 'CCTV & Security', desc: 'Filter for spots with verified CCTV, security guards, and gated entry for peace of mind.' },
              ].map(f => (
                <div key={f.label} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: '20px 18px' }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR LAND OWNERS ── */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pe-owner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🅿️', t: 'Any size space works', d: 'Have a single garage slot or an open plot? Both are welcome. You decide how many slots to list and what types of vehicles to accept.' },
                { icon: '💵', t: 'You set your own price', d: 'Define separate hourly, daily, and monthly rates. You can update your pricing anytime directly from your dashboard.' },
                { icon: '📊', t: 'Real-time earnings dashboard', d: 'Track every booking, see which slots are occupied, and monitor your monthly revenue — all from one clean dashboard.' },
                { icon: '🏦', t: 'Bank payouts on request', d: 'Your earnings sit in your ParkEase wallet. Request a transfer to your registered bank account whenever you want.' },
                { icon: '🛡️', t: 'You control who parks', d: 'Choose to auto-approve bookings or review each one manually. Your space, your rules.' },
              ].map(f => (
                <div key={f.t} style={{ display: 'flex', gap: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 20px' }}>
                  <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{f.t}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Badge color={C.green}>For Land Owners</Badge>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em', margin: '16px 0 20px', color: C.text }}>
                Idle land in Chennai?<br /><span style={{ color: C.amber }}>Start earning from it.</span>
              </h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>
                Thousands of drivers in Chennai search for safe, nearby parking every single day.
                If you have unused land, a garage, or even a portion of your compound — you can
                start earning from it without any upfront investment.
              </p>
              <div style={{ background: C.amberGlow, border: `1.5px solid ${C.amber}44`, borderRadius: 16, padding: '18px 22px', marginBottom: 28 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.amber, marginBottom: 6 }}>Platform fee structure</div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
                  ParkEase takes a <strong style={{ color: C.text }}>12% service fee</strong> per booking. The rest is yours.
                  Listing your space is completely free — you only pay when you earn.
                </p>
              </div>
              <Btn variant="primary" size="lg" onClick={() => setPage('signup')} style={{ width: '100%', justifyContent: 'center' }}>List Your Space for Free →</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.2)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", margin: '0 auto 24px' }}>P</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 36, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>Ready to get started?</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 36, lineHeight: 1.65 }}>Whether you need parking today or want to earn from your space — ParkEase is where you start.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('search')} style={{ padding: '14px 32px', background: '#fff', color: C.amber, borderRadius: 12, border: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Find Parking →</button>
            <button onClick={() => setPage('signup')} style={{ padding: '14px 32px', background: 'transparent', color: '#fff', borderRadius: 12, border: '2px solid rgba(255,255,255,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>List Your Space</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '48px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pe-footer-grid" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 40 }}>
            <div style={{ minWidth: 200 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 6, color: C.text }}>Park<span style={{ color: C.amber }}>Ease</span></div>
              <div style={{ color: C.dim, fontSize: 13, marginBottom: 10 }}>Chennai’s Parking Marketplace</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Connecting drivers with verified parking spaces across Chennai.</div>
            </div>
            <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.text, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>For Drivers</div>
                {[['Find Parking', 'search'], ['How It Works', 'landing'], ['Popular Areas', 'search']].map(([l, pg]) => (
                  <div key={l} onClick={() => setPage(pg)} style={{ color: C.muted, fontSize: 14, cursor: 'pointer', marginBottom: 10 }} onMouseEnter={e => (e.target.style.color = C.amber)} onMouseLeave={e => (e.target.style.color = C.muted)}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.text, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>For Owners</div>
                {[['List Your Space', 'signup'], ['Dashboard', 'owner-dashboard'], ['Pricing & Fees', 'landing']].map(([l, pg]) => (
                  <div key={l} onClick={() => setPage(pg)} style={{ color: C.muted, fontSize: 14, cursor: 'pointer', marginBottom: 10 }} onMouseEnter={e => (e.target.style.color = C.amber)} onMouseLeave={e => (e.target.style.color = C.muted)}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.text, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Company</div>
                {[['Privacy Policy', 'privacy'], ['Terms & Conditions', 'terms'], ['Contact Us', 'landing']].map(([l, pg]) => (
                  <div key={l} onClick={() => setPage(pg)} style={{ color: C.muted, fontSize: 14, cursor: 'pointer', marginBottom: 10 }} onMouseEnter={e => (e.target.style.color = C.amber)} onMouseLeave={e => (e.target.style.color = C.muted)}>{l}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ color: C.dim, fontSize: 13 }}>© 2026 ParkEase Technologies Pvt. Ltd. · Made with ❤️ in Chennai</div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['Privacy Policy', 'privacy'], ['Terms', 'terms']].map(([l, pg]) => (
                <span key={l} onClick={() => setPage(pg)} style={{ color: C.dim, fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }} onMouseEnter={e => (e.target.style.color = C.amber)} onMouseLeave={e => (e.target.style.color = C.dim)}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
