import { REQS_RECEIVE, REQS_MYWORK } from '../actions/types'

const initialState = {
  items: [],
  myWork: [],
}

export default (state = initialState, action) => {
  // console.log('action: ', action)
  // console.log('state: ', state)

  switch (action.type) {
    case REQS_RECEIVE:
      return { ...state, items: action.payload }

    case REQS_MYWORK:
      return { ...state, myWork: action.payload }

    default:
      return state
  }
}
