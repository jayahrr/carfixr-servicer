import { MAP_REGN_CHNG, MAP_REF_SAVE } from '../actions/types'

const initialState = {
  region: null,
  address: null,
  ref: null,
}

export default (state = initialState, action) => {
  // console.log('state: ', state)
  // console.log('action.payload: ', action.payload)

  switch (action.type) {
    case MAP_REGN_CHNG:
      return { ...state, region: action.payload }
    case MAP_REF_SAVE:
      return { ...state, ref: action.payload }
    default:
      return state
  }
}
