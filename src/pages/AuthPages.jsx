import { SignIn, SignUp } from '@clerk/clerk-react'
import { C } from '../constants'

const clerkAppearance = {
  variables: {
    colorPrimary: '#16A34A',
    colorBackground: '#FFFFFF',
    colorText: '#0A1F14',
    colorTextSecondary: '#436B53',
    colorInputBackground: '#F6FBF8',
    colorInputText: '#0A1F14',
    borderRadius: '10px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '15px',
  },
  elements: {
    card: {
      boxShadow: '0 8px 40px rgba(22,163,74,0.12)',
      border: `1.5px solid #CEEADB`,
      borderRadius: '16px',
    },
    headerTitle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      color: '#0A1F14',
    },
    headerSubtitle: {
      color: '#436B53',
    },
    formButtonPrimary: {
      backgroundColor: '#16A34A',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      '&:hover': { backgroundColor: '#15803D' },
    },
    footerActionLink: {
      color: '#16A34A',
      fontWeight: 600,
    },
    identityPreviewEditButton: {
      color: '#16A34A',
    },
    formFieldInput: {
      borderColor: '#CEEADB',
      '&:focus': { borderColor: '#16A34A' },
    },
    socialButtonsBlockButton: {
      border: '1.5px solid #CEEADB',
    },
    dividerLine: {
      backgroundColor: '#CEEADB',
    },
  },
}

export function LoginPage({ setPage }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.bg,
        paddingTop: 80,
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle green glow background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.amberGlow}, transparent)`,
        pointerEvents: 'none',
      }} />
      <SignIn
        routing="hash"
        afterSignInUrl="/"
        signUpUrl="#signup"
        appearance={clerkAppearance}
      />
    </div>
  )
}

export function SignupPage({ setPage }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.bg,
        paddingTop: 80,
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle green glow background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${C.amberGlow}, transparent)`,
        pointerEvents: 'none',
      }} />
      <SignUp
        routing="hash"
        afterSignUpUrl="/"
        signInUrl="#login"
        appearance={clerkAppearance}
      />
    </div>
  )
}
