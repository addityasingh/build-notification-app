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
