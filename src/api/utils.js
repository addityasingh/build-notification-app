import firebase from 'firebase'
import { getGithubUserByToken } from './github-api'

export const checkAuth = () => 
  new Promise((resolve, reject) => { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getGithubUserByToken()
          .then(usr => resolve({ user: usr }))
          .catch(() => resolve({ user }))
      } else {
        resolve(false);
      }
    }, (error) => {
      resolve(false);
    })
  })
