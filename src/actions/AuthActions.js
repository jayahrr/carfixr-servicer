import firebase from 'firebase'
import URI from '../config/db'

const fetchUserData = async (email) => {
  const URL = `${URI}/api/v1/servicers/email/`
  const fetchConfig = {
    method: 'GET',
    headers: new Headers({ 'x-un': email }),
  }

  let userData = null

  try {
    userData = await fetch(URL, fetchConfig).then((response) => {
      if (!response.ok) {
        throw new Error('API response was not ok.')
      }
      return response.json()
    })
  } catch (error) {
    throw new Error('error: ', error)
  }

  return userData
}

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

export { fetchUserData, loginUser, logoutUser, createUser }
