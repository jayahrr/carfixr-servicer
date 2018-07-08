import { REQS_RECEIVE } from '../actions/types'

const initialState = {
  items: null,
}

export default (state = initialState, action) => {
  // console.log('action: ', action)
  // console.log('state: ', state)

  switch (action.type) {
    case REQS_RECEIVE:
      return { ...state, items: action.payload }

    default:
      return state
  }
}
