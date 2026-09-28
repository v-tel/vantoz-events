const CACHE_NAME = 'vantoz-cache-v1';

// Static/public pages worth caching for offline + speed.
// Add more as you build them out.
const urlsToCache = [
  '/',
  '/about',
  '/gallery',
  '/packages',
  '/services',
  '/rentals',
  '/contact',
  '/quote',
];

// Never cache these — always hit the network.
const EXCLUDE_PREFIXES = ['/admin', '/api'];

function isExcluded(pathname) {
  return EXCLUDE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin GET requests.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Skip admin + api routes entirely — always go to network.
  if (isExcluded(url.pathname)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-OK responses (e.g. 404s, redirects to auth, etc.)
          if (!response || response.status !== 200) return response;

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // Offline and not cached — fall back to homepage shell if it's a page request.
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});