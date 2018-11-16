import Pusher from 'pusher-js/react-native'

import URI from '../config/db'
import { REQS_MYWORK, REQS_RECEIVE, REQS_SELECT, REQS_SELECT_UPDATED } from '../actions/types'

/*
 * actions
 */
const _setServicesNearby = (payload = []) => ({
  type: REQS_RECEIVE,
  payload,
})

const _setMyWork = (payload = []) => ({
  type: REQS_MYWORK,
  payload,
})

export const selectRequest = reqID => ({
  type: REQS_SELECT,
  payload: reqID,
})

/*
 * action creators
 */

export const fetchRequestsNearby = (region, radius) => async (dispatch) => {
  // generate REST URL and config options
  const URL = `${URI}/api/v1/requests/nearby/${region.latitude}/${region.longitude}/${radius}`
  const fetchConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await fetch(URL, fetchConfig)
    if (!response.ok) throw new Error('API response was not OK')
    const json = await response.json()
    dispatch(_setServicesNearby(json))
    return json
  } catch (error) {
    throw new Error(error)
  }
}

export const updateService = (id, userID, update) => async (dispatch) => {
  // generate REST URL and config options
  const URL = `${URI}/api/v1/requests/${id}`
  const body = { ...update, sys_updated_by: userID }
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  }

  try {
    const response = await fetch(URL, fetchConfig)
    if (!response.ok) throw new Error('API response was not OK')
    const json = await response.json()
    return dispatch(_setServicesNearby(json))
  } catch (e) {
    throw new Error(e)
  }
}

export const fetchMyWork = servicerID => async (dispatch) => {
  // generate REST URL and config options
  const URL = `${URI}/api/v1/servicers/work/`
  const fetchConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'x-un': servicerID,
    },
  }

  try {
    const response = await fetch(URL, fetchConfig)
    const json = await response.json()
    const myWork = []
    const reqs = json
    if (reqs.length) {
      reqs.forEach((req) => {
        myWork.push({
          title: req.short_description,
          content: req,
        })
      })
    }
    return dispatch(_setMyWork(myWork))
  } catch (e) {
    throw new Error(e)
  }
}

export const servicerUpdatedRequest = async (requestID, userID, update) => {
  let answer
  // generate REST URL
  const URL = `${URI}/api/v1/requests/${requestID}`
  const body = { ...update, sys_updated_by: userID }

  // generate config options
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  }

  try {
    const response = await fetch(URL, fetchConfig)
    const json = await response.json()
    answer = json || null
  } catch (error) {
    throw new Error(error)
  }

  return answer
}

export const receiveReqUpdate = (reqID, userID, renderUpdateToast) => (dispatch) => {
  const socket = new Pusher('cb51a4975819a45202cf', {
    cluster: 'us2',
    forceTLS: true,
  })

  const channel = socket.subscribe('Requests')
  channel.bind('updated', (data) => {
    const id = data.id || data._id
    const updater = data.sys_updated_by
    if (id === reqID.toString() && updater !== userID.toString()) {
      dispatch({
        type: REQS_SELECT_UPDATED,
        payload: true,
      })
      renderUpdateToast(true)
    }
  })
}
