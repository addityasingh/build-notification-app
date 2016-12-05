import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import CounterRoute from './Counter'
import NotifList from './NotifList'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : NotifList,
  childRoutes : [
    CounterRoute(store)
  ]
})

export default createRoutes
