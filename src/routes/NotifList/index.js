import { checkAuth } from '../../api/utils';
import NotifListView from './components/NotifListView'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], () => {
      cb(null, NotifListView)
    }, 'home')
  },
  onEnter: (nextState, replace, cb) => { 
    const { user } = store.getState()
    if(!user) {
      replace('/')
    }
    cb()
  }
})