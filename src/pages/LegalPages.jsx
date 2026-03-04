import { C } from '../constants'
import { Btn } from '../components/ui'

const LAST_UPDATED = 'March 4, 2026'
const COMPANY = 'ParkEase Technologies Pvt. Ltd.'
const EMAIL = 'legal@parkease.in'
const ADDRESS = 'Chennai, Tamil Nadu – 600017, India'

function LegalLayout({ title, badge, children, setPage }) {
  return (
    <div style={{ paddingTop: 64, background: C.bg, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '52px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: C.amber, background: C.amberGlow, border: `1px solid ${C.amber}33`, borderRadius: 6, padding: '4px 12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {badge}
          </span>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, color: C.text, margin: '16px 0 10px', letterSpacing: '-0.02em' }}>{title}</h1>
          <p style={{ color: C.muted, fontSize: 14 }}>Last updated: <strong>{LAST_UPDATED}</strong> &nbsp;·&nbsp; {COMPANY}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 80px' }}>
        {children}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${C.border}`, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Btn variant="outline" size="sm" onClick={() => setPage('landing')}>← Back to Home</Btn>
          <span style={{ fontSize: 13, color: C.muted }}>Questions? Email us at <a href={`mailto:${EMAIL}`} style={{ color: C.amber, textDecoration: 'none', fontWeight: 600 }}>{EMAIL}</a></span>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${C.border}` }}>{title}</h2>
      <div style={{ fontSize: 15, color: C.muted, lineHeight: 1.9 }}>{children}</div>
    </div>
  )
}

function P({ children }) {
  return <p style={{ marginBottom: 12 }}>{children}</p>
}

