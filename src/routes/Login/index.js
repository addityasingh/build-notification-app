import LoginView from './components/LoginView'

export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], () => {
      cb(null, LoginView)
    }, 'login')
  },
})