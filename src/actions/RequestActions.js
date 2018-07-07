import URI from '../config/db'

const fetchRequestsNearMe = async (region, radius) => {
  const URL = `${URI}/api/v1/requests/nearby/${region.latitude}/${region.longitude}/${radius}`
  const fetchConfig = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
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

export { fetchRequestsNearMe }
