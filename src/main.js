import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { checkAuth } from './api/utils'
import firebase from 'firebase'
import 'firebaseui'
import './sw-main'

function initFirebase () {
  firebase.initializeApp({
    apiKey: "AIzaSyA87KcLAhv2NU_3uLZxMmWl15K4rlw-NkA",
    authDomain: "build-notification-app.firebaseapp.com",
    messagingSenderId: "776464732646"
  });
}

initFirebase();
injectTapEventPlugin()
const MOUNT_NODE = document.getElementById('root')
const initialState = window.___INITIAL_STATE__

let render = (store) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
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

checkAuth()
  .then(userDetails => {
    const store  = userDetails 
        ? createStore(Object.assign({}, initialState, userDetails))
        : createStore(initialState);
    render(store)
  })
