const API_URL = 'https://d07a5522.ngrok.io'

export const saveTokenForPush = subscription =>
    fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(subscription)
    })

const extractTokenFromSubscription = ({ endpoint }) =>
    endpoint.replace('https://android.googleapis.com/gcm/send/', '')