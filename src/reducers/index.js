import { combineReducers } from 'redux'
import NavReducer from './NavReducer'
import UserReducer from './UserReducer'
import MapReducer from './MapReducer'

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer,
  map: MapReducer,
})

export default AppReducer
