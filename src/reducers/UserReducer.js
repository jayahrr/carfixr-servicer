import { USER_GEO_CHNG, USER_DATA } from '../actions/types'

const initialState = {
  geolocation: null,
  address: null,
  db_data: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_GEO_CHNG:
      return { ...state, geolocation: action.payload }

    case USER_DATA:
      return { ...state, db_data: action.payload }

    default:
      return state
  }
}
