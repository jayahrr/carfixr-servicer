import { USER_GEO_CHNG } from '../actions/types'

const initialState = {
  geolocation: null,
  address: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_GEO_CHNG:
      return { ...state, geolocation: action.payload }

    default:
      return state
  }
}
