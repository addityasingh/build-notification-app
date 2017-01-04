import swURL from 'file?name=sw.js!babel!./sw'
import { saveTokenForPush } from './api/token-api';

const applicationServerPublicKey = 'BA9IXV5TGJSpuz8muslE3lcd2yxAXV8xgfFZIyq1-mqB0wc4aBlrVKD-jmihAJbH30redAum0U0wqWxk3DQ9UvA';

if (navigator.serviceWorker && 'PushManager' in window) {
    navigator.serviceWorker.register(swURL)
        .then(swRegistration => {
            console.log('service worker registered')

            swRegistration.pushManager.subscribe({
                userVisibleOnly: true
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
  console.log(subscription);
}