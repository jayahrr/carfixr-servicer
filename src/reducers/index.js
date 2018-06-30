import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import NavReducer from './NavReducer'
import UserReducer from './UserReducer'
import MapReducer from './MapReducer'

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer,
  map: MapReducer,
  form: formReducer,
})

export default AppReducer
