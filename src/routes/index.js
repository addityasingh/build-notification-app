import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import CounterRoute from './Counter'
import LoginRoute from './Login'
import NotifListRoute from './NotifList'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : LoginRoute,
  childRoutes : [
    CounterRoute(store),
    NotifListRoute(store)
  ]
})

export default createRoutes
