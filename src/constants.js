// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────────
export const C = {
  bg: '#FFFFFF',
  surface: '#F6FBF8',
  card: '#FFFFFF',
  cardHover: '#EEF8F2',
  border: '#CEEADB',
  borderLight: '#E2F4EA',
  amber: '#16A34A',
  amberDark: '#15803D',
  amberGlow: '#16A34A18',
  teal: '#0D9488',
  tealGlow: '#0D948820',
  green: '#059669',
  red: '#DC2626',
  purple: '#7C3AED',
  text: '#0A1F14',
  muted: '#436B53',
  dim: '#7EA88E',
}

// ─── GLOBAL CSS ─────────────────────────────────────────────────────────────
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@600;700;800&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #FFFFFF; color: #0A1F14; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #F6FBF8; }
  ::-webkit-scrollbar-thumb { background: #16A34A55; border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.7); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .fade-up   { animation: fadeUp 0.6s ease both; }
  .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
  .float     { animation: float 3s ease-in-out infinite; }
  .hover-lift { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
  .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 40px #16A34A22; }
  input, select, textarea { font-family: 'Inter', sans-serif; }

  /* ── Google Places Autocomplete dropdown ── */
  .pac-container {
    background: #FFFFFF !important;
    border: 1.5px solid #CEEADB !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(22,163,74,0.14) !important;
    margin-top: 6px !important;
    padding: 4px 0 !important;
    font-family: 'Inter', sans-serif !important;
    z-index: 9999 !important;
    overflow: hidden !important;
  }
  .pac-container::after { display: none !important; }
  .pac-item {
    padding: 10px 16px !important;
    cursor: pointer !important;
    font-size: 14px !important;
    color: #0A1F14 !important;
    border-top: 1px solid #F0FAF4 !important;
    line-height: 1.5 !important;
  }
  .pac-item:first-child { border-top: none !important; }
  .pac-item:hover, .pac-item-selected { background: #F6FBF8 !important; }
  .pac-item-query { color: #16A34A !important; font-weight: 600 !important; font-size: 14px !important; }
  .pac-icon { display: none !important; }
  .pac-matched { color: #16A34A !important; font-weight: 700 !important; }

  /* ───────────────────────────────────────────────────────────
     RESPONSIVE LAYOUT
     All classNames are set on JSX wrappers; these rules
     override inline styles so the layout reflows on mobile.
     ─────────────────────────────────────────────────────────── */

  /* Tablet (<=1024px) */
  @media (max-width: 1024px) {
    .pe-hero-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
    .pe-hero-visual  { display: none !important; }
    .pe-dual-grid    { grid-template-columns: 1fr !important; gap: 24px !important; }
    .pe-owner-grid   { grid-template-columns: 1fr !important; gap: 40px !important; }
    .pe-features-grid{ grid-template-columns: repeat(2, 1fr) !important; }
    .pe-listing-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .pe-booking-sticky { position: static !important; }
  }

  /* Mobile (<=768px) */
  @media (max-width: 768px) {
    /* Navbar */
    .pe-nav-links  { display: none !important; }
    .pe-nav-auth   { display: none !important; }
    .pe-hamburger  { display: flex !important; }

    /* Landing page */
    .pe-features-grid { grid-template-columns: 1fr !important; }
    .pe-footer-grid   { flex-direction: column !important; gap: 32px !important; }

    /* Search page */
    .pe-search-page  { height: auto !important; }
    .pe-search-split {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto 360px !important;
      overflow: visible !important;
    }
    .pe-search-list {
      max-height: 55vh !important;
      overflow-y: auto !important;
      border-right: none !important;
      border-bottom: 1px solid #CEEADB !important;
    }
    .pe-search-map { height: 360px !important; overflow: hidden !important; }

    /* Listing & booking */
    .pe-listing-grid  { grid-template-columns: 1fr !important; }
    .pe-booking-sticky{ position: static !important; top: auto !important; }

    /* Dashboard sidebars */
    .pe-dash-layout { flex-direction: column !important; }
    .pe-dash-sidebar {
      width: 100% !important;
      flex-direction: row !important;
      overflow-x: auto !important;
      padding: 12px !important;
      gap: 8px !important;
      border-right: none !important;
      border-bottom: 1px solid #CEEADB !important;
    }
    .pe-dash-sidebar-user { display: none !important; }
  }
`

// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
export const LISTINGS = [
  { id: 1, name: 'T Nagar Secure Parking', area: 'T Nagar, Chennai', city: 'Chennai', price2w: 15, price4w: 50, priceMonthly: 1500, slots: 14, slotsLeft: 4, amenities: ['CCTV', 'Security Guard', 'Gated Entry', 'Lighting'], types: ['2-wheeler', '4-wheeler'], rating: 4.8, reviews: 218, distance: '0.3 km', cover: '🏢' },
  { id: 2, name: 'Anna Nagar Covered Lot', area: 'Anna Nagar, Chennai', city: 'Chennai', price2w: 12, price4w: 65, priceMonthly: 2000, slots: 10, slotsLeft: 2, amenities: ['Covered', 'CCTV', 'EV Charging', '24/7 Access'], types: ['2-wheeler', '3-wheeler', '4-wheeler'], rating: 4.9, reviews: 104, distance: '0.6 km', cover: '🏬' },
  { id: 3, name: 'Adyar Open Space Parking', area: 'Adyar, Chennai', city: 'Chennai', price2w: 8, price4w: 40, priceMonthly: 1100, slots: 22, slotsLeft: 13, amenities: ['Lighting', 'CCTV', 'Nearby Washroom'], types: ['2-wheeler', '4-wheeler'], rating: 4.4, reviews: 76, distance: '1.0 km', cover: '🏪' },
  { id: 4, name: 'Nungambakkam Premium Lot', area: 'Nungambakkam, Chennai', city: 'Chennai', price2w: 20, price4w: 90, priceMonthly: 3000, slots: 8, slotsLeft: 1, amenities: ['Covered', 'Security Guard', 'CCTV', 'EV Charging', 'Gated Entry'], types: ['4-wheeler'], rating: 5.0, reviews: 41, distance: '0.2 km', cover: '🏙️' },
  { id: 5, name: 'Velachery IT Park Parking', area: 'Velachery, Chennai', city: 'Chennai', price2w: 10, price4w: 45, priceMonthly: 1300, slots: 35, slotsLeft: 20, amenities: ['Lighting', 'Open Air', 'CCTV'], types: ['2-wheeler', '3-wheeler', '4-wheeler'], rating: 4.3, reviews: 189, distance: '0.7 km', cover: '🏗️' },
  { id: 6, name: 'OMR Tech Corridor Parking', area: 'OMR, Chennai', city: 'Chennai', price2w: 10, price4w: 55, priceMonthly: 1600, slots: 18, slotsLeft: 9, amenities: ['CCTV', 'Gated Entry', '24/7 Access', 'Security Guard'], types: ['2-wheeler', '4-wheeler'], rating: 4.7, reviews: 93, distance: '0.5 km', cover: '🏢' },
]

export const AMENITY_ICONS = {
  CCTV: '📹',
  'Security Guard': '💂',
  Covered: '🏠',
  'Gated Entry': '🚧',
  Lighting: '💡',
  'EV Charging': '⚡',
  '24/7 Access': '🕐',
  'Nearby Washroom': '🛃',
  'Open Air': '🌿',
}
