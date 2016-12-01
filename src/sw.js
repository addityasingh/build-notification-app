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
            .then(response => response || fetch(event.request))
    )
})