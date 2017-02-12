import firebase from 'firebase'

export const checkAuth = () => 
  new Promise((resolve, reject) => { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getToken()
        .then(accessToken => resolve({ user, accessToken }))
        .catch(() => resolve({ user }))
      } else {
        resolve(false);
      }
    }, (error) => {
      resolve(false);
    })
  })
