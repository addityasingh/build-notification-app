import React from 'react'
import NotifListView from './components/NotifListView'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], () => {
      const state = store.getState()
      cb(null, () => <NotifListView {...state.user} />)
    }, 'home')
  },
  onEnter: (nextState, replace, cb) => { 
    const { user } = store.getState()
    if(!user && !Object.keys(user).length) {
      replace('/')
    }
    cb()
  }
})