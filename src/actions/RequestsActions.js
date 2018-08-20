import URI from '../config/db'
import { REQS_MYWORK } from '../actions/types'

const fetchRequestsNearMe = async (region, radius) => {
  const URL = `${URI}/api/v1/requests/nearby/${region.latitude}/${region.longitude}/${radius}`
  const fetchConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  let requests = null

  try {
    requests = await fetch(URL, fetchConfig).then((response) => {
      if (!response.ok) return null
      return response.json()
    })
  } catch (error) {
    throw new Error('error: ', error)
  }

  return requests
}

const fetchRequestsAssignedToMe = async (servicerID) => {
  // generate REST URL
  const URL = `${URI}/api/v1/servicers/work/`

  let requests = null

  // generate config options
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
    if (response.ok) {
      const json = await response.json()
      if (json.requests.length) {
        requests = json.requests
      }
    }
  } catch (error) {
    throw new Error('error: ', error)
  }

  return requests
}

const fetchMyWork = servicerID => (dispatch) => {
  // generate REST URL
  const URL = `${URI}/api/v1/servicers/work/`

  // generate config options
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
      console.log('json: ', json)
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
      dispatch({
        type: REQS_MYWORK,
        payload: myWork,
      })
    })
    .catch(e => console.error(e))
}

const servicerUpdatedRequest = (id, update) => {
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

  return fetch(URL, fetchConfig)
    .then(response => response.json())
    .catch(e => console.error(e))
}

export { fetchRequestsNearMe, servicerUpdatedRequest, fetchRequestsAssignedToMe, fetchMyWork }
