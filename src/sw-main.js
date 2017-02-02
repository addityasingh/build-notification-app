import swURL from 'file?name=sw.js!babel!./sw'
import { saveTokenForPush } from './api/token-api';

const vapidPublicKey = 'BEnYAZvOo76wNoeyjGL35mhtr_7_cWA6k4W6c_2PVrY90DgduJs8ZzZaKBrV65bEwXJcqNYW3fL8YAG_532eT3M';

if (navigator.serviceWorker && 'PushManager' in window) {
    navigator.serviceWorker.register(swURL)
        .then(swRegistration => {
            console.log('service worker registered')

            swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(vapidPublicKey)
            })
            .then(function(subscription) {
                updateSubscriptionOnServer(subscription);
            });
        })
        .catch((err) => {
            console.log('Cannot register service worker')
        })
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateSubscriptionOnServer(subscription) {
  saveTokenForPush(subscription);
}