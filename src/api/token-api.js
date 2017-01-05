const API_URL = 'http://localhost:4567'

export const saveTokenForPush = subscription =>
    fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify({
            token: extractTokenFromSubscription(subscription)
        })
    })

const extractTokenFromSubscription = ({ endpoint }) =>
    endpoint.replace('https://android.googleapis.com/gcm/send/', '')