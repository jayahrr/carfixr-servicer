import { createStore, applyMiddleware } from 'redux'
// import ReduxThunk from 'redux-thunk'
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'
import Reducers from '../reducers/'

const navMiddleWare = createReactNavigationReduxMiddleware('root', state => state.nav)
const addListener = createReduxBoundAddListener('root')
const store = createStore(Reducers, {}, applyMiddleware(navMiddleWare /* , ReduxThunk */))

export { addListener, store }
