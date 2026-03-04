// ─── DESIGN TOKENS ───────────────────────────────────────────────────
export const C = {
  bg: '#060D1A',
  surface: '#0D1929',
  card: '#111F35',
  cardHover: '#162540',
  border: '#1E3050',
  borderLight: '#243858',
  amber: '#F59E0B',
  amberDark: '#D97706',
  amberGlow: '#F59E0B33',
  teal: '#0EA5E9',
  tealGlow: '#0EA5E933',
  green: '#10B981',
  red: '#EF4444',
  purple: '#8B5CF6',
  text: '#EEF2FF',
  muted: '#94A3B8',
  dim: '#4B6282',
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Crimson Pro', Georgia, serif; background: #060D1A; color: #EEF2FF; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0D1929; }
  ::-webkit-scrollbar-thumb { background: #F59E0B55; border-radius: 3px; }

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
  .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 40px #F59E0B22; }
  input, select, textarea { font-family: 'Crimson Pro', serif; }
`

// ─── SAMPLE DATA ─────────────────────────────────────────────────────
export const LISTINGS = [
  {
    id: 1,
    name: 'Koramangala Secure Lot',
    area: 'Koramangala, Bengaluru',
    city: 'Bengaluru',
    price2w: 20,
    price4w: 60,
    priceMonthly: 1800,
    slots: 12,
    slotsLeft: 4,
    amenities: ['CCTV', 'Security Guard', 'Gated Entry', 'Lighting'],
    types: ['2-wheeler', '4-wheeler'],
    rating: 4.8,
    reviews: 142,
    distance: '0.4 km',
    cover: '🏢',
  },
  {
    id: 2,
    name: 'Indiranagar Covered Parking',
    area: 'Indiranagar, Bengaluru',
    city: 'Bengaluru',
    price2w: 15,
    price4w: 80,
    priceMonthly: 2500,
    slots: 8,
    slotsLeft: 2,
    amenities: ['Covered', 'CCTV', 'EV Charging', '24/7 Access'],
    types: ['2-wheeler', '3-wheeler', '4-wheeler'],
    rating: 4.9,
    reviews: 88,
    distance: '0.8 km',
    cover: '🏬',
  },
  {
    id: 3,
    name: 'HSR Layout Open Space',
    area: 'HSR Layout, Bengaluru',
    city: 'Bengaluru',
    price2w: 10,
    price4w: 45,
    priceMonthly: 1200,
    slots: 20,
    slotsLeft: 11,
    amenities: ['Lighting', 'CCTV', 'Nearby Washroom'],
    types: ['2-wheeler', '4-wheeler'],
    rating: 4.5,
    reviews: 63,
    distance: '1.2 km',
    cover: '🏪',
  },
  {
    id: 4,
    name: 'Bandra West Premium',
    area: 'Bandra West, Mumbai',
    city: 'Mumbai',
    price2w: 30,
    price4w: 120,
    priceMonthly: 4000,
    slots: 6,
    slotsLeft: 1,
    amenities: ['Covered', 'Security Guard', 'CCTV', 'EV Charging', 'Gated Entry'],
    types: ['4-wheeler'],
    rating: 5.0,
    reviews: 29,
    distance: '0.2 km',
    cover: '🏛️',
  },
  {
    id: 5,
    name: 'T Nagar Budget Parking',
    area: 'T Nagar, Chennai',
    city: 'Chennai',
    price2w: 8,
    price4w: 35,
    priceMonthly: 900,
    slots: 30,
    slotsLeft: 18,
    amenities: ['Lighting', 'Open Air'],
    types: ['2-wheeler', '3-wheeler', '4-wheeler'],
    rating: 4.2,
    reviews: 211,
    distance: '0.5 km',
    cover: '🏗️',
  },
  {
    id: 6,
    name: 'Sector 18 Noida Hub',
    area: 'Sector 18, Noida',
    city: 'Noida',
    price2w: 12,
    price4w: 50,
    priceMonthly: 1500,
    slots: 15,
    slotsLeft: 7,
    amenities: ['CCTV', 'Gated Entry', '24/7 Access', 'Security Guard'],
    types: ['2-wheeler', '4-wheeler'],
    rating: 4.6,
    reviews: 77,
    distance: '0.6 km',
    cover: '🏢',
  },
]

export const AMENITY_ICONS = {
  CCTV: '📹',
  'Security Guard': '💂',
  Covered: '🏠',
  'Gated Entry': '🚧',
  Lighting: '💡',
  'EV Charging': '⚡',
  '24/7 Access': '🕐',
  'Nearby Washroom': '🚿',
  'Open Air': '🌿',
}
