const CACHE_NAME = 'app-shell-v1';

self.addEventListener('install', event => {
    console.log('Service worker installed');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => 
                fetch("assets.json")
                    .then(response => response.json())
                    .then(assets => cache.addAll([
                            "/",
                            assets.vendor.js,
                            assets.app.js
                    ]))
    ));
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request).then(res => {
                if (res.status === 404) {
                    return new Response('Whoops!! Resource not found')
                }

                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, res.clone())
                    return res
                })
                
            }))
    )
})

self.addEventListener('push', event => {
  const payload = event.data.json();
  const { token } = payload;
  // Replace the tokn with actual payload from github Webhook
  const title = 'Push Codelab';
  const options = {
    body: token || 'Yay!',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});