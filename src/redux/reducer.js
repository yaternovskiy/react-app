import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'

import { MODULES } from '../redux/ducks/index'
import { authReducer } from '../redux/ducks/auth'

export default combineReducers({
  router: connectRouter(history),
  [MODULES.AUTH]: authReducer,
})
