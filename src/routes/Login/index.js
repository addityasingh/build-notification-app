import { checkAuth } from '../../api/utils';
import LoginView from './components/LoginView'

export default (store) => ({
  component : LoginView,
  onEnter: (nextState, replace, cb) => { 
    const { user } = store.getState();
    if(user) {
      replace('/home');
    }
    cb()
  }
})
