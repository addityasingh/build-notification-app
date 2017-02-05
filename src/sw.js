const CACHE_NAME = 'app-shell-v1';

self.addEventListener('install', event => {
    console.log('Service worker installed');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => 
                fetch("static/assets.json", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                })
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
  const { body } = payload;  
  const title = 'Build notification message';

  const options = {
    body: body || 'Yay!',
    icon: 'icon-72x72.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});