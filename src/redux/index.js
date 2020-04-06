import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import Thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'
import saga from './saga'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), logger, Thunk, sagaMiddleware)
)

export default createStore(reducer, enhancer)

sagaMiddleware.run(saga)
