const API_URL = 'https://build-notification-api.herokuapp.com'

export const saveTokenForPush = subscription =>
    fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(subscription)
    })