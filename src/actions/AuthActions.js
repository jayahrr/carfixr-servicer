import firebase from 'firebase'
import {
  // USER_LOGIN_SUCCESS,
  // USER_LOGIN_FAIL,
  USER_LOGOUT,
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
    answer.ok = true
  } catch (error) {
    answer.error = error
  }

  return answer
}

const logoutUser = async () => {
  try {
    await firebase.auth().signOut()
  } catch (error) {
    // console.log('error: ', error)
  }
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
