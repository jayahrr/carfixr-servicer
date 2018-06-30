import firebase from 'firebase'
import {
  // USER_LOGIN_SUCCESS,
  // USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from './types'
// import { URI } from '../config'

// const fetchUserData = (email) => {
//   const URL = `${URI}/api/v1/customers/email/`
//   const fetchConfig = {
//     method: 'GET',
//     headers: new Headers({ 'x-un': email }),
//   }

//   let userData = {}

//   return fetch(URL, fetchConfig)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('API response was not ok.')
//       }
//       // console.log('userData is .....', userData)
//       userData = JSON.parse(res._bodyText)
//       return userData
//     })
//     .catch((e) => {
//       throw new Error(e)
//     })
// }

// const fetchUserDataASYNC = async (email) => {
//   const URL = `${URI}/api/v1/customers/email/`
//   const fetchConfig = {
//     method: 'GET',
//     headers: new Headers({ 'x-un': email }),
//   }
//   const response = await fetch(URL, fetchConfig)
//   console.log('fetchUserDataASYNC response ......', response)
//   if (!response.ok) throw new Error('API response was not ok.')
//   return JSON.parse(response._bodyText)
// }

// const loginUserSuccess = (dispatch, userData) => {
//   dispatch({
//     type: USER_LOGIN_SUCCESS,
//     payload: userData,
//   })
// }

// const loginUserFail = (dispatch) => {
//   dispatch({ type: USER_LOGIN_FAIL })
// }

const loginUser = async ({ email, password }) => {
  const answer = {
    ok: false,
    data: null,
    error: null,
  }

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    // const userData = await fetchUserData(email)
    // console.log('userData: ', userData)
    // loginUserSuccess(dispatch, userData)
    answer.ok = true
  } catch (error) {
    answer.error = error
  }

  return answer
}

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: USER_LOGOUT_SUCCESS })
}

const logoutUserFail = (dispatch, e) => {
  console.log(e)
  dispatch({ type: USER_LOGOUT_FAIL })
}

const logoutUser = ({ navigation }) => (dispatch) => {
  dispatch({ type: USER_LOGOUT })
  firebase
    .auth()
    .signOut()
    .then(() => logoutUserSuccess(dispatch))
    .then(() => navigation.dispatch({ type: 'Logout' }))
    .catch(e => logoutUserFail(dispatch, e))
}

const createUser = async ({
  email, password, phone, first, last,
}) => {
  const answer = {
    ok: false,
    data: null,
    error: null,
  }

  try {
    answer.data = await firebase.auth().createUserWithEmailAndPassword(email, password)
    answer.ok = true
    await firebase
      .auth()
      .currentUser.updateProfile({ displayName: `${first} ${last}`, phoneNumber: phone })
  } catch (error) {
    answer.error = error
  }

  return answer
}

export { /* fetchUserData, fetchUserDataASYNC, */ loginUser, logoutUser, createUser }
