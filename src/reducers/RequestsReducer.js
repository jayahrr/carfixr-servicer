import { REQS_RECEIVE, REQS_MYWORK, REQS_SELECT, REQS_SELECT_UPDATED } from '../actions/types'

const initialState = {
  items: [],
  myWork: [],
  selectedRequest: '',
  selectedRequestUpdated: false,
}

export default (state = initialState, action) => {
  // console.log('action: ', action)
  // console.log('state: ', state)

  switch (action.type) {
    case REQS_RECEIVE:
      return { ...state, items: action.payload }

    case REQS_MYWORK:
      return { ...state, myWork: action.payload }

    case REQS_SELECT:
      return { ...state, selectedRequest: action.payload }

    case REQS_SELECT_UPDATED:
      return { ...state, selectedRequestUpdated: action.payload }

    default:
      return state
  }
}
