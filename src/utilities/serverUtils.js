import URI from '../config/db'

export const findUserData = async (userID) => {
  let userData
  const URL = `${URI}/api/v1/customers/${userID}`
  try {
    const res = await fetch(URL)
    userData = await res.json()
  } catch (error) {
    return null
  }
  return userData
}

export const findRequestData = async (reqID, userID) => {
  let reqData
  const URL = `${URI}/api/v1/requests/${reqID}`
  const fetchConfig = {
    method: 'GET',
    headers: { 'x-un': userID },
  }
  try {
    const res = await fetch(URL, fetchConfig)
    reqData = await res.json()
    // console.log('reqData: ', reqData)
  } catch (error) {
    return new Error(error)
  }
  return reqData
}
