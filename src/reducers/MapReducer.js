import {
  MAP_REGN_CHNG,
  MAP_REF_SAVE,
  MAP_USR_LOC,
  MAP_USR_ADDR,
  MAP_REGN_ADDR,
} from '../actions/types'

const initialState = {
  region: {},
  address: null,
  ref: null,
  userLocation: null,
  userAddress: null,
}

export default (state = initialState, action) => {
  // console.log('state: ', state)
  // console.log('action.type: ', action.type)
  // console.log('action.payload: ', action.payload)

  switch (action.type) {
    case MAP_REGN_CHNG:
      return { ...state, region: action.payload }
    case MAP_REGN_ADDR:
      return { ...state, address: action.payload }
    case MAP_REF_SAVE:
      return { ...state, ref: action.payload }
    case MAP_USR_LOC:
      return { ...state, userLocation: action.payload }
    case MAP_USR_ADDR:
      return { ...state, userAddress: action.payload }

    default:
      return state
  }
}
