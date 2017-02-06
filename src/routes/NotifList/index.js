import NotifListView from './components/NotifListView'

export default (store) => ({
  path : 'home',
  getComponent (nextState, cb) {
    require.ensure([], () => {
      cb(null, NotifListView)
    }, 'home')
  },
})