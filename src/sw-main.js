'use strict';
import swURL from 'file?name=sw.js!babel!./sw';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(swURL)
        .then((event) => {
            console.log('service worker registered');
        })
        .catch((err) => {
            console.log('Cannot register service worker');
        });
}