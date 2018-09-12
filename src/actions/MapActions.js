import { Location } from 'expo'
import { MAP_REGN_CHNG, MAP_USR_LOC, MAP_USR_ADDR, MAP_REGN_ADDR } from '../actions/types'
import { transformToRegion } from '../utilities/'
import URI from '../config/db'

/*
 * actions
 */

export const setRegionAddress = (dispatch, address) => {
  dispatch({
    type: MAP_REGN_ADDR,
    payload: address,
  })
}

export const setUserAddress = (dispatch, address) => {
  dispatch({
    type: MAP_USR_ADDR,
    payload: address,
  })
}

export const setUserLocation = (dispatch, usrLoc) => {
  dispatch({
    type: MAP_USR_LOC,
    payload: usrLoc,
  })
}

/*
 * action creators
 */

export const setRegion = location => (dispatch) => {
  const region = transformToRegion(location)
  dispatch({
    type: MAP_REGN_CHNG,
    payload: region,
  })
}

export const setAddressFromRegion = (location, type = 'region') => (dispatch) => {
  const region = transformToRegion(location)
  // acquire address from location data via google api
  return Location.reverseGeocodeAsync(region)
    .then((response) => {
      const addrObj = response[0]
      if (!addrObj) return null
      const address = `${addrObj.street} ${addrObj.city}, ${addrObj.region} ${addrObj.postalCode}`

      if (type === 'user') {
        setUserAddress(dispatch, address)
      } else {
        setRegionAddress(dispatch, address)
      }

      return address
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const setServicerLocationInformation = (location, userID) => (dispatch) => {
  const region = transformToRegion(location)
  // generate REST URL and config options
  const URL = `${URI}/api/v1/servicers/me/location`
  const body = {
    current_location: {
      type: 'Point',
      coordinates: [region.longitude, region.latitude],
    },
  }
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-un': userID,
    },
    // body: '{}',
  }

  return Location.reverseGeocodeAsync(region)
    .then((response) => {
      const addrObj = response[0]
      body.current_address = `${addrObj.street} ${addrObj.city}, ${addrObj.region} ${
        addrObj.postalCode
      }`
      fetchConfig.body = JSON.stringify(body)
      setUserLocation(dispatch, region)
      setUserAddress(dispatch, body.current_address)
    })
    .then(() => fetch(URL, fetchConfig))
    .catch((error) => {
      throw new Error(error)
    })
}
