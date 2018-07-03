import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_STILL,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from '../actions/types'

const INITIAL_STATE = {
  error: '',
  loading: false,
  user: {},
  isLoggedIn: false,
}

export default (state = INITIAL_STATE, action) => {
  // console.log('AuthReducer action.........', action)
  const { type, payload } = action

  switch (type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: payload,
        isLoggedIn: true,
      }
    case USER_LOGIN_STILL:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: 'Authentication failed.',
        password: '',
        loading: false,
      }
    case USER_LOGOUT_SUCCESS:
      return { ...state, ...INITIAL_STATE }
    case USER_LOGOUT_FAIL:
      return { ...state, error: 'Authentication failed.', loading: false }

    default:
      return state
  }
}
