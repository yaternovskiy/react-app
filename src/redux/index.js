import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import Thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), logger, Thunk)
)

export default createStore(reducer, enhancer)
