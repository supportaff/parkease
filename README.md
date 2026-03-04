# 🅿️ ParkEase — India's Parking Marketplace

A full-stack SaaS platform connecting land owners with vehicle owners across India. Built with **Vite + React**.

---

## 🚀 Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```
Opens at **http://localhost:3000**

### 3. Build for production
```bash
npm run build
```
Output goes to the `dist/` folder.

### 4. Preview production build
```bash
npm run preview
```

---

## 📁 Project Structure

```
parkease/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   └── ui.jsx           # Reusable UI components (Btn, Badge, Input, Stars, Divider)
│   ├── pages/
│   │   ├── LandingPage.jsx  # Homepage with hero, stats, how-it-works, owner section
│   │   ├── AuthPages.jsx    # Signup (role selector) + Login
│   │   ├── ParkingPages.jsx # Search, Listing Detail, Booking Widget, Payment + Confirmation
│   │   ├── OwnerDashboard.jsx  # Land owner: overview, listings, bookings, earnings
│   │   └── AdminPanel.jsx   # Admin: verifications, users, bookings, payouts
│   ├── constants.js         # Design tokens, sample data, global CSS
│   ├── App.jsx              # Root component + page router
│   └── main.jsx             # React DOM entry point
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🔐 Demo Login Credentials

| Role | Email | Destination |
|------|-------|-------------|
| Vehicle Owner | `user@email.com` | Search page |
| Land Owner | `owner@email.com` | Owner Dashboard |
| Admin | `admin@email.com` | Admin Panel |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Inline styles + CSS-in-JS |
| Fonts | Syne, Crimson Pro, DM Mono (Google Fonts) |
| Routing | Custom state-based page router |
| Payments | Razorpay (integration-ready) |

---

## 📤 Push to GitHub

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "feat: initial ParkEase platform"

# 4. Create a new repo on GitHub (github.com/new)
#    Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/parkease.git

# 5. Push
git branch -M main
git push -u origin main
```

---

## 🌐 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts — your app will be live in ~60 seconds!
```

Or connect your GitHub repo directly at **vercel.com/new** for automatic deployments on every push.

---

## 🗺️ Roadmap

- [ ] Backend API (Node.js + Express or Next.js API routes)
- [ ] PostgreSQL database (Supabase or PlanetScale)
- [ ] Real map integration (Google Maps / Mapbox)
- [ ] Razorpay payment gateway
- [ ] Firebase/Twilio OTP verification
- [ ] AWS S3 document uploads
- [ ] Push notifications (FCM)
- [ ] Mobile app (React Native)

---

## 📄 License

MIT © 2025 ParkEase Technologies Pvt. Ltd.
