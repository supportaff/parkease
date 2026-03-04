import { C } from '../constants'

// ─── BUTTON ─────────────────────────────────────────────────────────────────────
export const Btn = ({ children, onClick, variant = 'primary', size = 'md', style = {}, disabled }) => {
  const base = {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    borderRadius: 10,
    transition: 'all 0.18s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    letterSpacing: '0.01em',
    opacity: disabled ? 0.5 : 1,
  }
  const sizes = {
    sm: { padding: '8px 18px', fontSize: 13 },
    md: { padding: '12px 26px', fontSize: 15 },
    lg: { padding: '16px 36px', fontSize: 17 },
  }
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`,
      color: '#0A0F1A',
      boxShadow: `0 4px 20px ${C.amberGlow}`,
    },
    outline: {
      background: 'transparent',
      color: C.amber,
      border: `1.5px solid ${C.amber}44`,
    },
    ghost: { background: 'transparent', color: C.muted },
    teal: {
      background: `linear-gradient(135deg, ${C.teal}, #0284C7)`,
      color: '#fff',
      boxShadow: `0 4px 20px ${C.tealGlow}`,
    },
    danger: {
      background: `linear-gradient(135deg, ${C.red}, #B91C1C)`,
      color: '#fff',
    },
    surface: {
      background: C.card,
      color: C.text,
      border: `1px solid ${C.border}`,
    },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '0.88' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.opacity = '1' }}
    >
      {children}
    </button>
  )
}

// ─── BADGE ─────────────────────────────────────────────────────────────────────
export const Badge = ({ children, color = C.amber }) => (
  <span
    style={{
      background: color + '22',
      color,
      border: `1px solid ${color}44`,
      borderRadius: 6,
      padding: '2px 9px',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "'DM Mono', monospace",
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </span>
)

// ─── INPUT ─────────────────────────────────────────────────────────────────────
export const Input = ({ label, type = 'text', value, onChange, placeholder, icon, style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
    {label && (
      <label
        style={{
          fontSize: 13,
          color: C.muted,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </label>
    )}
    <div style={{ position: 'relative' }}>
      {icon && (
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 16,
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: C.surface,
          border: `1.5px solid ${C.border}`,
          borderRadius: 10,
          padding: icon ? '12px 14px 12px 42px' : '12px 14px',
          color: C.text,
          fontSize: 15,
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => (e.target.style.borderColor = C.amber)}
        onBlur={e => (e.target.style.borderColor = C.border)}
      />
    </div>
  </div>
)

// ─── STARS ─────────────────────────────────────────────────────────────────────
export const Stars = ({ rating }) => (
  <span style={{ color: C.amber, fontSize: 13 }}>
    {'★'.repeat(Math.floor(rating))}
    {'☆'.repeat(5 - Math.floor(rating))}
    <span style={{ color: C.muted, marginLeft: 5, fontSize: 12 }}>{rating}</span>
  </span>
)

// ─── DIVIDER ───────────────────────────────────────────────────────────────────
export const Divider = ({ style = {} }) => (
  <div
    style={{
      height: 1,
      background: `linear-gradient(to right, transparent, ${C.border}, transparent)`,
      margin: '24px 0',
      ...style,
    }}
  />
)
