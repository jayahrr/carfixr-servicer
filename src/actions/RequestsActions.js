import URI from '../config/db'
import { REQS_MYWORK, REQS_RECEIVE } from '../actions/types'

/*
 * actions
 */
const setServicesNearby = (dispatch, payload = []) =>
  dispatch({
    type: REQS_RECEIVE,
    payload,
  })

const setMyWork = (dispatch, payload = []) =>
  dispatch({
    type: REQS_MYWORK,
    payload,
  })

/*
 * action creators
 */

const fetchRequestsNearby = (region, radius) => (dispatch) => {
  // generate REST URL and config options
  const URL = `${URI}/api/v1/requests/nearby/${region.latitude}/${region.longitude}/${radius}`
  const fetchConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  return fetch(URL, fetchConfig)
    .then((response) => {
      if (!response.ok) throw new Error('API response was not OK')
      return response.json()
    })
    .then((json) => {
      setServicesNearby(dispatch, json)
      return json
    })
    .catch((e) => {
      throw new Error(e)
    })
}

const updateService = (id, update) => (dispatch) => {
  // generate REST URL and config options
  const URL = `${URI}/api/v1/requests/${id}`
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(update),
  }

  return fetch(URL, fetchConfig)
    .then((response) => {
      if (!response.ok) throw new Error('API response was not OK')
      return response.json()
    })
    .then(json => setServicesNearby(dispatch, json))
    .catch((e) => {
      throw new Error(e)
    })
}

const fetchMyWork = servicerID => (dispatch) => {
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

  return fetch(URL, fetchConfig)
    .then(response => response.json())
    .then((json) => {
      const myWork = []
      const reqs = json.requests
      if (reqs.length) {
        reqs.forEach((req) => {
          myWork.push({
            title: req.short_description,
            content: req,
          })
        })
      }
      return setMyWork(dispatch, myWork)
    })
    .catch((e) => {
      throw new Error(e)
    })
}

const servicerUpdatedRequest = async (id, update) => {
  let answer
  // generate REST URL
  const URL = `${URI}/api/v1/requests/${id}`

  // generate config options
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(update),
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

export { servicerUpdatedRequest, fetchMyWork, fetchRequestsNearby, updateService }
