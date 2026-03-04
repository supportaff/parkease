import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Singleton — script loads once globally across the entire app
// Handles React StrictMode double-invoke correctly
let scriptState = 'idle' // 'idle' | 'loading' | 'loaded' | 'error'
const listeners = []

export function useGoogleMaps() {
  const [loaded, setLoaded] = useState(scriptState === 'loaded')

  useEffect(() => {
    // Already loaded — just sync state
    if (scriptState === 'loaded') {
      setLoaded(true)
      return
    }

    if (!API_KEY) {
      console.warn(
        '[ParkEase] VITE_GOOGLE_MAPS_API_KEY is not set.\n' +
        'Add it in Vercel → Settings → Environment Variables.'
      )
      return
    }

    // Register this component instance as a listener
    const notify = () => setLoaded(true)
    listeners.push(notify)

    // Only inject the script once (even under React StrictMode)
    if (scriptState === 'idle') {
      scriptState = 'loading'

      const script = document.createElement('script')
      // ⚠️ Do NOT add loading=async — it uses deferred library init
      // which breaks window.google.maps.places availability on onload
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => {
        scriptState = 'loaded'
        // Notify all waiting components
        listeners.forEach(fn => fn())
        listeners.length = 0
      }

      script.onerror = () => {
        scriptState = 'error'
        listeners.length = 0
        console.error(
          '[ParkEase] Google Maps failed to load.\n' +
          'Check: 1) API key is correct  2) Maps JS API + Places API are enabled  3) Domain restriction includes your URL'
        )
      }

      document.head.appendChild(script)
    }

    // Cleanup: remove this component's listener on unmount
    // (handles React StrictMode unmount/remount cycle safely)
    return () => {
      const idx = listeners.indexOf(notify)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])

  return { loaded, apiKeySet: !!API_KEY }
}
