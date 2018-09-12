import URI from '../config/db'
import { USER_DB_DATA } from './types'

/*
 * actions
 */

export const updateUserData = (dispatch, user) =>
  dispatch({
    type: USER_DB_DATA,
    payload: user,
  })

/*
 * action creators
 */

export const updateServicerInformation = (userID, update) => (dispatch) => {
  if (!update || !userID) return null

  // generate REST URL and config options
  const URL = `${URI}/api/v1/servicers/me`
  const fetchConfig = {
    body: JSON.stringify({ update }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-un': userID,
    },
  }

  return fetch(URL, fetchConfig)
    .then((response) => {
      //
      if (!response.ok) throw new Error('API response was not OK', response)
      return response.json()
    })
    .then((user) => {
      updateUserData(dispatch, user)
      return user
    })
    .catch((error) => {
      throw new Error(error)
    })
}
