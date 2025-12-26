const CACHE_NAME = 'learner-cache-v2';
const ASSETS = [
    './',
    './learner.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            // Claim clients immediately
            self.clients.claim(),
            // Clean up old caches
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
                );
            })
        ])
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Check if it's one of our core assets
    const isAsset = ASSETS.some(asset =>
        event.request.url.includes(asset.replace('./', '')) ||
        (asset === './' && url.pathname.endsWith('/'))
    );

    if (isAsset) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // Return cached response if found
                if (cachedResponse) {
                    // Update cache in background
                    fetch(event.request).then(networkResponse => {
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
                    }).catch(() => {}); // Ignore network errors in background
                    return cachedResponse;
                }
                // Fallback to network
                return fetch(event.request);
            })
        );
    } else {
        // For API calls, try network first, no caching (audio is handled by IndexedDB in learner.html)
        event.respondWith(fetch(event.request).catch(() => {
            return caches.match(event.request);
        }));
    }
});