function Li({ children }) {
  return (
    <li style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
      <span style={{ color: C.amber, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>•</span>
      <span>{children}</span>
    </li>
  )
}

function Ul({ children }) {
  return <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 16px' }}>{children}</ul>
}

// ─── PRIVACY POLICY ─────────────────────────────────────────────────────
export function PrivacyPolicyPage({ setPage }) {
  return (
    <LegalLayout title="Privacy Policy" badge="Legal" setPage={setPage}>

      <div style={{ background: C.amberGlow, border: `1px solid ${C.amber}44`, borderRadius: 12, padding: '16px 20px', marginBottom: 36 }}>
        <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.7 }}>
          🔒 <strong>Your privacy matters to us.</strong> ParkEase collects only what’s necessary to operate the platform. We never sell your personal data to third parties.
        </p>
      </div>

      <Section title="1. Who We Are">
        <P><strong>{COMPANY}</strong> (“ParkEase”, “we”, “us”, “our”) operates the ParkEase platform — a digital marketplace connecting land owners with vehicle owners in Chennai, India. Our registered address is {ADDRESS}.</P>
        <P>This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our website, mobile app, or any related services (“Services”). By using our Services, you agree to this policy.</P>
      </Section>

      <Section title="2. Data We Collect">
        <P>We collect different types of data depending on how you use ParkEase:</P>
        <strong style={{ fontSize: 14, color: C.text }}>Account & Identity</strong>
        <Ul>
          <Li>Full name, email address, and phone number</Li>
          <Li>Profile photo (if provided via Google or Clerk sign-in)</Li>
          <Li>Role selection (Land Owner or Vehicle Owner)</Li>
          <Li>PAN number and GST number (Land Owners only, for tax compliance)</Li>
        </Ul>
        <strong style={{ fontSize: 14, color: C.text }}>Vehicle & Property Details</strong>
        <Ul>
          <Li>Vehicle registration number and vehicle type (Vehicle Owners)</Li>
          <Li>Parking property address, type, and slot count (Land Owners)</Li>
          <Li>Bank account details for payout (Land Owners only, stored via Razorpay)</Li>
        </Ul>
        <strong style={{ fontSize: 14, color: C.text }}>Usage & Booking Data</strong>
        <Ul>
          <Li>Booking history, amounts paid, and duration</Li>
          <Li>Parking locations accessed and timestamps</Li>
          <Li>Ratings and reviews submitted</Li>
        </Ul>
        <strong style={{ fontSize: 14, color: C.text }}>Technical Data</strong>
        <Ul>
          <Li>IP address, browser type, and device information</Li>
          <Li>Location data (only when you grant permission for “Near Me” search)</Li>
          <Li>Cookies and session data</Li>
        </Ul>
      </Section>

      <Section title="3. How We Use Your Data">
        <Ul>
          <Li>To create and manage your account securely</Li>
          <Li>To process bookings and payments via Razorpay</Li>
          <Li>To display your listings and match you with relevant parking spots</Li>
          <Li>To send booking confirmations, receipts, and important account alerts via email or SMS</Li>
          <Li>To pay out earnings to Land Owners via Razorpay Route</Li>
          <Li>To calculate and deduct applicable taxes (TDS) for Land Owner payouts</Li>
          <Li>To detect fraud, abuse, or policy violations</Li>
          <Li>To improve platform features and resolve technical issues</Li>
          <Li>To comply with legal obligations under Indian law</Li>
        </Ul>
        <P>We do <strong>not</strong> use your data for targeted advertising or sell it to any third party.</P>
      </Section>

      <Section title="4. Third-Party Services">
        <P>ParkEase uses the following trusted third-party services to operate the platform. Each has their own privacy policy:</P>
        <Ul>
          <Li><strong>Clerk (clerk.com)</strong> — Authentication and session management. Stores your email, password hash, and login history.</Li>
          <Li><strong>MongoDB Atlas (mongodb.com)</strong> — Cloud database hosted on AWS ap-south-1 (Mumbai). Stores user profiles, listings, and bookings.</Li>
          <Li><strong>Razorpay (razorpay.com)</strong> — Payment processing and payouts. Handles all financial transactions. ParkEase never stores raw card or UPI details.</Li>
          <Li><strong>Google Maps Platform</strong> — Map display and location services. Google may log IP and location data as per their privacy policy.</Li>
          <Li><strong>Vercel (vercel.com)</strong> — Hosting and serverless functions. Logs may capture request metadata briefly.</Li>
        </Ul>
      </Section>

      <Section title="5. Data Storage & Retention">
        <P>All data is stored on MongoDB Atlas servers located in <strong>AWS Mumbai (ap-south-1), India</strong>, ensuring compliance with Indian data localisation norms.</P>
        <Ul>
          <Li>Active account data is retained for the duration of your account</Li>
          <Li>Booking history is retained for <strong>7 years</strong> for GST and tax audit purposes</Li>
          <Li>If you delete your account, personal data is removed within <strong>30 days</strong>, except data legally required to be retained</Li>
          <Li>Payment records are retained as required by Razorpay and RBI regulations</Li>
        </Ul>
      </Section>

      <Section title="6. Your Rights">
        <P>Under India’s Digital Personal Data Protection Act (DPDPA), 2023, you have the right to:</P>
        <Ul>
          <Li><strong>Access</strong> — Request a copy of the personal data we hold about you</Li>
          <Li><strong>Correction</strong> — Request correction of inaccurate or incomplete data</Li>
          <Li><strong>Erasure</strong> — Request deletion of your account and associated personal data</Li>
          <Li><strong>Nomination</strong> — Nominate another person to exercise your rights in case of death or incapacity</Li>
          <Li><strong>Grievance Redressal</strong> — Raise a complaint with our Data Protection Officer</Li>
        </Ul>
        <P>To exercise any of these rights, email us at <strong>{EMAIL}</strong> with your registered email address and request details. We will respond within <strong>30 days</strong>.</P>
      </Section>

      <Section title="7. Cookies">
        <P>ParkEase uses essential cookies for authentication (managed by Clerk) and session persistence. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but this may affect your ability to log in.</P>
      </Section>

      <Section title="8. Children's Privacy">
        <P>Our Services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has registered, please contact us immediately and we will delete the account.</P>
      </Section>

      <Section title="9. Changes to This Policy">
        <P>We may update this Privacy Policy from time to time. When we make material changes, we will notify you via email or an in-app banner at least 14 days before the change takes effect. Your continued use of ParkEase after the effective date constitutes acceptance of the updated policy.</P>
      </Section>

      <Section title="10. Contact & Grievance Officer">
        <P><strong>Data Protection / Grievance Officer</strong></P>
        <P>ParkEase Technologies Pvt. Ltd.<br />{ADDRESS}<br />Email: <a href={`mailto:${EMAIL}`} style={{ color: C.amber }}>{EMAIL}</a></P>
      </Section>
    </LegalLayout>
  )
}

