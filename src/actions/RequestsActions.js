import URI from '../config/db'

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

const servicerUpdatedRequest = async (id, update) => {
  // generate REST URL
  const URL = `${URI}/api/v1/requests/${id}`

  let response = null

  // generate config options
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(update),
  }

  // fetch address from Google Maps APIs
  try {
    response = await fetch(URL, fetchConfig)
  } catch (error) {
    console.log('error: ', error)
  }

  return response
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

export { fetchRequestsNearMe, servicerUpdatedRequest, fetchRequestsAssignedToMe }
