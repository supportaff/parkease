import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Singleton — script only ever loads once across the entire app
let scriptState = 'idle' // 'idle' | 'loading' | 'loaded' | 'error'
const listeners = []

export function useGoogleMaps() {
  const [loaded, setLoaded] = useState(scriptState === 'loaded')

  useEffect(() => {
    if (scriptState === 'loaded') { setLoaded(true); return }
    if (!API_KEY) {
      console.warn('[ParkEase] VITE_GOOGLE_MAPS_API_KEY is not set. Add it to Vercel env vars.')
      return
    }

    const notify = () => setLoaded(true)
    listeners.push(notify)

    if (scriptState === 'idle') {
      scriptState = 'loading'
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&loading=async`
      script.async = true
      script.defer = true
      script.onload = () => {
        scriptState = 'loaded'
        listeners.forEach(fn => fn())
        listeners.length = 0
      }
      script.onerror = () => {
        scriptState = 'error'
        console.error('[ParkEase] Failed to load Google Maps. Check your API key and domain restrictions.')
      }
      document.head.appendChild(script)
    }

    return () => {
      const idx = listeners.indexOf(notify)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])

  return { loaded, apiKeySet: !!API_KEY }
}
