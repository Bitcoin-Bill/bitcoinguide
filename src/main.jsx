import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import DevCacheErrorBoundary from '@/components/DevCacheErrorBoundary'
import '@/index.css'

// Dev-only: unregister any lingering service workers and clear stale caches.
// A previously-registered SW with a cache-first strategy can serve stale
// /node_modules/.vite chunks (with old ?v= hashes) forever, causing the
// browser to load react from one optimization pass and react-dom from
// another → two React copies → "Cannot read properties of null (reading
// 'useState')". This ensures the preview always fetches fresh dev chunks.
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
  if (window.caches) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }
}

// Dev-only self-heal: after a vite.config change, Vite re-optimizes deps and
// the preview can hold react from one optimization pass and react-dom from
// another → two React copies → "Cannot read properties of null (reading
// 'useState')". A cache-busting navigation (not a soft/bfcache reload) forces
// the browser to re-fetch the latest HTML and its consistent chunk graph.
// Dual-guarded by sessionStorage AND an ?_heal= URL param so it fires once
// per session and never loops (bump the key to force another round).
if (import.meta.env.DEV) {
  const HEAL_KEY = 'b44_dev_heal_v5';
  const url = new URL(window.location.href);
  const hasHealParam = url.searchParams.has('_heal');
  if (!sessionStorage.getItem(HEAL_KEY) && !hasHealParam) {
    sessionStorage.setItem(HEAL_KEY, '1');
    url.searchParams.set('_heal', Date.now());
    window.location.replace(url.toString());
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  import.meta.env.DEV ? (
    <DevCacheErrorBoundary>
      <App />
    </DevCacheErrorBoundary>
  ) : <App />
)