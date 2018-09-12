import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import NavReducer from './NavReducer'
import UserReducer from './UserReducer'
import MapReducer from './MapReducer'
import AuthReducer from './AuthReducer'
import RequestsReducer from './RequestsReducer'
import CatalogReducer from './CatalogReducer'

const AppReducer = combineReducers({
  auth: AuthReducer,
  nav: NavReducer,
  user: UserReducer,
  map: MapReducer,
  form: formReducer,
  requests: RequestsReducer,
  catalog: CatalogReducer,
})

export default AppReducer
