import { Location } from 'expo'
import { MAP_REGN_CHNG, MAP_USR_LOC, MAP_USR_ADDR, MAP_REGN_ADDR } from '../actions/types'
import { transformToRegion } from '../utilities/'

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

export const setUserLocation = usrLoc => (dispatch) => {
  dispatch({
    type: MAP_USR_LOC,
    payload: usrLoc,
  })
}

export const setAddressFromRegion = (location, type = 'region') => (dispatch) => {
  const region = transformToRegion(location)
  // acquire address from location data via google api
  return Location.reverseGeocodeAsync(region)
    .then((response) => {
      if (type === 'user') {
        setUserAddress(dispatch, response)
      } else {
        setRegionAddress(dispatch, response)
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}
