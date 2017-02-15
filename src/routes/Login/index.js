import React from 'react'
import LoginView from './components/LoginView'

export default (store) => ({
  component: () => <LoginView store={store} />,
  onEnter: (nextState, replace, cb) => { 
    const { user } = store.getState();
    if(!!user && !!Object.keys(user).length) {
      replace('/home');
    }
    cb()
  }
})
