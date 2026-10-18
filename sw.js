// Autumn Lake EVV worker app — offline shell
const CACHE = 'al-evv-v1';
const SHELL = ['./worker.html', './manifest.webmanifest', './brand_assets/logo.png', './brand_assets/icon-192.png', './brand_assets/icon-512.png', './brand_assets/apple-touch-icon.png'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Pages: network first so updates show right away, cached copy when offline
  if (req.mode === 'navigate'){
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('./worker.html'))));
    return;
  }
  // Assets, fonts, scripts: cached copy first, refresh in the background
  e.respondWith(caches.match(req).then(cached => {
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => cached);
    return cached || net;
  }));
});
