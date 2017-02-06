import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import CounterRoute from './Counter'
import LoginRoute from './Login'
import NotifListRoute from './NotifList'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : NotifListRoute,
  childRoutes : [
    CounterRoute(store),
    LoginRoute(store)
  ]
})

export default createRoutes
