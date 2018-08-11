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

const servicerPickedUpRequest = async (id, update) => {
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

  // fetch address from Google Maps APIs
  try {
    const res = await fetch(URL, fetchConfig)
  } catch (error) {
    console.log('error: ', error)
  }
}

const fetchRequestsAssignedToMe = async (id) => {
  // generate REST URL
  const URL = `${URI}/api/v1/servicers/work/`

  // generate config options
  const fetchConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'x-un': id,
    },
  }
  let requests = null

  try {
    requests = await fetch(URL, fetchConfig).then((response) => {
      console.log('fetchRequestsAssignedToMe response: ', response)
      if (!response.ok) return null
      return response.json()
    })
  } catch (error) {
    throw new Error('error: ', error)
  }

  return requests
}

export { fetchRequestsNearMe, servicerPickedUpRequest, fetchRequestsAssignedToMe }
