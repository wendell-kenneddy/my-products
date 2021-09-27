import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  { url: '/', revision: 'v1' },
  { url: '/index.html', revision: 'v1' },
  { url: '/assets/css/main.css', revision: 'v1' },
  { url: '/assets/scripts/app.js', revision: 'v1' },
  { url: '/manifest.webmanifest', revision: 'v1' },
  { url: '/assets/images/favicon.ico', revision: 'v1' },
  { url: '/assets/images/favicon.svg', revision: 'v1' },
  { url: '/assets/images/logo.svg', revision: 'v1' },
  { url: '/assets/images/trash.svg', revision: 'v1' },
  { url: '/assets/images/x.svg', revision: 'v1' }
]);

// Cache images with CacheOnly strategy
registerRoute(
  ({ request }) => request.destination == 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
      })
    ]
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30
      })
    ]
  })
);

// Cache stylesheets, html and js files with StaleWhileRevalidate
registerRoute(
  ({ request }) =>
    request.destination == 'style' ||
    request.destination == 'document' ||
    request.destination == 'script',
  new StaleWhileRevalidate({
    cacheName: 'static',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
      })
    ]
  })
);
