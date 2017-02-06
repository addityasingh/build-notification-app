import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'

import firebase from 'firebase'
import 'firebaseui'
import './sw-main'

function initFirebase () {
  firebase.initializeApp({
    apiKey: "AIzaSyA87KcLAhv2NU_3uLZxMmWl15K4rlw-NkA",
    authDomain: "build-notification-app.firebaseapp.com",
    messagingSenderId: "776464732646"
  });

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
      user.getToken().then(function(accessToken) {
        //TODO: Use this token to save user data and allow ush Notif
        console.log('The access token for user is', accessToken);
      });
    } else {
      // User is signed out.
      console.warn('The user is signed out');
    }
  }, function(error) {
    console.log('signout error', error);
  });
}

initFirebase();
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
injectTapEventPlugin()

const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render()