// ─── TERMS & CONDITIONS ─────────────────────────────────────────────────
export function TermsPage({ setPage }) {
  return (
    <LegalLayout title="Terms & Conditions" badge="Legal" setPage={setPage}>

      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '16px 20px', marginBottom: 36 }}>
        <p style={{ fontSize: 14, color: '#1E40AF', margin: 0, lineHeight: 1.7 }}>
          ℹ️ <strong>Please read these terms carefully.</strong> By creating an account or using ParkEase, you agree to be bound by these Terms & Conditions.
        </p>
      </div>

      <Section title="1. Acceptance of Terms">
        <P>These Terms & Conditions (“Terms”) constitute a legally binding agreement between you (“User”) and <strong>{COMPANY}</strong> (“ParkEase”). By registering an account, accessing, or using our Services, you confirm that you have read, understood, and agree to be bound by these Terms.</P>
        <P>If you are using ParkEase on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</P>
      </Section>

      <Section title="2. Eligibility">
        <Ul>
          <Li>You must be at least <strong>18 years of age</strong> to use ParkEase</Li>
          <Li>You must be a resident of India with a valid mobile number</Li>
          <Li>Land Owners must have legal authority (ownership or lease) over the property listed</Li>
          <Li>Vehicle Owners must hold a valid vehicle registration for the vehicle registered on the platform</Li>
          <Li>ParkEase reserves the right to refuse service to anyone at its sole discretion</Li>
        </Ul>
      </Section>

      <Section title="3. Platform Role">
        <P>ParkEase acts solely as a <strong>technology intermediary</strong> connecting Land Owners and Vehicle Owners. We do not own, operate, or control any parking space listed on the platform. All parking arrangements are directly between the Land Owner and the Vehicle Owner.</P>
        <P>ParkEase is not a party to any parking contract between users and accepts no liability for the condition, safety, or availability of any listed parking space.</P>
      </Section>

      <Section title="4. Land Owner Obligations">
        <P>By listing a parking space, Land Owners agree to:</P>
        <Ul>
          <Li>Provide accurate, complete, and up-to-date information about the property</Li>
          <Li>Ensure the space is legally available for commercial parking use</Li>
          <Li>Maintain the listed number of slots and notify ParkEase of any changes</Li>
          <Li>Not discriminate against Vehicle Owners based on caste, religion, gender, or language</Li>
          <Li>Provide safe, accessible, and well-lit parking as described in the listing</Li>
          <Li>Honour all confirmed bookings. Repeated cancellations may result in listing suspension</Li>
          <Li>Comply with Chennai Municipal Corporation and Tamil Nadu parking regulations</Li>
          <Li>Declare earnings for income tax purposes. ParkEase will deduct TDS as applicable under Indian law</Li>
        </Ul>
      </Section>

      <Section title="5. Vehicle Owner Obligations">
        <P>By booking a parking space, Vehicle Owners agree to:</P>
        <Ul>
          <Li>Use the parking space only for the registered vehicle type and duration booked</Li>
          <Li>Arrive at the allotted time and vacate by the end of the booking period</Li>
          <Li>Not use the space to store hazardous, illegal, or oversized vehicles</Li>
          <Li>Follow all parking rules and signage on the Land Owner’s premises</Li>
          <Li>Not sublet or share the booked slot with others</Li>
          <Li>Report any damage, theft, or disputes to ParkEase within 24 hours</Li>
        </Ul>
      </Section>

      <Section title="6. Payments & Commission">
        <P>All payments are processed securely by <strong>Razorpay</strong>. ParkEase charges the following platform commission on each booking:</P>
        <Ul>
          <Li>Hourly bookings: <strong>12%</strong> of the booking value</Li>
          <Li>Daily bookings: <strong>10%</strong> of the booking value</Li>
          <Li>Monthly bookings: <strong>8%</strong> of the booking value</Li>
        </Ul>
        <P>Commission is inclusive of GST where applicable. ParkEase reserves the right to revise commission rates with 30 days’ notice.</P>
        <P>Land Owners receive their earnings (net of commission) via Razorpay Route to their registered bank account on a <strong>T+1 settlement cycle</strong>.</P>
      </Section>

      <Section title="7. Cancellation & Refund Policy">
        <Ul>
          <Li><strong>Cancelled 2+ hours before booking start:</strong> 100% refund to original payment method within 5–7 business days</Li>
          <Li><strong>Cancelled within 2 hours of booking start:</strong> 50% refund</Li>
          <Li><strong>No-show (booking not started within 30 minutes):</strong> No refund</Li>
          <Li><strong>Monthly bookings:</strong> No refund after the first 24 hours of the billing cycle</Li>
          <Li>If a Land Owner cancels a confirmed booking: 100% refund to Vehicle Owner + cancellation penalty to Land Owner</Li>
        </Ul>
        <P>Refunds are processed through the original payment method. Cash refunds are not available.</P>
      </Section>

      <Section title="8. Prohibited Activities">
        <P>Users must not:</P>
        <Ul>
          <Li>List or book spaces for any illegal purpose, including storing stolen vehicles</Li>
          <Li>Create fake accounts, listings, reviews, or bookings</Li>
          <Li>Conduct transactions outside the ParkEase platform to avoid commission fees</Li>
          <Li>Harass, threaten, or abuse other users</Li>
          <Li>Attempt to hack, scrape, or disrupt the ParkEase platform</Li>
          <Li>Use the platform in violation of any applicable Indian law</Li>
        </Ul>
        <P>Violation of these restrictions may result in immediate account suspension and legal action.</P>
      </Section>

      <Section title="9. Limitation of Liability">
        <P>To the maximum extent permitted by law, ParkEase shall not be liable for:</P>
        <Ul>
          <Li>Theft, damage, or loss of vehicles or property at any listed parking space</Li>
          <Li>Personal injury occurring at a parking space</Li>
          <Li>Disputes between Land Owners and Vehicle Owners</Li>
          <Li>Loss of earnings due to platform downtime or technical issues</Li>
          <Li>Actions, omissions, or negligence of any Land Owner or Vehicle Owner</Li>
        </Ul>
        <P>In all cases, ParkEase’s maximum liability to any user shall not exceed the total commission earned from that user in the 3 months preceding the claim.</P>
      </Section>

      <Section title="10. Intellectual Property">
        <P>All content on ParkEase — including the logo, design, code, brand name, and copy — is the exclusive property of {COMPANY} and is protected by Indian intellectual property law. You may not reproduce, distribute, or create derivative works without prior written permission.</P>
      </Section>

      <Section title="11. Governing Law & Disputes">
        <P>These Terms are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes shall first be attempted to be resolved through good-faith negotiation within 30 days of notice.</P>
        <P>Unresolved disputes shall be subject to <strong>arbitration</strong> under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in <strong>Chennai, Tamil Nadu</strong>. The language of arbitration shall be English.</P>
        <P>For consumer complaints, users may also approach the Consumer Disputes Redressal Commission in Chennai.</P>
      </Section>

      <Section title="12. Changes to Terms">
        <P>ParkEase may update these Terms at any time. Material changes will be communicated via email or an in-app notification at least <strong>14 days</strong> before taking effect. Continued use of the platform after the effective date constitutes acceptance of the revised Terms.</P>
      </Section>

      <Section title="13. Contact">
        <P><strong>{COMPANY}</strong><br />{ADDRESS}<br />Email: <a href={`mailto:${EMAIL}`} style={{ color: C.amber }}>{EMAIL}</a><br />Grievance Response Time: Within 30 days of receipt</P>
      </Section>
    </LegalLayout>
  )
}
