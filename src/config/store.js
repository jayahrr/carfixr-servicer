import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'

import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'
import Reducers from '../reducers/'

// const loggerMiddleware = createLogger()
const navMiddleWare = createReactNavigationReduxMiddleware('root', state => state.nav)
const addListener = createReduxBoundAddListener('root')

const store = createStore(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware, navMiddleWare /* , loggerMiddleware */),
)

export { addListener, store }
